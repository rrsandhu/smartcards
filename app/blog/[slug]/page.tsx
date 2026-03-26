import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Calendar, User, ChevronRight, Star, AlertTriangle, Info, Lightbulb } from 'lucide-react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import ArticleCard from '@/components/blog/ArticleCard'
import NewsletterSignup from '@/components/shared/NewsletterSignup'
import CreditCardCard from '@/components/cards/CreditCardCard'
import DisclaimerBlock from '@/components/shared/DisclaimerBlock'
import Badge from '@/components/ui/Badge'
import { getArticleBySlug, articles, getRelatedArticles } from '@/data/articles'
import { getCardBySlug } from '@/data/cards'
import { formatDate, categoryLabel } from '@/lib/utils'
import type { ArticleSection } from '@/types'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.metaDescription ?? article.excerpt,
    openGraph: {
      title: article.title,
      description: article.metaDescription ?? article.excerpt,
      type: 'article',
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate,
      authors: [article.author.name],
    },
  }
}

function CalloutBox({ section }: { section: ArticleSection }) {
  const styles = {
    tip:       { bg: 'bg-blue-50 border-blue-200',   icon: Lightbulb, iconColor: 'text-blue-500', labelColor: 'text-blue-700' },
    warning:   { bg: 'bg-amber-50 border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-500', labelColor: 'text-amber-700' },
    info:      { bg: 'bg-navy-50 border-navy-200',   icon: Info, iconColor: 'text-navy-500', labelColor: 'text-navy-700' },
    highlight: { bg: 'bg-gold-50 border-gold-200',   icon: Star, iconColor: 'text-gold-500', labelColor: 'text-gold-700' },
  }
  const s = styles[section.calloutType ?? 'info']
  const Icon = s.icon
  return (
    <div className={`border rounded-xl p-5 my-6 ${s.bg}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${s.iconColor}`} />
        <div>
          {section.heading && <p className={`font-semibold text-sm mb-1 ${s.labelColor}`}>{section.heading}</p>}
          {section.body && <p className="text-sm text-gray-700 leading-relaxed">{section.body}</p>}
        </div>
      </div>
    </div>
  )
}

function ArticleContent({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="article-prose">
      {sections.map((section, i) => {
        switch (section.type) {
          case 'h2':
            return <h2 key={i}>{section.heading}</h2>
          case 'h3':
            return <h3 key={i}>{section.heading}</h3>
          case 'paragraph':
            return <p key={i}>{section.body}</p>
          case 'bullets':
            return (
              <ul key={i} className="list-disc list-inside space-y-2 mb-5">
                {section.items?.map((item, j) => <li key={j} className="text-gray-700">{item}</li>)}
              </ul>
            )
          case 'numbered':
            return (
              <ol key={i} className="list-decimal list-inside space-y-2 mb-5">
                {section.items?.map((item, j) => <li key={j} className="text-gray-700">{item}</li>)}
              </ol>
            )
          case 'callout':
            return <CalloutBox key={i} section={section} />
          case 'table':
            return (
              <div key={i} className="overflow-x-auto my-6">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-parchment-100">
                      {section.headers?.map((h, j) => (
                        <th key={j} className="text-left py-2.5 px-4 font-semibold text-gray-700 border border-parchment-200">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows?.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-parchment-50'}>
                        {row.map((cell, k) => (
                          <td key={k} className="py-2.5 px-4 text-gray-700 border border-parchment-200">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

const categoryVariant: Record<string, 'navy' | 'gold' | 'green' | 'gray' | 'blue'> = {
  'points-deals':      'gold',
  'credit-card-deals': 'navy',
  'mortgage-news':     'blue',
  guides:              'green',
  news:                'gray',
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const relatedArticles = article.relatedArticleIds
    ? getRelatedArticles(article.relatedArticleIds)
    : []

  const relatedCards = article.relatedCards
    ? article.relatedCards.map(rc => getCardBySlug(rc.cardSlug)).filter(Boolean)
    : []

  // Build table of contents from h2 sections
  const toc = article.content
    .filter(s => s.type === 'h2')
    .map(s => s.heading!)

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[
        { label: 'Blog', href: '/blog' },
        { label: categoryLabel(article.category), href: `/blog/${article.category}` },
        { label: article.title },
      ]} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Article main */}
        <article className="lg:col-span-2">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={categoryVariant[article.category] ?? 'gray'}>
                {categoryLabel(article.category)}
              </Badge>
              {article.editorsPick && (
                <Badge variant="gold">
                  <Star className="w-2.5 h-2.5 mr-1" />Editor's Pick
                </Badge>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-5">{article.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-5 border-b border-parchment-200">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <strong className="text-gray-700">{article.author.name}</strong>
                {article.author.title && <span>· {article.author.title}</span>}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(article.publishDate)}
              </span>
              {article.updatedDate && (
                <span className="text-xs bg-parchment-100 px-2 py-0.5 rounded-full">
                  Updated {formatDate(article.updatedDate)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTimeMinutes} min read
              </span>
            </div>
          </header>

          {/* Hero image placeholder */}
          <div className="h-64 bg-gradient-to-br from-navy-600 to-navy-900 rounded-2xl mb-8 flex items-center justify-center">
            <span className="text-white text-4xl font-bold opacity-10">PN</span>
          </div>

          {/* Article body */}
          <ArticleContent sections={article.content} />

          {/* Related cards inline */}
          {relatedCards.length > 0 && (
            <div className="mt-10 pt-8 border-t border-parchment-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Cards Mentioned in This Article</h2>
              <div className="space-y-4">
                {relatedCards.map(card => card && (
                  <CreditCardCard key={card.id} card={card} variant="list" />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <DisclaimerBlock />
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {article.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="text-xs bg-parchment-100 hover:bg-parchment-200 text-gray-600 px-3 py-1 rounded-full transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Table of contents */}
          {toc.length > 0 && (
            <div className="card-surface p-5 sticky top-20">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">In This Article</h3>
              <nav className="space-y-1.5">
                {toc.map((heading, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600 hover:text-navy-600 transition-colors cursor-pointer py-0.5">
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-snug">{heading}</span>
                  </div>
                ))}
              </nav>
            </div>
          )}

          {/* Newsletter */}
          <NewsletterSignup variant="compact" />

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="card-surface p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles.map(ra => (
                  <ArticleCard key={ra.id} article={ra} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* More articles */}
      <section className="mt-14 border-t border-parchment-200 pt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">More from SmartCardOffers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.filter(a => a.id !== article.id).slice(0, 3).map(a => (
            <ArticleCard key={a.id} article={a} variant="featured" />
          ))}
        </div>
      </section>
    </div>
  )
}
