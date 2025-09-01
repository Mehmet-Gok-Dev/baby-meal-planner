// app/privacy/page.tsx
import Link from 'next/link';

export default function PrivacyPage() {
  const contactEmail = "your-email@example.com"; // Change this to your actual email

  return (
    <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Effective Date: 1 September 2025 | Last Updated: 1 September 2025</p>

        <div className="space-y-8 text-gray-800 prose prose-lg max-w-none">
          <p>This Privacy Policy explains how we collect, use, and protect your personal data when you use the Baby Meal Planner website (“Service”). We are committed to safeguarding your privacy and ensuring transparency in how your information is handled.</p>

          <section>
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p>We collect the following types of data:</p>
            <h3 className="text-xl font-semibold mt-4">Personal Data</h3>
            <p>When you create an account or use our Service, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email address</li>
              <li>Marketing consent preferences</li>
              <li>Timestamp of terms acceptance</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4">Usage Data</h3>
            <p>We may collect technical data such as: IP address, browser type and version, pages visited and time spent, and device type and operating system. This helps us improve performance and user experience. (Note: Usage data may be collected via tools like Google Analytics.)</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. How We Use Your Data</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and maintain the Service</li>
              <li>Authenticate your login and personalize your experience</li>
              <li>Send you updates, newsletters, and promotional content (only if you’ve opted in)</li>
              <li>Improve our content and features based on usage patterns</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Marketing Communications</h2>
            <p>We will only send marketing emails if you’ve explicitly opted in during signup. You can unsubscribe at any time using the link in our emails or by updating your preferences in your account settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Data Storage & Security</h2>
            <p>Your data is securely stored via our backend provider, Supabase. We use encryption, secure protocols (HTTPS), and access controls to protect your information. However, no online system is 100% secure, and we encourage you to use strong passwords and keep your login credentials confidential.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">5. Your Rights</h2>
            <p>Under UK GDPR, you have the right to: access your personal data, correct inaccurate data, request deletion of your data, withdraw marketing consent, and lodge a complaint with the Information Commissioner’s Office (ICO). You can exercise these rights by contacting us at <a href={`mailto:${contactEmail}`} className="text-indigo-600 hover:underline">{contactEmail}</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Third-Party Services</h2>
            <p>We use trusted third-party providers to deliver our Service: Supabase (for database and authentication) and OpenAI (for AI-generated meal suggestions). These providers only access your data to perform specific tasks and are bound by confidentiality agreements.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">7. Data Retention</h2>
            <p>We retain user data for up to 12 months after the last login, unless deletion is requested earlier.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we’ll notify you via email if the changes are significant.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">9. Contact</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us at: <a href={`mailto:${contactEmail}`} className="text-indigo-600 hover:underline">{contactEmail}</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}