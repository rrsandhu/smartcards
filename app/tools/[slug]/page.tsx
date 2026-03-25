import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import DisclaimerBlock from '@/components/shared/DisclaimerBlock'
import MortgageCalculator from '@/components/tools/calculators/MortgageCalculator'
import RewardsCalculator from '@/components/tools/calculators/RewardsCalculator'
import AffordabilityCalculator from '@/components/tools/calculators/AffordabilityCalculator'
import MaxMortgageCalculator from '@/components/tools/calculators/MaxMortgageCalculator'
import BalanceTransferCalculator from '@/components/tools/calculators/BalanceTransferCalculator'
import DebtPayoffCalculator from '@/components/tools/calculators/DebtPayoffCalculator'
import { getToolBySlug, tools } from '@/data/tools'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug)
  if (!tool) return {}
  return {
    title: `${tool.name} — Free Canadian Calculator`,
    description: tool.description,
  }
}

function PlaceholderCalculator({ name, description }: { name: string; description: string }) {
  return (
    <div className="card-surface p-10 text-center">
      <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <span className="text-2xl">🧮</span>
      </div>
      <h3 className="font-semibold text-gray-900 text-lg mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">{description}</p>
      <p className="text-sm text-gray-400 bg-parchment-50 rounded-xl px-5 py-3 inline-block">
        This calculator is coming soon. Check back shortly.
      </p>
    </div>
  )
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()

  function renderCalculator() {
    switch (tool!.slug) {
      case 'mortgage-payment-calculator':
        return <MortgageCalculator />
      case 'mortgage-affordability-calculator':
        return <AffordabilityCalculator />
      case 'max-mortgage-calculator':
        return <MaxMortgageCalculator />
      case 'rewards-value-calculator':
        return <RewardsCalculator />
      case 'balance-transfer-calculator':
        return <BalanceTransferCalculator />
      case 'debt-payoff-calculator':
        return <DebtPayoffCalculator />
      default:
        return <PlaceholderCalculator name={tool!.name} description={tool!.description} />
    }
  }

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[
        { label: 'Tools', href: '/tools' },
        { label: tool.name },
      ]} />

      <div className="mt-6 mb-8">
        <p className="section-label mb-2">{tool.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Calculator</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{tool.name}</h1>
        <p className="text-gray-600 text-lg max-w-2xl">{tool.description}</p>
      </div>

      <div className="card-surface p-6 mb-8">
        {renderCalculator()}
      </div>

      <DisclaimerBlock text="This calculator is for educational purposes only and does not constitute financial advice. Results are estimates based on the inputs you provide. Consult a licensed mortgage broker or financial advisor for advice specific to your situation." />
    </div>
  )
}
