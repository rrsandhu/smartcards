import type { Metadata } from 'next'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy — SmartCardOffers',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container-site py-8 max-w-3xl">
      <Breadcrumbs crumbs={[{ label: 'Legal', href: '#' }, { label: 'Privacy Policy' }]} />
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: July 1, 2024</p>
        <div className="space-y-6 text-gray-700 text-[15px] leading-relaxed">
          <p>SmartCardOffers ("we," "us," or "our") is committed to protecting your privacy. This policy describes what data we collect, how we use it, and your rights.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Information We Collect</h2>
          <p>We may collect:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Contact form submissions</strong> — name, email, and message content</li>
            <li><strong>Newsletter sign-ups</strong> — email address</li>
            <li><strong>Usage data</strong> — page views, referral sources, and general browsing behavior via analytics tools</li>
            <li><strong>Cookies</strong> — to improve user experience and measure site performance</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">How We Use Your Data</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>To respond to inquiries and provide support</li>
            <li>To send our newsletter if you have subscribed</li>
            <li>To improve our website and content through aggregate analytics</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Third Parties</h2>
          <p>
            We use third-party services including analytics providers and email platforms. We do not sell your personal data to third parties. When you click affiliate links, you are taken to the card issuer's website and are subject to their privacy policy.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Your Rights (PIPEDA)</h2>
          <p>Under Canada's PIPEDA, you have the right to access, correct, and request deletion of your personal data. To exercise these rights, contact us at <a href="mailto:hello@smartcardoffers.ca" className="text-navy-600 underline">hello@smartcardoffers.ca</a>.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Cookies</h2>
          <p>You can control cookies through your browser settings. Disabling cookies may affect some site functionality.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8">Contact</h2>
          <p>Questions about this policy: <a href="mailto:hello@smartcardoffers.ca" className="text-navy-600 underline">hello@smartcardoffers.ca</a></p>
        </div>
      </div>
    </div>
  )
}
