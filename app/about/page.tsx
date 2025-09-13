// app/about/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

// SEO Metadata for the About Page
export const metadata: Metadata = {
  title: 'Our Story | Baby Meals Planner',
  description: 'Learn the story behind Baby Meals Planner, a tool created by a first-time dad for parents everywhere who are struggling with meal ideas for their little ones.',
};

export default function AboutPage() {
  const contactEmail = "support@babymealsplanner.com";

  return (
    <div className="bg-gray-50">
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg">
          <div className="prose prose-lg max-w-none text-gray-800">
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Story</h1>
            
            <p>Like many new parents, my wife and I found ourselves standing in front of the fridge, completely stumped. What should we feed our daughter today? Was it safe? Was it nutritious? The endless searching through books, blogs, and YouTube videos was exhausting and, frankly, stressful.</p>
            <p>We knew we weren't alone in this. Every parent wants the best for their child, but the pressure to be a perfect chef on top of everything else can be overwhelming.</p>
            <p>As a software engineer and a tech enthusiast, I thought: "There has to be a better way." I decided to combine my professional skills with my new life as a dad to build a solution, first just for my own family. I wanted a tool that could instantly give us safe, creative, and healthy meal ideas based on the ingredients we already had.</p>
            <p>After sharing it with a few other parents and seeing their enthusiastic reactions, we decided to make this tool public. Our mission is to reduce one small piece of stress from the beautiful, chaotic journey of parenthood.</p>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 mt-10">
              <h2 className="text-2xl font-semibold !mt-0">Our Promise to You</h2>
              <p>We are committed to making this tool as accessible as possible. <strong>All current features will be completely free to use throughout 2025.</strong></p>
              <p>To help us cover our costs and continue improving the service, we may introduce optional subscription plans in 2026 for a few pounds a month. These would unlock new premium features, but we promise there will always be a useful and generous free version of Baby Meals Planner available forever.</p>
            </div>

            {/* --- THIS HEADING NOW HAS ADDED SPACE ABOVE IT --- */}
            <h2 className="text-2xl font-semibold !mt-12">Join Us on This Journey</h2>
            <p>We are building this for you, and we can't do it without you. If you have any questions, ideas for new features, or just want to share a feeding story, please don't hesitate to reach out. We read every email.</p>
            <p>Contact us anytime at: <a href={`mailto:${contactEmail}`} className="text-indigo-600 hover:underline">{contactEmail}</a></p>
            <p>And if you find our website helpful, the best thing you can do is share it with your friends. Your support helps us grow and improve our service for parents everywhere.</p>
          </div>
        </div>
      </main>

      {/* ================================================================== */}
      {/* ================ NEW, UNIQUE SEO CONTENT SECTION ================= */}
      {/* ================================================================== */}
      <section className="w-full bg-white py-16 px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Your Stress-Free Guide to Baby Meals
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Our planner is designed to give you confidence and save you time at every stage of feeding.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">Instant Inspiration, Zero Waste</h3>
              <p className="text-gray-600">
                Tell us what's in your fridge—even just a carrot and some chicken—and get immediate, creative ideas. Say goodbye to food waste and last-minute trips to the store.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">Confidence in Every Bite</h3>
              <p className="text-gray-600">
                Navigating food allergies can be scary. Easily exclude common allergens from your suggestions to create meal plans that are safe for your little one, giving you peace of mind.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">From Purées to Toddler Meals</h3>
              <p className="text-gray-600">
                Our tool grows with your child. Get simple purée ideas for a 6-month-old or more complex, textured meal suggestions for an adventurous toddler, all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- A NEW, FINAL CALL TO ACTION SECTION --- */}
      <section className="w-full bg-gray-50 py-16 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Simplify Your Meal Planning?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Spend less time worrying and more time enjoying meals with your baby. Generate your first meal idea in seconds.
          </p>
          <Link href="/" className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700">
            Try the Planner for Free
          </Link>
        </div>
      </section>
    </div>
  );
}