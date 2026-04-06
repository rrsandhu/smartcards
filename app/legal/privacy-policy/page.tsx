import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy — SmartCardOffers',
  description: 'SmartCardOffers privacy policy — what personal data we collect, how we use it, and your rights under PIPEDA as a Canadian user.',
  alternates: { canonical: 'https://smartcardoffers.ca/legal/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container-site py-10 max-w-3xl">
      <Breadcrumbs crumbs={[{ label: 'Legal', href: '/legal/privacy-policy' }, { label: 'Privacy Policy' }]} />

      <div className="mt-6 space-y-8 text-[15px] leading-relaxed text-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: April 6, 2026</p>
        </div>

        <p>
          SmartCardOffers ("we," "us," or "our") is committed to protecting the privacy of our users. This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you use our website at <strong>smartcardoffers.ca</strong>.
        </p>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
          <h3 className="font-semibold text-gray-800 mb-2">Information You Provide Directly</h3>
          <ul className="list-disc list-inside space-y-1.5 ml-3 mb-4">
            <li><strong>Contact form submissions</strong> — your name, email address, and message</li>
            <li><strong>Newsletter sign-up</strong> — your email address</li>
          </ul>
          <h3 className="font-semibold text-gray-800 mb-2">Information Collected Automatically</h3>
          <ul className="list-disc list-inside space-y-1.5 ml-3">
            <li><strong>Usage data</strong> — pages visited, time on page, referral source, and general browsing behaviour via analytics</li>
            <li><strong>Device information</strong> — browser type, operating system, and screen size (non-identifying)</li>
            <li><strong>IP address</strong> — used for analytics and fraud prevention, not stored long-term</li>
            <li><strong>Cookies</strong> — see the Cookies section below</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1.5 ml-3">
            <li>To respond to your inquiries and provide customer support</li>
            <li>To send you our newsletter if you have subscribed (you can unsubscribe at any time)</li>
            <li>To analyse and improve site performance and content quality</li>
            <li>To detect and prevent fraudulent or abusive activity</li>
            <li>To comply with applicable laws and legal obligations</li>
          </ul>
          <p className="mt-3">
            We do not use your personal information to make automated decisions that significantly affect you, and we do not engage in profiling for targeted advertising.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies</h2>
          <p className="mb-3">
            We use cookies and similar technologies to improve your experience on our site. Cookies we may use include:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ml-3">
            <li><strong>Essential cookies</strong> — required for basic site functionality</li>
            <li><strong>Analytics cookies</strong> — help us understand how visitors use the site (e.g., Google Analytics or similar)</li>
            <li><strong>Preference cookies</strong> — remember your settings and preferences</li>
          </ul>
          <p className="mt-3">
            You can control or disable cookies through your browser settings. Disabling analytics cookies will not affect your ability to use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
          <p className="mb-3">
            We use third-party services to operate this website, including:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ml-3">
            <li><strong>Analytics providers</strong> — aggregate, anonymised usage statistics</li>
            <li><strong>Email service providers</strong> — for newsletter distribution</li>
            <li><strong>Hosting and infrastructure</strong> — Vercel (servers in North America)</li>
          </ul>
          <p className="mt-3">
            We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
          </p>
          <p className="mt-3">
            When you click an affiliate link to a financial institution's website, you leave SmartCardOffers and become subject to that institution's own privacy policy and terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Retention</h2>
          <p>
            We retain personal data only as long as necessary to fulfil the purpose for which it was collected, or as required by law. Contact form submissions and newsletter subscriber information are deleted upon request. Analytics data is retained in aggregate form and not linked to identifiable individuals.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights Under PIPEDA</h2>
          <p className="mb-3">
            As a Canadian, you have rights under the <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA), including:
          </p>
          <ul className="list-disc list-inside space-y-1.5 ml-3">
            <li>The right to <strong>access</strong> the personal information we hold about you</li>
            <li>The right to <strong>correct</strong> inaccurate information</li>
            <li>The right to <strong>withdraw consent</strong> to the collection or use of your data</li>
            <li>The right to <strong>request deletion</strong> of your personal data</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:hello@smartcardoffers.ca" className="text-blue-600 underline hover:text-blue-800">
              hello@smartcardoffers.ca
            </a>. We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Children's Privacy</h2>
          <p>
            SmartCardOffers is not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal information, please contact us and we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The date at the top of this page reflects when it was last revised. Continued use of the site after changes constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
          <p>
            Questions or concerns about this policy? Contact us at{' '}
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
