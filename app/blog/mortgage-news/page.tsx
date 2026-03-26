import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/blog/ArticleCard'
import ToolCard from '@/components/tools/ToolCard'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import SectionHeader from '@/components/ui/SectionHeader'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import { getArticlesByCategory } from '@/data/articles'
import { getToolsByCategory } from '@/data/tools'

export const metadata: Metadata = {
  title: 'Mortgage News Canada — Rate Updates, Renewal Tips & Housing Market',
  description: 'Stay current on Canadian mortgage rates, Bank of Canada rate decisions, housing market news, and expert mortgage advice from SmartCardOffers.',
}

export default function MortgageNewsPage() {
  const mortgageArticles = getArticlesByCategory('mortgage-news')
  const allArticles      = [...mortgageArticles, ...getArticlesByCategory('guides')].slice(0, 6)
  const mortgageTools    = getToolsByCategory('mortgage')

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Blog', href: '/blog' }, { label: 'Mortgage News' }]} />

      <div className="mt-6 mb-6 max-w-3xl">
        <SectionHeader
          label="Mortgage News"
          title="Canadian Mortgage & Housing News"
          subtitle="Bank of Canada rate updates, renewal strategies, fixed vs. variable analysis, and first-time buyer guides — from a Canadian perspective."
        />
      </div>

      {/* Rate snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Bank of Canada Rate', value: '4.75%', note: 'As of June 2024' },
          { label: 'Prime Rate', value: '6.95%', note: 'Major banks' },
          { label: '5-Yr Fixed (avg)', value: '~5.00%', note: 'Varies by lender' },
          { label: '5-Yr Variable (avg)', value: 'P - 0.70%', note: '~6.25%' },
        ].map(stat => (
          <div key={stat.label} className="card-surface p-4 text-center">
            <p className="text-xl font-bold text-navy-700">{stat.value}</p>
            <p className="text-xs font-semibold text-gray-700 mt-0.5">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.note}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-8">Rates shown are indicative as of July 2024. Always verify current rates with your lender or broker.</p>

      {/* Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {allArticles.map(article => (
          <ArticleCard key={article.id} article={article} variant="featured" />
        ))}
      </div>

      {/* Mortgage tools */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5">Free Mortgage Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mortgageTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      <NewsletterSignup />
    </div>
  )
}
