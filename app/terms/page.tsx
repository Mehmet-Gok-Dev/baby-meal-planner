// app/terms/page.tsx
import Link from 'next/link';

export default function TermsPage() {
  const contactEmail = "your-email@example.com"; // Change this to your actual email

  return (
    <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">📜 Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Effective Date: 1 September 2025 | Last Updated: 1 September 2025</p>

        <div className="space-y-8 text-gray-800 prose prose-lg max-w-none">
          <p>Welcome to Baby Meal Planner. These Terms & Conditions govern your use of our website and services. By accessing or using the Service, you agree to be bound by these terms.</p>
          
          <section>
            <h2 className="text-2xl font-semibold">1. User Accounts</h2>
            <p>To use certain features, you must create an account. You agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate and current information</li>
              <li>Keep your password secure</li>
              <li>Accept responsibility for all activity under your account</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-red-800">2. AI-Generated Content Disclaimer</h2>
            <p>Our Service provides AI-generated baby meal suggestions for informational purposes only. These are not medical or nutritional advice.</p>
            <p>You agree that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You are solely responsible for evaluating the safety and suitability of any meals for your child</li>
              <li>You will consult a qualified healthcare provider before making dietary changes</li>
              <li>You understand that choking risks, allergies, and age-appropriateness must be assessed by you</li>
            </ul>
            <p className="font-bold mt-4">We disclaim all liability for any harm resulting from reliance on AI-generated suggestions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Intellectual Property</h2>
            <p>All content, branding, and functionality on the Service are the property of Mehmet and/or licensors. You may not copy, reproduce, or distribute any part of the Service without permission.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, we are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Service or reliance on its content.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Indemnity</h2>
            <p>You agree to indemnify and hold us harmless from any claims, damages, or liabilities arising from your use of the Service or violation of these Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Governing Law</h2>
            <p>These Terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts in the United Kingdom.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold">7. Changes to Terms</h2>
            <p>We may update these Terms from time to time. We’ll notify you of material changes via email or on the site. Continued use of the Service after changes means you accept the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. Contact</h2>
            <p>For questions about these Terms, reach out to: <a href={`mailto:${contactEmail}`} className="text-indigo-600 hover:underline">{contactEmail}</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}