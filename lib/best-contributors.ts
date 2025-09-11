import type { Person } from './people';

export interface Contributor {
  id: string;
  person: Person;
}

const CACHE_KEY = 'contentful.bestContributors';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getBestContributors(): Promise<Contributor[]> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch from Contentful with linked entries included
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=bestContributors&include=2`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch best contributors');
  }

  const result = await response.json();
  
  // Transform Contentful response to our format
  const contributors = result.items.map((item: any) => {
    const personEntry = item.fields.person?.sys?.id
      ? result.includes?.Entry?.find((e: any) => e.sys.id === item.fields.person.sys.id)
      : null;

    let imageUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}/professional-headshot.png`;
    if (personEntry?.fields?.image?.sys?.id) {
      const imageAsset = result.includes?.Asset?.find((a: any) => a.sys.id === personEntry.fields.image.sys.id);
      if (imageAsset?.fields?.file?.url) {
        imageUrl = `https:${imageAsset.fields.file.url}`;
      }
    }

    return {
      id: item.sys.id,
      person: personEntry ? {
        id: personEntry.sys.id,
        name: personEntry.fields.name || '',
        title: personEntry.fields.title || '',
        degree: personEntry.fields.degree || '',
        affiliation: personEntry.fields.affiliation || '',
        description: personEntry.fields.description || '',
        researchInterests: personEntry.fields.researchInterests || [],
        image: imageUrl,
        linkedin: personEntry.fields.linkedin || '#',
        cvLink: personEntry.fields.cvLink || '#',
        email: personEntry.fields.email || '',
        orcid: personEntry.fields.orcid || '#',
        academicCategory: personEntry.fields.academicCategory || ''
      } : null
    };
  });

  // Cache the results
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: contributors,
    timestamp: Date.now(),
  }));

  return contributors;
}