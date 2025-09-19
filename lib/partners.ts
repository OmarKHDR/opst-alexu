export interface Partner {
  id: string;
  name: string;
  brief: string;
  logo: string;
}

const CACHE_KEY = 'contentful.partners';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getPartners(): Promise<Partner[]> {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=partner`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch partners');
  }

  const result = await response.json();

  // Transform Contentful response to our format
  const partners = result.items.map((item: any) => {
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
      name: item.fields.name || '',
      brief: item.fields.brief || '',
      logo: logoUrl,
    };
  });

  // Cache the results (only on client side)
  if (typeof window !== 'undefined') {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: partners,
      timestamp: Date.now(),
    }));
  }

  return partners;
}
