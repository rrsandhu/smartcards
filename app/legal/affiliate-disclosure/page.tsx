import type { Metadata } from 'next'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — PointsNorth',
  description: 'PointsNorth affiliate disclosure — how we earn revenue through referral commissions and how this affects our content.',
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="container-site py-8 max-w-3xl">
      <Breadcrumbs crumbs={[{ label: 'Legal', href: '#' }, { label: 'Affiliate Disclosure' }]} />
      <div className="mt-6 prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Affiliate Disclosure</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: July 1, 2024</p>

        <div className="space-y-6 text-gray-700 text-[15px] leading-relaxed">
          <p>
            PointsNorth ("we," "us," or "our") operates as an independent editorial website covering Canadian credit cards, loyalty programs, and personal finance. We are committed to transparency about how we earn revenue.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">How We Earn Revenue</h2>
          <p>
            PointsNorth earns revenue primarily through affiliate referral commissions. When a reader clicks a link to a financial product (such as a credit card application) on our website and is subsequently approved for that product, we may receive a commission or referral fee from the financial institution.
          </p>
          <p>
            The commission amount varies by product and issuer. We have no control over approval decisions — these are made entirely by the card issuer based on your application.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">How This Affects Our Content</h2>
          <p>
            Our affiliate relationships do <strong>not</strong> influence how we evaluate, rank, or recommend financial products. Our editorial team operates independently from our commercial operations.
          </p>
          <p>
            Specifically:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>We include credit cards in our comparisons regardless of whether we have an affiliate relationship</li>
            <li>Cards that pay us higher commissions are not ranked higher as a result</li>
            <li>We publish honest pros and cons for all reviewed products, including those we have affiliate relationships with</li>
            <li>Our "best of" lists and editor's picks are based on editorial merit, not commission rates</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">FTC / CRTC Compliance</h2>
          <p>
            In accordance with applicable advertising disclosure requirements, we clearly disclose our affiliate relationships at the top of relevant pages using language such as "Advertiser Disclosure" or similar notices.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Questions</h2>
          <p>
            If you have questions about our affiliate relationships or editorial policies, please contact us at{' '}
            <a href="mailto:hello@pointsnorth.ca" className="text-navy-600 underline">hello@pointsnorth.ca</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
