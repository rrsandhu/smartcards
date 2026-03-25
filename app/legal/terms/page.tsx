import type { Metadata } from 'next'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Terms of Use — PointsNorth',
}

export default function TermsPage() {
  return (
    <div className="container-site py-8 max-w-3xl">
      <Breadcrumbs crumbs={[{ label: 'Legal', href: '#' }, { label: 'Terms of Use' }]} />
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: July 1, 2024</p>
        <div className="space-y-6 text-gray-700 text-[15px] leading-relaxed">
          <p>By accessing PointsNorth, you agree to these terms. If you do not agree, please do not use this site.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Information Accuracy</h2>
          <p>PointsNorth strives to provide accurate, up-to-date information about Canadian credit cards and financial products. However, rates, fees, and offer details change frequently. Always verify current terms directly with the card issuer before making any financial decision.</p>
          <p>Nothing on this site constitutes financial, investment, tax, or legal advice. We are a publisher of general financial information, not a licensed financial advisor.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Intellectual Property</h2>
          <p>All content on PointsNorth — including articles, card reviews, images, and data — is the property of PointsNorth and may not be reproduced without permission.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Third-Party Links</h2>
          <p>Our site contains links to third-party websites, including credit card application pages. We are not responsible for the content, accuracy, or practices of those sites. When you click an affiliate link, you leave PointsNorth and become subject to the third party's terms and privacy policies.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Limitation of Liability</h2>
          <p>PointsNorth is not liable for any damages arising from your use of this site or reliance on information published here. Use this site at your own risk.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Governing Law</h2>
          <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Changes</h2>
          <p>We may update these terms at any time. Continued use of the site constitutes acceptance of the revised terms.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Contact</h2>
          <p>Questions: <a href="mailto:hello@pointsnorth.ca" className="text-navy-600 underline">hello@pointsnorth.ca</a></p>
        </div>
      </div>
    </div>
  )
}
