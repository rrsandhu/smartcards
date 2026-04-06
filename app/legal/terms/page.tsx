import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Terms of Use — SmartCardOffers',
  description: 'Terms of use for SmartCardOffers. Read our conditions for accessing the site, using our content, and clicking affiliate links.',
  alternates: { canonical: 'https://smartcardoffers.ca/legal/terms' },
}

export default function TermsPage() {
  return (
    <div className="container-site py-10 max-w-3xl">
      <Breadcrumbs crumbs={[{ label: 'Legal', href: '/legal/terms' }, { label: 'Terms of Use' }]} />

      <div className="mt-6 space-y-8 text-[15px] leading-relaxed text-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
          <p className="text-sm text-gray-500">Last updated: April 6, 2026</p>
        </div>

        <p>
          These Terms of Use govern your access to and use of SmartCardOffers ("we," "us," "our"), available at <strong>smartcardoffers.ca</strong>. By accessing or using this site, you agree to be bound by these terms. If you do not agree, please do not use this site.
        </p>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. No Financial Advice</h2>
          <p>
            Nothing on SmartCardOffers constitutes financial, investment, tax, or legal advice. We are a publisher of general financial information for educational purposes only. We are not a licensed financial planner, investment advisor, mortgage broker, or insurance agent.
          </p>
          <p className="mt-3">
            Always verify current rates, fees, and offer terms directly with the card issuer or financial institution before making any financial decision. Credit card offers, annual fees, interest rates, and welcome bonuses change frequently and may not reflect the most current terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Accuracy of Information</h2>
          <p>
            We make every effort to ensure that the information published on SmartCardOffers is accurate and up to date. However, we make no warranty — express or implied — about the completeness, accuracy, reliability, or suitability of any information on this site.
          </p>
          <p className="mt-3">
            Rates, fees, offer values, and product features are subject to change by the issuer at any time without notice. SmartCardOffers is not responsible for discrepancies between information on this site and information provided by card issuers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Affiliate Links and Commercial Relationships</h2>
          <p>
            Some links on SmartCardOffers are affiliate links. When you click an affiliate link and are approved for a product, we may earn a commission. This does not affect the price you pay or the terms of the product. For full details, see our{' '}
            <Link href="/legal/affiliate-disclosure" className="text-blue-600 underline hover:text-blue-800">
              Affiliate Disclosure
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
          <p>
            All content on SmartCardOffers — including articles, guides, card reviews, comparison tools, calculators, images, and data — is the proprietary property of SmartCardOffers or its content licensors. You may not reproduce, republish, distribute, or commercially exploit our content without express written permission.
          </p>
          <p className="mt-3">
            Personal, non-commercial use (such as sharing a link or quoting a short passage with attribution) is permitted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party Links</h2>
          <p>
            Our site contains links to third-party websites, including financial institutions, credit card application pages, and external resources. We are not responsible for the content, accuracy, availability, or privacy practices of those sites. Links to third-party sites do not constitute endorsement.
          </p>
          <p className="mt-3">
            When you click an external link or affiliate link, you leave SmartCardOffers and become subject to the terms and privacy policies of the destination website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Prohibited Use</h2>
          <p className="mb-2">You agree not to:</p>
          <ul className="list-disc list-inside space-y-1.5 ml-3">
            <li>Use this site for any unlawful purpose</li>
            <li>Scrape, copy, or systematically extract our content using automated tools</li>
            <li>Attempt to gain unauthorised access to any part of the site or our systems</li>
            <li>Use the site to transmit malware or harmful code</li>
            <li>Misrepresent your affiliation with SmartCardOffers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Disclaimer of Warranties</h2>
          <p>
            SmartCardOffers is provided "as is" and "as available" without any warranty of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, SmartCardOffers and its operators, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or reliance on, this site or its content — including but not limited to financial losses resulting from credit card applications or decisions made based on information found here.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Governing Law</h2>
          <p>
            These Terms of Use are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes shall be resolved exclusively in the courts of Ontario.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to These Terms</h2>
          <p>
            We may update these Terms of Use at any time. The date at the top of this page reflects the most recent revision. Your continued use of the site after any changes constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact</h2>
          <p>
            Questions about these Terms of Use? Contact us at{' '}
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
