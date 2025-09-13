// app/cookies/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | Baby Meal Planner',
  description: 'Learn about how Baby Meal Planner uses cookies to improve your experience.',
};

export default function CookiePolicyPage() {
  const contactEmail = "support@babymealsplanner.com";

  return (
    <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">🍪 Cookie Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: 10 September 2025</p>

        <div className="space-y-8 text-gray-800 prose prose-lg max-w-none">
          <p>
            This Cookie Policy explains how Sky Social Tech Limited ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website at <Link href="/" className="text-indigo-600 hover:underline">www.babymealsplanner.com</Link>. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <section>
            <h2 className="text-2xl font-semibold">What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">How and why we use cookies</h2>
            <p>
              We use cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our site. Third parties serve cookies through our website for advertising, analytics, and other purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Strictly Necessary Cookies:</strong> These are essential for you to browse the website and use its features, such as accessing secure areas of the site (e.g., logging into your account). They are provided by our backend service, Supabase.
              </li>
              <li>
                <strong>Analytical/Performance Cookies:</strong> These cookies collect information about how you use our website, like which pages you visited and which links you clicked on. This information is aggregated and anonymized and helps us improve how our website works. These are only used if you give consent. The provider is Google Analytics.
              </li>
              <li>
                <strong>Advertising/Targeting Cookies:</strong> These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. These cookies can share that information with other organizations or advertisers. These are only used if you give consent. Providers include Google AdSense and other third-party ad networks.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">How can you control cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject non-essential cookies. You can exercise your cookie preferences by using our Cookie Consent Banner when you first visit our site. Once you have made a choice, the banner will disappear.
            </p>
            <p>
              Additionally, you can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Where can you get further information?</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please email us at <a href={`mailto:${contactEmail}`} className="text-indigo-600 hover:underline">{contactEmail}</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}