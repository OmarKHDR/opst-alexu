import { Article } from './articles'
import { ResearchTopic } from './research-topics'

export interface GenericSection {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
}

const CACHE_KEY = 'contentful.genericSection';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface VisionMissionValues {
  id: string;
  vision: string;
  mission: string;
  values: string;
}

export async function getVisionMissionValues(): Promise<VisionMissionValues | null> {
  const CACHE_KEY_VMV = 'contentful.visionMissionValues';
  // Check cache first (only on client side)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY_VMV);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=visionMissionValues`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch vision mission values');
  }

  const result = await response.json();

  if (!result.items || result.items.length === 0) {
    return null;
  }

  const item = result.items[0];

  const vmv: VisionMissionValues = {
    id: item.sys.id,
    vision: item.fields.vision || '',
    mission: item.fields.mission || '',
    values: item.fields.values || '',
  };

  // Cache the results (only on client side)
  if (typeof window !== 'undefined') {
    localStorage.setItem(CACHE_KEY_VMV, JSON.stringify({
      data: vmv,
      timestamp: Date.now(),
    }));
  }

  return vmv;
}

export interface ContactInfo {
  id: string;
  pageSubtitle: string;
  email: string;
  phoneNumber: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  const CACHE_KEY_CONTACT = 'contentful.contactInfo';

  // Check cache first (only on client side)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY_CONTACT);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=contactInfo`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch contact info');
  }

  const result = await response.json();

  if (!result.items || result.items.length === 0) {
    return null;
  }

  const item = result.items[0];

  // Handle RichText pageSubtitle
  let subtitleHtml = '';
  if (item.fields.pageSubtitle) {
    subtitleHtml = documentToHtmlString(item.fields.pageSubtitle);
  }

  const contactInfo: ContactInfo = {
    id: item.sys.id,
    pageSubtitle: subtitleHtml,
    email: item.fields.email || '',
    phoneNumber: item.fields.phoneNumber || '',
    facebook: item.fields.facebook || '',
    twitter: item.fields.twitter || '',
    linkedin: item.fields.linkedin || '',
    youtube: item.fields.youtube || '',
  };

  // Cache the results (only on client side)
  if (typeof window !== 'undefined') {
    localStorage.setItem(CACHE_KEY_CONTACT, JSON.stringify({
      data: contactInfo,
      timestamp: Date.now(),
    }));
  }

  return contactInfo;
}

interface HomeSection {
  id: string;
  heroSection: GenericSection | null;
  recentNews: Article[];
  researchTopics: ResearchTopic[];
  about: GenericSection | null;
}

export async function getHomeSection(): Promise<HomeSection | null> {
  const CACHE_KEY_HOME = 'contentful.homeSection';

  // Check cache first (only on client side)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY_HOME);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=homesection&include=10`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch home section');
  }

  const result = await response.json();

  if (!result.items || result.items.length === 0) {
    return null;
  }

  const item = result.items[0];

  // Resolve heroSection reference
  let heroSection: GenericSection | null = null;
  if (item.fields.heroSection?.sys?.id) {
    const heroRef = result.includes?.Entry?.find((entry: any) => entry.sys.id === item.fields.heroSection.sys.id);
    if (heroRef) {
      // Handle image asset
      let imageUrl = '';
      if (heroRef.fields.image) {
        const asset = result.includes?.Asset?.find((asset: any) => asset.sys.id === heroRef.fields.image.sys.id);
        if (asset) {
          imageUrl = `https:${asset.fields.file.url}`;
        }
      }

      // Handle RichText body content
      let bodyHtml = '';
      if (heroRef.fields.body) {
        bodyHtml = documentToHtmlString(heroRef.fields.body);
      }

      heroSection = {
        id: heroRef.sys.id,
        title: heroRef.fields.title || '',
        subtitle: heroRef.fields.subtitle || '',
        body: bodyHtml,
        image: imageUrl,
      };
    }
  }

  // Resolve about reference
  let about: GenericSection | null = null;
  if (item.fields.about?.sys?.id) {
    const aboutRef = result.includes?.Entry?.find((entry: any) => entry.sys.id === item.fields.about.sys.id);
    if (aboutRef) {
      // Handle image asset
      let imageUrl = '';
      if (aboutRef.fields.image) {
        const asset = result.includes?.Asset?.find((asset: any) => asset.sys.id === aboutRef.fields.image.sys.id);
        if (asset) {
          imageUrl = `https:${asset.fields.file.url}`;
        }
      }

      // Handle RichText body content
      let bodyHtml = '';
      if (aboutRef.fields.body) {
        bodyHtml = documentToHtmlString(aboutRef.fields.body);
      }

      about = {
        id: aboutRef.sys.id,
        title: aboutRef.fields.title || '',
        subtitle: aboutRef.fields.subtitle || '',
        body: bodyHtml,
        image: imageUrl,
      };
    }
  }

  // Resolve recentNews references
  const recentNews: Article[] = [];
  if (item.fields.recentNews) {
    for (const newsRef of item.fields.recentNews) {
      const newsEntry = result.includes?.Entry?.find((entry: any) => entry.sys.id === newsRef.sys.id);
      if (newsEntry) {
        // Handle image asset
        let imageUrl = '';
        if (newsEntry.fields.image) {
          const asset = result.includes?.Asset?.find((asset: any) => asset.sys.id === newsEntry.fields.image.sys.id);
          if (asset) {
            imageUrl = `https:${asset.fields.file.url}`;
          }
        }

        // Handle RichText content
        let contentHtml = '';
        if (newsEntry.fields.content) {
          contentHtml = documentToHtmlString(newsEntry.fields.content);
        }

        recentNews.push({
          id: newsEntry.sys.id,
          title: newsEntry.fields.title || '',
          author: newsEntry.fields.author || '',
          date: newsEntry.fields.date ? new Date(newsEntry.fields.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).replace(/\//g, '/') : '',
          tags: newsEntry.fields.tags || [],
          category: newsEntry.fields.category || '',
          readTime: newsEntry.fields.readTime || '',
          excerpt: newsEntry.fields.excerpt || '',
          content: contentHtml,
          image: imageUrl,
        });
      }
    }
  }

  // Resolve researchTopics references
  const researchTopics: ResearchTopic[] = [];
  if (item.fields.researchTopics) {
    for (const topicRef of item.fields.researchTopics) {
      const topicEntry = result.includes?.Entry?.find((entry: any) => entry.sys.id === topicRef.sys.id);
      if (topicEntry) {
        // Handle image asset
        let imageUrl = '';
        if (topicEntry.fields.image) {
          const asset = result.includes?.Asset?.find((asset: any) => asset.sys.id === topicEntry.fields.image.sys.id);
          if (asset) {
            imageUrl = `https:${asset.fields.file.url}`;
          }
        }

        // Handle RichText description
        let descriptionHtml = '';
        if (topicEntry.fields.description) {
          descriptionHtml = topicEntry.fields.description;
        }

        researchTopics.push({
          id: topicEntry.sys.id,
          title: topicEntry.fields.title || '',
          description: descriptionHtml,
          image: imageUrl,
          projectsTags: topicEntry.fields.projectsTags || [],
        });
      }
    }
  }

  const homeSection: HomeSection = {
    id: item.sys.id,
    heroSection,
    recentNews,
    researchTopics,
    about,
  };

  // Cache the results (only on client side)
  if (typeof window !== 'undefined') {
    localStorage.setItem(CACHE_KEY_HOME, JSON.stringify({
      data: homeSection,
      timestamp: Date.now(),
    }));
  }

  return homeSection;
}

export async function getGenericSection(title: string): Promise<GenericSection | null> {
  // Check cache first (only on client side)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data[title] || null;
      }
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=genericSection&fields.title=${encodeURIComponent(title)}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch generic section');
  }

  const result = await response.json();

  if (!result.items || result.items.length === 0) {
    return null;
  }

  const item = result.items[0];

  // Handle image asset
  let imageUrl = '';
  if (item.fields.image) {
    const asset = result.includes?.Asset?.find((asset: any) => asset.sys.id === item.fields.image.sys.id);
    if (asset) {
      imageUrl = `https:${asset.fields.file.url}`;
    }
  }

  // Handle RichText body content
  let bodyHtml = '';
  if (item.fields.body) {
    bodyHtml = documentToHtmlString(item.fields.body);
  }

  const section: GenericSection = {
    id: item.sys.id,
    title: item.fields.title || '',
    subtitle: item.fields.subtitle || '',
    body: bodyHtml,
    image: imageUrl,
  };

  // Cache the results (only on client side)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY);
    let cacheData: Record<string, GenericSection> = {};
    if (cached) {
      cacheData = JSON.parse(cached).data;
    }
    cacheData[title] = section;
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: cacheData,
      timestamp: Date.now(),
    }));
  }

  return section;
}

// Helper function to convert Contentful RichText to HTML
function documentToHtmlString(document: any): string {
  if (!document || !document.content) return '';

  return document.content.map((node: any) => {
    switch (node.nodeType) {
      case 'paragraph':
        return `<p>${node.content.map((content: any) => contentToHtml(content)).join('')}</p>`;
      case 'heading-1':
        return `<h1>${node.content.map((content: any) => contentToHtml(content)).join('')}</h1>`;
      case 'heading-2':
        return `<h2>${node.content.map((content: any) => contentToHtml(content)).join('')}</h2>`;
      case 'heading-3':
        return `<h3>${node.content.map((content: any) => contentToHtml(content)).join('')}</h3>`;
      case 'heading-4':
        return `<h4>${node.content.map((content: any) => contentToHtml(content)).join('')}</h4>`;
      case 'heading-5':
        return `<h5>${node.content.map((content: any) => contentToHtml(content)).join('')}</h5>`;
      case 'heading-6':
        return `<h6>${node.content.map((content: any) => contentToHtml(content)).join('')}</h6>`;
      case 'unordered-list':
        return `<ul>${node.content.map((item: any) => `<li>${item.content.map((content: any) => contentToHtml(content)).join('')}</li>`).join('')}</ul>`;
      case 'ordered-list':
        return `<ol>${node.content.map((item: any) => `<li>${item.content.map((content: any) => contentToHtml(content)).join('')}</li>`).join('')}</ol>`;
      case 'blockquote':
        return `<blockquote>${node.content.map((content: any) => contentToHtml(content)).join('')}</blockquote>`;
      case 'hr':
        return '<hr>';
      default:
        return node.content ? node.content.map((content: any) => contentToHtml(content)).join('') : '';
    }
  }).join('');
}

function contentToHtml(content: any): string {
  if (typeof content === 'string') return content;

  if (content.nodeType === 'text') {
    let text = content.value;
    if (content.marks) {
      content.marks.forEach((mark: any) => {
        switch (mark.type) {
          case 'bold':
            text = `<strong>${text}</strong>`;
            break;
          case 'italic':
            text = `<em>${text}</em>`;
            break;
          case 'underline':
            text = `<u>${text}</u>`;
            break;
          case 'code':
            text = `<code>${text}</code>`;
            break;
        }
      });
    }
    return text;
  }

  if (content.nodeType === 'hyperlink') {
    return `<a href="${content.data.uri}">${content.content.map((c: any) => contentToHtml(c)).join('')}</a>`;
  }

  return '';
}
