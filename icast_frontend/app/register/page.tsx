// RegisterPage.tsx

import Link from 'next/link';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <RegisterForm />


    </div>
  );
};

export default RegisterPage;