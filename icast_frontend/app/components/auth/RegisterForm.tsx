// RegisterForm.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../services/api'; // Update this path as necessary
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = {
        first_name: firstName, // Ensure these field names match your Django backend
        last_name: lastName,
        username,
        email,
        password,
      };

      const response = await api.post('/register/', formData); // Update with the correct endpoint
      toast.success('Registration successful! Please log in.'); // Show success message
      router.push('/login'); // Redirect to the login page
    } catch (error) {
      // Handle error and show a toast notification
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        {/* First Name Field */}
        <div>
          <label htmlFor="first_name" className="sr-only">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-gray-200 bg-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Last Name Field */}
        <div>
          <label htmlFor="last_name" className="sr-only">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-gray-200 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Username Field */}
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-gray-200 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-gray-200 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-gray-200 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          {isLoading ? (
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          ) : (
            'Register'
          )}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;