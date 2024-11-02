import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 py-6 mt-12">
      <div className="max-w-6xl mx-auto text-center text-gray-400 dark:text-gray-300">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Online Voting Platform. All Rights Reserved.
        </p>
        <div className="flex justify-center gap-8 mt-4">
          <Link href="#" className="hover:text-blue-400 transition duration-200">Privacy Policy</Link>
          <Link href="#" className="hover:text-blue-400 transition duration-200">Terms of Service</Link>
          <Link href="#" className="hover:text-blue-400 transition duration-200">Contact Us</Link>
        </div>
        <div className="mt-4">
          <Image
            src="/images/logo.png" // Ensure you have the correct logo path
            alt="Logo"
            width={30}
            height={30}
            className="inline-block"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
