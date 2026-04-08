import type { Metadata } from 'next'
import ToolCard from '@/components/tools/ToolCard'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import SectionHeader from '@/components/ui/SectionHeader'
import { tools, getToolsByCategory } from '@/data/tools'

export const metadata: Metadata = {
  title: 'Free Canadian Financial Calculators — Mortgage, Rewards & Debt Tools',
  description: 'Free mortgage calculators, credit card rewards estimators, and debt payoff tools built for Canadians. No signup required.',
  alternates: { canonical: 'https://smartcardoffers.ca/tools' },
  openGraph: { title: 'Free Canadian Financial Calculators 2026', description: 'Mortgage payment, affordability, rewards value, and debt payoff calculators for Canadians.', url: 'https://smartcardoffers.ca/tools', type: 'website' },
}

const categoryGroups = [
  { key: 'mortgage', label: 'Mortgage Calculators' },
  { key: 'credit-card', label: 'Credit Card Tools' },
  { key: 'debt', label: 'Debt Tools' },
]

export default function ToolsPage() {
  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Financial Tools' }]} />

      <div className="mt-6 mb-8">
        <SectionHeader
          label="Free Calculators"
          title="Canadian Financial Tools"
          subtitle="Simple, free calculators to help you make better decisions about your mortgage, credit cards, and debt — built for Canadian residents."
        />
      </div>

      {categoryGroups.map(group => {
        const groupTools = getToolsByCategory(group.key)
        if (!groupTools.length) return null
        return (
          <section key={group.key} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-5">{group.label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {groupTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
