export interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
}

const CACHE_KEY = 'contentful.articles';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getArticles(): Promise<Article[]> {
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

  // Fetch from Contentful if cache miss or expired
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=articlesNews`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  const result = await response.json();

  // Transform Contentful response to our format
  const articles = result.items.map((item: any) => {
    // Handle image asset
    let imageUrl = '';
    if (item.fields.image) {
      const asset = result.includes?.Asset?.find((asset: any) => asset.sys.id === item.fields.image.sys.id);
      if (asset) {
        imageUrl = `https:${asset.fields.file.url}`;
      }
    }

    // Handle RichText content
    let contentHtml = '';
    if (item.fields.content) {
      contentHtml = documentToHtmlString(item.fields.content);
    }

    return {
      id: item.sys.id,
      title: item.fields.title || '',
      author: item.fields.author || '',
      date: item.fields.date ? new Date(item.fields.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '/') : '',
      tags: item.fields.tags || [],
      category: item.fields.category || '',
      readTime: item.fields.readTime || '',
      excerpt: item.fields.excerpt || '',
      content: contentHtml,
      image: imageUrl,
    };
  });

  // Cache the results (only on client side)
  if (typeof window !== 'undefined') {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: articles,
      timestamp: Date.now(),
    }));
  }

  return articles;
}

export async function getTopArticles(): Promise<Article[]> {
  const CACHE_KEY_TOP_ARTICLES = 'contentful.topArticles';
  // Check cache first (only on client side)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY_TOP_ARTICLES);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=topArticles&include=2`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top articles');
  }

  const result = await response.json();

  // Transform Contentful response to our format
  const articles = result.items.map((item: any) => {
    // Find the referenced article
    const referencedArticle = result.includes?.Entry?.find((entry: any) => entry.sys.id === item.fields.article.sys.id);
    if (!referencedArticle) return null;

    // Handle image asset
    let imageUrl = '';
    if (referencedArticle.fields.image) {
      const asset = result.includes?.Asset?.find((asset: any) => asset.sys.id === referencedArticle.fields.image.sys.id);
      if (asset) {
        imageUrl = `https:${asset.fields.file.url}`;
      }
    }

    // Handle RichText content
    let contentHtml = '';
    if (referencedArticle.fields.content) {
      contentHtml = documentToHtmlString(referencedArticle.fields.content);
    }

    return {
      id: referencedArticle.sys.id,
      title: referencedArticle.fields.title || '',
      author: referencedArticle.fields.author || '',
      date: referencedArticle.fields.date ? new Date(referencedArticle.fields.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '/') : '',
      tags: referencedArticle.fields.tags || [],
      category: referencedArticle.fields.category || '',
      readTime: referencedArticle.fields.readTime || '',
      excerpt: referencedArticle.fields.excerpt || '',
      content: contentHtml,
      image: imageUrl,
    };
  }).filter(Boolean); // Remove null entries

  // Cache the results (only on client side)
  if (typeof window !== 'undefined') {
    localStorage.setItem(CACHE_KEY_TOP_ARTICLES, JSON.stringify({
      data: articles,
      timestamp: Date.now(),
    }));
  }

  return articles;
}

export async function getTopNews(): Promise<Article[]> {
  const CACHE_KEY_TOP_NEWS = 'contentful.topNews';
  // Check cache first (only on client side)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY_TOP_NEWS);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  }

  // Fetch from Contentful
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=topNews&include=2`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top news');
  }

  const result = await response.json();

  // Transform Contentful response to our format
  const articles = result.items.map((item: any) => {
    // Find the referenced article
    const referencedArticle = result.includes?.Entry?.find((entry: any) => entry.sys.id === item.fields.article.sys.id);
    if (!referencedArticle) return null;

    // Handle image asset
    let imageUrl = '';
    if (referencedArticle.fields.image) {
      const asset = result.includes?.Asset?.find((asset: any) => asset.sys.id === referencedArticle.fields.image.sys.id);
      if (asset) {
        imageUrl = `https:${asset.fields.file.url}`;
      }
    }

    // Handle RichText content
    let contentHtml = '';
    if (referencedArticle.fields.content) {
      contentHtml = documentToHtmlString(referencedArticle.fields.content);
    }

    return {
      id: referencedArticle.sys.id,
      title: referencedArticle.fields.title || '',
      author: referencedArticle.fields.author || '',
      date: referencedArticle.fields.date ? new Date(referencedArticle.fields.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '/') : '',
      tags: referencedArticle.fields.tags || [],
      category: referencedArticle.fields.category || '',
      readTime: referencedArticle.fields.readTime || '',
      excerpt: referencedArticle.fields.excerpt || '',
      content: contentHtml,
      image: imageUrl,
    };
  }).filter(Boolean); // Remove null entries

  // Cache the results (only on client side)
  if (typeof window !== 'undefined') {
    localStorage.setItem(CACHE_KEY_TOP_NEWS, JSON.stringify({
      data: articles,
      timestamp: Date.now(),
    }));
  }

  return articles;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find(article => article.id === id) || null;
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
