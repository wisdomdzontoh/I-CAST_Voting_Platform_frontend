import React from 'react';
import Sidebar from '../components/dashboard/sidebar';
import Header from '../components/dashboard/header';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Welcome to your dashboard! Here you can manage all your activities.
          </p>
          {/* Additional content can be added here */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
