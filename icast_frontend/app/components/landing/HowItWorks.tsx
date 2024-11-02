// app/components/landing/HowItWorks.tsx
const HowItWorks = () => {
    return (
      <section className="mt-12">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">How It Works</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Our voting system is designed to make the voting process easy and accessible. Here’s how it works:
        </p>
        <ul className="list-disc text-left mx-auto space-y-4 max-w-xl">
          <li className="text-gray-600 dark:text-gray-400">
            <strong>Register:</strong> Sign up and create your account in minutes.
          </li>
          <li className="text-gray-600 dark:text-gray-400">
            <strong>Vote:</strong> Access the ballot and cast your vote securely.
          </li>
          <li className="text-gray-600 dark:text-gray-400">
            <strong>Track Results:</strong> Monitor the counting process in real time.
          </li>
        </ul>
      </section>
    );
  };
  
  export default HowItWorks;
  