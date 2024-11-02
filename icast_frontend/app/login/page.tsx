// LoginPage.tsx

import Link from 'next/link';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 rounded-lg shadow-lg p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
        <p className="mt-2 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300">
            Register here
          </Link>
          <br></br>
          <Link href="/" className="font-medium text-blue-400 hover:text-blue-300">
            Home
          </Link>
          </p>
          

      </div>
    </div>
  );
};

export default LoginPage;