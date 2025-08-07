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

export default function ArticlePage({ params }: ArticlePageProps) {
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
