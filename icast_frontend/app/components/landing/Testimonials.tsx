// app/components/landing/Testimonials.tsx
const Testimonials = () => {
    return (
      <section className="w-full max-w-6xl mt-12 mx-auto p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">What Our Users Say</h3>
        <div className="space-y-4">
          <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700 dark:text-gray-300">
            "Voting has never been easier! I can vote from anywhere and feel secure knowing my voice is heard."
            <footer className="mt-2 font-semibold">– Alex J.</footer>
          </blockquote>
          <blockquote className="border-l-4 border-green-600 pl-4 italic text-gray-700 dark:text-gray-300">
            "The real-time results feature is amazing! I love seeing the updates as they come in."
            <footer className="mt-2 font-semibold">– Sarah K.</footer>
          </blockquote>
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  