// app/privacy/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

// Add Metadata for SEO and clear browser tabs
export const metadata: Metadata = {
  title: 'Privacy Policy | Baby Meal Planner',
  description: 'Read the Privacy Policy for babymealsplanner.com to understand how we collect, use, and protect your personal data.',
};

export default function PrivacyPage() {
  const contactEmail = "support@babymealsplanner.com";

  return (
    <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Effective Date: 10 September 2025 | Last Updated: 10 September 2025</p>

        <div className="space-y-8 text-gray-800 prose prose-lg max-w-none">
          <p>
            This Privacy Policy explains how Sky Social Tech Limited ("we", "us", "our") collects, uses, and protects your personal data when you use the Baby Meals Planner website (“Service”). We are committed to safeguarding your privacy.
          </p>
          <p>
            This website is not intended for children, and we do not knowingly collect data relating to children. It is important that you read this privacy policy together with our <Link href="/terms" className="text-indigo-600 hover:underline">Terms and Conditions</Link>.
          </p>

          <section>
            <h2 className="text-2xl font-semibold">Controller</h2>
            <p>Sky Social Tech Limited is the controller and responsible for your personal data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p>We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Identity and Contact Data:</strong> When you create an account, we collect your email address.</li>
              <li><strong>Consent Data:</strong> We collect your marketing consent preferences and a timestamp of your acceptance of our Terms and Conditions.</li>
              <li><strong>Usage Data:</strong> We may collect technical data such as your IP address, browser type, device type, pages visited, and time spent on pages. This data is often collected via analytics tools.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. How and Why We Use Your Data (Our Lawful Basis)</h2>
            <p>We use your data for the following specific purposes, relying on a lawful basis to do so:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>To provide and manage your account:</strong> We use your email address to create and authenticate your account. Our lawful basis is the performance of our contract with you.</li>
              <li><strong>To communicate with you:</strong> We may use your email address to send important service-related updates. Our lawful basis is our legitimate interest to keep you informed about the Service.</li>
              <li><strong>For marketing purposes:</strong> With your explicit consent, we will use your email address to send you updates, newsletters, and promotional content. Our lawful basis is your consent.</li>
              <li><strong>To improve our service:</strong> We analyze Usage Data to understand how users interact with our website, helping us improve features and user experience. Our lawful basis is your consent (provided via the cookie banner).</li>
              <li><strong>To deliver relevant advertising:</strong> We and our third-party partners may use Usage Data and data collected via cookies to show you relevant advertisements on our site. Our lawful basis is your consent.</li>
              <li><strong>To comply with legal obligations:</strong> We may process your data where it is necessary for compliance with a legal obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Marketing Communications</h2>
            <p>We will only send you marketing emails if you have explicitly opted in. You can withdraw your consent and unsubscribe at any time by using the link in our emails or by updating your preferences in your account settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Cookies, Advertising, and Tracking Technologies</h2>
            <p>Our website uses cookies and similar technologies. For non-essential cookies (such as those for analytics and advertising), we will ask for your consent via a cookie banner on your first visit.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Types of Cookies We Use:</strong> We use Strictly Necessary, Analytical/Performance, and Advertising/Targeting cookies.</li>
              <li><strong>Third-Party Advertising (Google AdSense):</strong> We may use Google AdSense to display ads. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Google's Ads Settings</a>.</li>
            </ul>
            <p>For more detailed information, please see our <Link href="/cookies" className="text-indigo-600 hover:underline">Cookie Policy</Link>.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">5. Data Storage & Security</h2>
            <p>Your data is securely stored via our backend provider, Supabase. We use encryption (HTTPS) and appropriate security measures to protect your information.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">6. Data Retention</h2>
            <p>We will retain your personal data for as long as your account remains active to provide you with the Service. You can request the deletion of your account and associated personal data at any time through your account page or by contacting us. Upon receiving a deletion request, your data will be removed in accordance with our procedures, subject to any legal or regulatory obligations that require us to retain it for a longer period.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">7. Third-Party Services & Links</h2>
            <p><strong>Service Providers:</strong> We use trusted third-party providers: Supabase (database and authentication) and OpenAI (for AI-generated meal suggestions).</p>
            <p><strong>Third-Party Links:</strong> Our website may include links to third-party websites. Clicking on those links may allow third parties to collect data about you. We do not control these websites and are not responsible for their privacy statements.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">8. Your Legal Rights (under UK GDPR)</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Request access</strong> to your personal data. This enables you to receive a copy of the personal data we hold about you.</li>
              <li><strong>Request correction</strong> of the personal data that we hold about you.</li>
              <li><strong>Request erasure</strong> of your personal data. This enables you to ask us to delete or remove personal data where there is no good reason for us continuing to process it.</li>
              <li><strong>Object to processing</strong> of your personal data where we are relying on a legitimate interest. You also have the right to object where we are processing your personal data for direct marketing purposes.</li>
              <li><strong>Request restriction of processing</strong> of your personal data. This enables you to ask us to suspend the processing of your personal data in certain scenarios.</li>
              <li><strong>Request the transfer</strong> of your personal data to you or to a third party in a structured, commonly used, machine-readable format.</li>
              <li><strong>Withdraw consent at any time</strong> where we are relying on consent to process your personal data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">9. Changes to This Policy & Contact</h2>
            <p>We may update this policy from time to time. Any changes will be posted on this page. If you have questions, please contact us at: <a href={`mailto:${contactEmail}`} className="text-indigo-600 hover:underline">{contactEmail}</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}