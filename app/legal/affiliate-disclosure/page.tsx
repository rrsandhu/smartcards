import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — SmartCardOffers',
  description: 'SmartCardOffers earns commissions through affiliate links. Our editorial opinions are independent and not influenced by advertiser relationships.',
  alternates: { canonical: 'https://smartcardoffers.ca/legal/affiliate-disclosure' },
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="container-site py-10 max-w-3xl">
      <Breadcrumbs crumbs={[{ label: 'Legal', href: '/legal/affiliate-disclosure' }, { label: 'Affiliate Disclosure' }]} />

      <div className="mt-6 space-y-8 text-[15px] leading-relaxed text-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Affiliate Disclosure</h1>
          <p className="text-sm text-gray-500">Last updated: April 6, 2026</p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-900">
          <strong>Summary:</strong> SmartCardOffers earns referral commissions when you apply for financial products through our links. This never affects how we rank or review products — our editorial team operates independently.
        </div>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Who We Are</h2>
          <p>
            SmartCardOffers is an independent Canadian personal finance website. We produce editorial content about credit cards, loyalty programs, mortgage tools, and personal finance for Canadians. We are not a bank, credit union, or licensed financial advisor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How We Earn Revenue</h2>
          <p className="mb-3">
            SmartCardOffers earns revenue primarily through <strong>affiliate referral commissions</strong>. When you click a link on our site and subsequently apply for and are approved for a financial product (such as a credit card), we may receive a commission from the financial institution.
          </p>
          <p className="mb-3">
            We may also earn revenue through:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-3">
            <li>Display advertising served by third-party ad networks</li>
            <li>Sponsored content, clearly labelled as such</li>
            <li>Direct partnerships with financial institutions</li>
          </ul>
          <p className="mt-3">
            Commission amounts vary by product and issuer. We have no control over application approval decisions — these are made entirely by the financial institution based on your application and creditworthiness.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How Affiliate Relationships Affect Our Content</h2>
          <p className="mb-3">
            Our affiliate relationships do <strong>not</strong> determine which products we feature, how we rank them, or what we say about them. Our editorial team evaluates products independently based on their merit to Canadian consumers.
          </p>
          <p className="mb-3">Specifically, our editorial policy requires that:</p>
          <ul className="list-disc list-inside space-y-2 ml-3">
            <li>Cards are included in comparisons regardless of whether an affiliate relationship exists</li>
            <li>Cards that pay higher commissions are not ranked higher as a result</li>
            <li>All reviews include honest pros and cons, including for advertiser products</li>
            <li>"Best of" lists and editor's picks are based purely on editorial merit</li>
            <li>Negative aspects of products are not suppressed to protect commercial relationships</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to Identify Affiliate Links</h2>
          <p>
            Affiliate links on SmartCardOffers are typically labelled "Apply Now" or "Get This Card." These links navigate to the card issuer's official application page. We do not hide or disguise affiliate links. A general disclosure notice appears on every page of this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Compliance</h2>
          <p>
            SmartCardOffers complies with the Competition Bureau of Canada's guidelines on online advertising and the CRTC's requirements for disclosure of commercial relationships. We are committed to transparency in all advertising and affiliate arrangements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Questions or Concerns</h2>
          <p>
            If you have questions about our affiliate relationships, editorial independence, or how we earn revenue, please contact us at{' '}
            <a href="mailto:hello@smartcardoffers.ca" className="text-blue-600 underline hover:text-blue-800">
              hello@smartcardoffers.ca
            </a>
            {' '}or visit our <Link href="/contact" className="text-blue-600 underline hover:text-blue-800">contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
