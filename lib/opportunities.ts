export interface Opportunity {
  id: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  logo: string;
  location: string;
  deadline?: string;
  experience?: string;
  type: 'Research Opportunity' | 'Job Opportunity';
  duration?: 'full time' | 'part time';
  salary?: string;
}

const CACHE_KEY = 'contentful.opportunities';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getOpportunities(): Promise<Opportunity[]> {
  // Check cache first (only on client side)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=opportunities`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch opportunities');
  }

  const result = await response.json();

  if (!result.items || result.items.length === 0) {
    return [];
  }

  // Transform Contentful response to our format
  const opportunities: Opportunity[] = result.items.map((item: any) => {
    // Handle logo asset
    let logoUrl = '';
    if (item.fields.logo) {
      const asset = result.includes?.Asset?.find((asset: any) => asset.sys.id === item.fields.logo.sys.id);
      if (asset) {
        logoUrl = `https:${asset.fields.file.url}`;
      }
    }

    return {
      id: item.sys.id,
      title: item.fields.title || '',
      company: item.fields.company || '',
      description: item.fields.description || '',
      tags: item.fields.tags || [],
      logo: logoUrl || `${process.env.NEXT_PUBLIC_BASE_PATH}/company-placeholder.png`,
      location: item.fields.location || '',
      deadline: item.fields.deadline,
      experience: item.fields.experience,
      type: item.fields.type,
      duration: item.fields.duration,
      salary: item.fields.salary,
    };
  });

  // Cache the results (only on client side)
  if (typeof window !== 'undefined') {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: opportunities,
      timestamp: Date.now(),
    }));
  }

  return opportunities;
}
