export interface StudentProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  capacity: string;
  applicationStatus: string;
  startDate: string;
  image: string;
  highlights: string[];
}

const CACHE_KEY = 'contentful.studentPrograms';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getStudentPrograms(): Promise<StudentProgram[]> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=studentPrograms`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch student programs');
  }

  const result = await response.json();

  // Transform Contentful response to our format
  const programs = result.items.map((item: any) => {
    let imageUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}/students-working-lab.png`;

    if (item.fields.image?.sys?.id) {
      const imageAsset = result.includes?.Asset?.find((a: any) => a.sys.id === item.fields.image.sys.id);
      if (imageAsset?.fields?.file?.url) {
        imageUrl = `https:${imageAsset.fields.file.url}`;
      }
    }

    return {
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      duration: item.fields.duration,
      capacity: item.fields.capacity,
      applicationStatus: item.fields.applicationStatus,
      startDate: item.fields.startDate,
      image: imageUrl,
      highlights: item.fields.highlights || []
    };
  });

  // Cache the results
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: programs,
    timestamp: Date.now(),
  }));

  return programs;
}
