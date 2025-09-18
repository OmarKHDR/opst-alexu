export interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  location: string;
  speaker: string;
  level: string;
  seatsAvailable: number;
  category: string;
  image: string;
}

const CACHE_KEY = 'contentful.activities';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getActivities(): Promise<Activity[]> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=activity&include=2`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }

  const result = await response.json();

  // Transform Contentful response to our format
  const activities = result.items.map((item: any) => {
    let imageUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}/conference-presentation.png`;

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
      date: item.fields.date,
      location: item.fields.location,
      speaker: item.fields.speaker,
      level: item.fields.level,
      seatsAvailable: item.fields.seatsAvailable,
      category: item.fields.category,
      image: imageUrl,
    };
  });

  // Cache the results
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: activities,
    timestamp: Date.now(),
  }));

  return activities;
}
