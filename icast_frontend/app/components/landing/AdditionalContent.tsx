const AdditionalContent = () => {
    return (
      <section className="w-full max-w-4xl mx-auto my-12 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold mb-6 text-center">Join Us Today!</h3>
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
          Experience the future of voting with our platform. We offer a range of features
          designed to ensure that your voting experience is smooth, secure, and accessible
          from any device.
        </p>
        <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
          With our platform, you can be assured of:
        </p>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Access to diverse voting options</li>
          <li>Updates and notifications on upcoming elections</li>
          <li>A community of engaged voters</li>
        </ul>
        <p className="mt-4 text-lg text-gray-800 dark:text-gray-200">
          Don’t miss out! Sign up now to make your voice heard!
        </p>
      </section>
    );
  };
  
  export default AdditionalContent;
  