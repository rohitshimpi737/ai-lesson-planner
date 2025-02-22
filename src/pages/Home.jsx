import Header from "../components/Header";
import {
  WandSparkles,
  Clock,
  BookOpenCheck,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="relative pt-20 pb-32 bg-gradient-to-br from-purple-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Transform Your Teaching with AI
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Create engaging lesson plans in minutes, not hours
              </p>
              <Button
                className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg rounded-full shadow-lg transition-all"
                onClick={() => (window.location.href = "/lesson-planner")}
                >
                <WandSparkles className="mr-2 h-6 w-6" />
                Start Creating Now
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 w-full">
            <svg viewBox="0 0 1440 320" className="fill-current text-white">
              <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
              Why Choose AI Lesson Planner?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                <Clock className="h-12 w-12 text-purple-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-3 dark:text-white">
                  Save Time
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Generate complete lesson plans in minutes instead of hours
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                <BookOpenCheck className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-3 dark:text-white">
                  Expert Quality
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Research-backed templates created by education specialists
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                <GraduationCap className="h-12 w-12 text-green-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-3 dark:text-white">
                  Engage Students
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Interactive activities and modern teaching strategies
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
              What Teachers Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-purple-50 rounded-xl dark:bg-gray-800">
                <p className="text-gray-700 mb-4 italic dark:text-gray-300">
                  "This tool has revolutionized how I plan my lessons. I can now
                  focus more on my students instead of paperwork!"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-purple-600 rounded-full"></div>
                  <div className="ml-4">
                    <p className="font-semibold dark:text-white">
                      Rohit Shimpi
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      High School Science Teacher Mumbai
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl dark:bg-gray-800">
                <p className="text-gray-700 mb-4 italic dark:text-gray-300">
                  "The AI suggestions are incredibly insightful. It's like
                  having a teaching assistant always available!"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-blue-600 rounded-full"></div>
                  <div className="ml-4">
                    <p className="font-semibold dark:text-white">
                     Rohit Shimpi
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      School of Pune
                    </p>
                  </div>
                </div>
              </div>ss
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-20 bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Teaching?
            </h2>
            <Button
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg rounded-full shadow-lg transition-all"
              onClick={() => (window.location.href = "/lesson-planner")}
            >
              <WandSparkles className="mr-2 h-6 w-6" />
              Start Free Now
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
