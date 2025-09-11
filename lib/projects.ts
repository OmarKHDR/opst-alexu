import { ResearchTopic } from './research-topics';

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  category: ResearchTopic;
}

const CACHE_KEY = 'contentful.project';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getProjects(): Promise<Project[]> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch from Contentful with linked entries included
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=project&include=2`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  const result = await response.json();
  
  // Transform Contentful response to our format
  const projects = result.items.map((item: any) => {
    let imageUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}/colorful-network-visualization.png`;
    
    if (item.fields.image?.sys?.id) {
      const imageAsset = result.includes?.Asset?.find((a: any) => a.sys.id === item.fields.image.sys.id);
      if (imageAsset?.fields?.file?.url) {
        imageUrl = `https:${imageAsset.fields.file.url}`;
      }
    }

    // Find the linked research topic
    const categoryEntry = item.fields.category?.sys?.id
      ? result.includes?.Entry?.find((e: any) => e.sys.id === item.fields.category.sys.id)
      : null;

    return {
      id: item.sys.id,
      name: item.fields.name,
      description: item.fields.description,
      tags: item.fields.tags || [],
      image: imageUrl,
      category: categoryEntry ? {
        id: categoryEntry.sys.id,
        title: categoryEntry.fields.title,
        description: categoryEntry.fields.description,
        image: categoryEntry.fields.image || '',
        projectsTags: categoryEntry.fields.projectsTags || []
      } : null
    };
  });

  // Cache the results
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: projects,
    timestamp: Date.now(),
  }));

  return projects;
}