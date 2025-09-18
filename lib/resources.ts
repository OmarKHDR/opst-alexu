export interface Resource {
  id: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
  duration: string;
  level: string;
  type: string;
  callToAction: string;
  link: string;
}

const CACHE_KEY = 'contentful.resources';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getResources(): Promise<Resource[]> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=resource&include=2`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch resources');
  }

  const result = await response.json();

  // Transform Contentful response to our format
  const resources = result.items.map((item: any) => {
    let imageUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}/images/research-placeholder.png`;

    if (item.fields.image?.sys?.id) {
      const imageAsset = result.includes?.Asset?.find((a: any) => a.sys.id === item.fields.image.sys.id);
      if (imageAsset?.fields?.file?.url) {
        imageUrl = `https:${imageAsset.fields.file.url}`;
      }
    }

    return {
      id: item.sys.id,
      title: item.fields.title,
      tags: item.fields.tags || [],
      description: item.fields.description,
      image: imageUrl,
      duration: item.fields.duration,
      level: item.fields.level,
      type: item.fields.type,
      callToAction: item.fields.callToAction,
      link: item.fields.link,
    };
  });

  // Cache the results
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: resources,
    timestamp: Date.now(),
  }));

  return resources;
}
