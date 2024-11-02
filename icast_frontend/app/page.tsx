import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import FeatureCard from "./components/landing/FeatureCard";
import HowItWorks from "./components/landing/HowItWorks";
import Testimonials from "./components/landing/Testimonials";
import AdditionalContent from "./components/landing/AdditionalContent";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content Section */}
      <main className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto flex-1 text-center p-8">
        <h2 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          Empower Your Voice – Vote Anytime, Anywhere
        </h2>
        <p className="text-lg sm:text-xl text-gray-900 max-w-xl">
          Welcome to our Online Voting System! We provide a secure, transparent,
          and seamless way to cast your vote from anywhere in the world. Take part in
          the democratic process with confidence.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="grid gap-6 w-full sm:grid-cols-2">
          <Link
            href="/voting"
            className="py-4 px-6 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105"
          >
            Start Voting
          </Link>
          <Link
            href="/results"
            className="py-4 px-6 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105"
          >
            View Results
          </Link>
        </div>

        {/* How It Works Section */}
        <HowItWorks />
      </main>

      {/* Features Section */}
      <section className="w-full max-w-6xl mt-12 mx-auto">
        <h3 className="text-3xl font-semibold mb-6 text-center">
          Why Choose Our Platform?
        </h3>
        <div className="grid gap-8 sm:grid-cols-3">
          <FeatureCard
            title="Secure & Transparent"
            description="Your vote is encrypted and securely stored on the blockchain to ensure transparency and trust."
            icon="/images/secure.gif"
          />
          <FeatureCard
            title="Easy to Use"
            description="Cast your vote with just a few clicks—no complex processes involved."
            icon="/images/easy-to-use.gif"
          />
          <FeatureCard
            title="Real-Time Results"
            description="Track voting outcomes as they happen, with instant access to live results."
            icon="/images/real-time-results.gif"
          />
        </div>
      </section>

      {/* Additional Content Section */}
      <AdditionalContent />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}
