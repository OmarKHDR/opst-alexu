export interface ResearchTopic {
  id: string;
  title: string;
  description: string;
  image: string;
  projectsTags: string[];
}

const CACHE_KEY = 'contentful.researchTopics';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getResearchTopics(): Promise<ResearchTopic[]> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch from Contentful if cache miss or expired
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=researchTopics`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch research topics');
  }

  const result = await response.json();
  
  // Transform Contentful response to our format
  const researchTopics = result.items.map((item: any) => {
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
      description: item.fields.description,
      image: imageUrl,
      projectsTags: item.fields.projectsTags || [],
    };
  });

  // Cache the results
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: researchTopics,
    timestamp: Date.now(),
  }));

  return researchTopics;
}
