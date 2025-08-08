import Header from '@/components/header'
import ArticleDetail from '@/components/article-detail'
import RelatedArticles from '@/components/related-articles'
import RelatedNews from '@/components/related-news'
import Footer from '@/components/footer'

interface ArticlePageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  // Provide list of article IDs to generate
  const ids = ['1', '2', '3'] // Fetch from a CMS or hardcode if needed

  return ids.map(id => ({ id }))
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <Header />
      <ArticleDetail articleId={params.id} />
      <RelatedArticles currentArticleId={params.id} />
      <RelatedNews currentArticleId={params.id} />
      <Footer />
    </div>
  )
}
