import Breadcrumbs from '@/components/shared/Breadcrumbs'
import DisclaimerBlock from '@/components/shared/DisclaimerBlock'
import { fetchCards, fetchIssuers } from '@/lib/smart-card-api'
import CardsClient from './CardsClient'

// dynamic so ?category= param is read server-side
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: { category?: string }
}

export default async function CreditCardsPage({ searchParams }: PageProps) {
  const [allCards, issuers] = await Promise.all([
    fetchCards({ limit: 100 }),
    fetchIssuers(),
  ])

  const initialCategory = searchParams?.category ?? 'all'

  return (
    <div className="container-site py-8">
      <Breadcrumbs crumbs={[{ label: 'Credit Cards' }]} />
      <DisclaimerBlock />
      <CardsClient cards={allCards} issuers={issuers} initialCategory={initialCategory} />

      {/* SEO copy */}
      <div className="mt-14 max-w-3xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to choose a Canadian credit card</h2>
        <div className="prose prose-sm text-gray-600 space-y-3">
          <p>
            Choosing the right credit card depends on your spending habits, lifestyle, and financial goals. If you spend heavily on groceries and dining, a card with elevated earn rates in those categories — like the Amex Cobalt — will outperform a flat-rate card significantly over time.
          </p>
          <p>
            For travellers, the key questions are whether you have a preferred airline (Aeroplan if you fly Air Canada, WestJet if you prefer WestJet), and whether you travel internationally frequently. No-foreign-transaction-fee cards like the Scotiabank Passport Visa Infinite save you 2.5% on every international purchase.
          </p>
          <p>
            If simplicity is your priority, a no-annual-fee cash back card is hard to beat. The Tangerine Money-Back card lets you earn 2% in the categories you choose, with no complexity or annual cost.
          </p>
        </div>
      </div>
    </div>
  )
}
