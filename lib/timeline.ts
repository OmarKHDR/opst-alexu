export interface TimelineEvent {
  id: string;
  eventDate: string;
  title: string;
  description: string;
  image: string;
  side: string;
  isLabCreated: boolean;
}

const CACHE_KEY = 'contentful.timelineEvents';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=timelineEvents`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch timeline events');
  }

  const result = await response.json();

  // Transform Contentful response to our format
  const events = result.items.map((item: any) => {
    // Handle image asset
    let imageUrl = '';
    if (item.fields.image) {
      const asset = result.includes?.Asset?.find((asset: any) => asset.sys.id === item.fields.image.sys.id);
      if (asset) {
        imageUrl = `https:${asset.fields.file.url}`;
      }
    }

    // Handle RichText description
    let descriptionHtml = '';
    if (item.fields.description) {
      descriptionHtml = documentToHtmlString(item.fields.description);
    }

    // Format date
    let formattedDate = '';
    if (item.fields.eventDate) {
      const date = new Date(item.fields.eventDate);
      const year = date.getFullYear();
      const month = date.toLocaleString('en-US', { month: 'short' });

      // Check if it's just a year or has month/day
      if (date.getMonth() === 0 && date.getDate() === 1) {
        // Just year
        formattedDate = year.toString();
      } else if (date.getDate() === 1) {
        // Month and year
        formattedDate = `${month} ${year}`;
      } else {
        // Full date
        formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    }

    return {
      id: item.sys.id,
      eventDate: formattedDate,
      title: item.fields.title || '',
      description: descriptionHtml,
      image: imageUrl,
      side: item.fields.side || 'right',
      isLabCreated: item.fields.isLabCreated || false,
    };
  });

  // Sort events by date (newest first)
  events.sort((a: TimelineEvent, b: TimelineEvent) => {
    const dateA = new Date(a.eventDate);
    const dateB = new Date(b.eventDate);
    return dateB.getTime() - dateA.getTime();
  });

  // Cache the results (only on client side)
  if (typeof window !== 'undefined') {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: events,
      timestamp: Date.now(),
    }));
  }

  return events;
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
