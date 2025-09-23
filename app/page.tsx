import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MealPlannerTool from "@/components/MealPlannerTool";
import Link from "next/link";

// ✅ SEO metadata
export const metadata = {
  title: "Baby Meals Planner – Healthy Meal Ideas for Your Baby",
  description:
    "Get healthy, safe baby meal ideas based on age, ingredients, and allergies.",
};

export default async function HomePage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          cookieStore.getAll().map((c) => ({
            name: c.name,
            value: c.value,
          })),
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 🚨 If not logged in → redirect to login page
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 space-y-8">
        <MealPlannerTool />

        {/* Reviews Button */}
        <Link
          href="/reviews"
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold"
        >
          See Reviews & Leave Feedback
        </Link>
      </main>

      {/* Marketing Section */}
      <section className="w-full bg-gray-100 py-16 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Never Wonder What to Cook Again
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Save Time & Reduce Waste
            </h3>
            <p className="text-gray-600">
              Use the ingredients in your fridge right now. No more last-minute
              grocery store trips.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Allergy-Aware Ideas
            </h3>
            <p className="text-gray-600">
              Specify common allergens to get safe, customized weaning recipes
              for your baby.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Explore New Tastes
            </h3>
            <p className="text-gray-600">
              Our AI helps you discover new food combinations, making mealtime
              exciting and nutritious.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                What should I feed my 6-month-old?
              </h3>
              <p className="text-gray-600 mt-1">
                For a 6-month-old starting solids, single-ingredient purées are
                perfect. Our tool can give you simple ideas to start your weaning journey.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Do you provide full weaning recipes?
              </h3>
              <p className="text-gray-600 mt-1">
                Our AI generates meal ideas and simple preparation steps, perfect for busy parents who need quick inspiration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Can this help with a toddler meal plan?
              </h3>
              <p className="text-gray-600 mt-1">
                Absolutely! By selecting the '12+ months' age range, you'll get ideas for more complex meals suitable for a toddler.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center bg-indigo-50 p-6 rounded-lg border border-indigo-200">
            <p className="text-lg text-gray-800">
              Have any other questions or recommendations? We'd love to hear from you!
            </p>
            <p className="mt-2">
              <a
                href="mailto:support@babymealsplanner.com"
                className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                support@babymealsplanner.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
