interface Publication {
  id: string;
  type: string;
  title: string;
  authors: string;
  year: string;
  journalName?: string;
  impactFactor?: string;
  citations?: string;
  place?: string;
  supervisor?: string;
  field?: string;
  defenceDate?: string;
  status?: string;
  readURL?: string;
  doiUrl?: string;
  citeUrl?: string;
  view_Theses_Url?: string;
  abstractUrl?: string;
  attachmentUrl?: string;
  presentationUrl?: string;
  detailsUrl?: string;
}

const CACHE_KEY = 'contentful.publications';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getPublications(): Promise<Publication[]> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  // Fetch from Contentful if cache miss or expired
  const response = await fetch(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENTITIES_URI}?content_type=publication`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CDA_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch publications');
  }

  const result = await response.json();
  
  // Transform Contentful response to our format
  const publications = result.items.map((item: any) => ({
    id: item.sys.id,
    type: item.fields.type,
    title: item.fields.title,
    authors: item.fields.authors,
    year: item.fields.year,
    journalName: item.fields.journalName,
    impactFactor: item.fields.impactFactor,
    citations: item.fields.citations,
    place: item.fields.place,
    supervisor: item.fields.supervisor,
    field: item.fields.field,
    defenceDate: item.fields.defenceDate,
    status: item.fields.status,
    readURL: item.fields.readURL,
    doiUrl: item.fields.doiUrl,
    citeUrl: item.fields.citeUrl,
    view_Theses_Url: item.fields.view_Theses_Url,
    abstractUrl: item.fields.abstractUrl,
    attachmentUrl: item.fields.attachmentUrl,
    presentationUrl: item.fields.presentationUrl,
    detailsUrl: item.fields.detailsUrl,
  }));

  // Cache the results
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: publications,
    timestamp: Date.now(),
  }));

  return publications;
}

export function getPublicationStatistics(publications: Publication[]) {
  return {
    "Journal Articles": publications.filter(p => p.type === "JOURNAL ARTICLES").length,
    "Conference Papers": publications.filter(p => p.type === "CONFERENCE PROCEEDINGS").length,
    "PhD Theses": publications.filter(p => p.type === "POSTGRADUATE THESES").length,
    "Master's Theses": publications.filter(p => p.type === "UNDERGRADUATE THESES").length,
    "Patents": publications.filter(p => p.type === "INTELLECTUAL PROPERTIES").length,
  };
}