export interface Person {
  id: string;
  name: string;
  title: string;
  degree: string;
  affiliation: string;
  description: string;
  researchInterests: string[];
  image: string;
  linkedin: string;
  cvLink: string;
  email: string;
  orcid: string;
  academicCategory: string;
}

const CACHE_KEY = 'contentful.people';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getPeople(): Promise<Person[]> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=person`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch people');
  }

  const result = await response.json();
  
  // Transform Contentful response to our format
  const people = result.items.map((item: any) => {
    let imageUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}/professional-headshot.png`;
    
    if (item.fields.image?.sys?.id) {
      const imageAsset = result.includes?.Asset?.find((a: any) => a.sys.id === item.fields.image.sys.id);
      if (imageAsset?.fields?.file?.url) {
        imageUrl = `https:${imageAsset.fields.file.url}`;
      }
    }

    return {
      id: item.sys.id,
      name: item.fields.name || '',
      title: item.fields.title || '',
      degree: item.fields.degree || '',
      affiliation: item.fields.affiliation || '',
      description: item.fields.description || '',
      researchInterests: item.fields.researchInterests || [],
      image: imageUrl,
      linkedin: item.fields.linkedin || '#',
      cvLink: item.fields.cvLink || '#',
      email: item.fields.email || '',
      orcid: item.fields.orcid || '#',
      academicCategory: item.fields.academicCategory || ''
    };
  });

  // Cache the results
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: people,
    timestamp: Date.now(),
  }));

  return people;
}

export async function getPrincipalInvestigator(): Promise<Person | null> {
  const CACHE_KEY_PI = 'contentful.principalInvestigator';

  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY_PI);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=principalInvestigator&include=2`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch principal investigator');
  }

  const result = await response.json();

  if (!result.items || result.items.length === 0) {
    return null;
  }

  const item = result.items[0];

  // Find the referenced person
  const referencedPerson = result.includes?.Entry?.find((entry: any) => entry.sys.id === item.fields.person.sys.id);
  if (!referencedPerson) {
    return null;
  }

  // Handle image asset for the referenced person
  let imageUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}/professional-headshot.png`;

  if (referencedPerson.fields.image?.sys?.id) {
    const imageAsset = result.includes?.Asset?.find((a: any) => a.sys.id === referencedPerson.fields.image.sys.id);
    if (imageAsset?.fields?.file?.url) {
      imageUrl = `https:${imageAsset.fields.file.url}`;
    }
  }

  const person: Person = {
    id: referencedPerson.sys.id,
    name: referencedPerson.fields.name || '',
    title: referencedPerson.fields.title || '',
    degree: referencedPerson.fields.degree || '',
    affiliation: referencedPerson.fields.affiliation || '',
    description: referencedPerson.fields.description || '',
    researchInterests: referencedPerson.fields.researchInterests || [],
    image: imageUrl,
    linkedin: referencedPerson.fields.linkedin || '#',
    cvLink: referencedPerson.fields.cvLink || '#',
    email: referencedPerson.fields.email || '',
    orcid: referencedPerson.fields.orcid || '#',
    academicCategory: referencedPerson.fields.academicCategory || ''
  };

  // Cache the results
  localStorage.setItem(CACHE_KEY_PI, JSON.stringify({
    data: person,
    timestamp: Date.now(),
  }));

  return person;
}
