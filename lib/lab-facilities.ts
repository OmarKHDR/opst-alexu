export interface LabFacility {
  id: string;
  name: string;
  description: string;
  image: string;
}

const CACHE_KEY = 'contentful.labFacilities';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getLabFacilities(): Promise<LabFacility[]> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=facility`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch lab facilities');
  }

  const result = await response.json();
  
  // Transform Contentful response to our format
  const facilities = result.items.map((item: any) => {
    let imageUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}/laboratory-facility.png`;
    
    if (item.fields.image?.sys?.id) {
      const imageAsset = result.includes?.Asset?.find((a: any) => a.sys.id === item.fields.image.sys.id);
      if (imageAsset?.fields?.file?.url) {
        imageUrl = `https:${imageAsset.fields.file.url}`;
      }
    }

    return {
      id: item.sys.id,
      name: item.fields.name,
      description: item.fields.description,
      image: imageUrl,
    };
  });

  // Cache the results
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: facilities,
    timestamp: Date.now(),
  }));

  return facilities;
}