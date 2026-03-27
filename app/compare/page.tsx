import type { Metadata } from 'next'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import SectionHeader from '@/components/ui/SectionHeader'
import { fetchCards } from '@/lib/smart-card-api'
import CompareClient from './CompareClient'

export const metadata: Metadata = {
  title: 'Compare Canadian Credit Cards | SmartCardOffers',
  description: 'Compare Canadian credit cards side by side. See annual fees, rewards, insurance, and more.',
}

export const revalidate = 3600

export default async function ComparePage() {
  const cards = await fetchCards({ limit: 100 })

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Compare Cards' }]} />

      <div className="mt-6 mb-8">
        <SectionHeader
          label="Side-by-Side"
          title="Compare Canadian Credit Cards"
          subtitle="Add up to 3 cards and compare features side by side."
        />
      </div>

      <CompareClient cards={cards} />
    </div>
  )
}
