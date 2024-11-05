'use client';

import React, { useState } from 'react';
import FaqSection from '../components/faq/section';
import FaqSearch from '../components/faq/search';
import Header from '../components/layouts/Header'; // Ensure to import Header
import Footer from '../components/layouts/Footer'; // Ensure to import Footer

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is I-CAST Online Voting?",
    answer: "I-CAST Online Voting is a secure and user-friendly platform that allows organizations to conduct elections and voting processes online.",
    category: "General"
  },
  {
    question: "How do I create an account?",
    answer: "To create an account, click on the 'Register' button in the top right corner of the page and follow the prompts to enter your information.",
    category: "Account"
  },
  {
    question: "Is my vote anonymous?",
    answer: "Yes, all votes cast through I-CAST Online Voting are anonymous. Our system ensures that your identity is not linked to your vote.",
    category: "Privacy"
  },
  {
    question: "How secure is the voting process?",
    answer: "We use state-of-the-art encryption and security measures to protect all data and ensure the integrity of the voting process.",
    category: "Security"
  },
  {
    question: "Can I change my vote after submitting it?",
    answer: "Once a vote is submitted, it cannot be changed. Please review your choices carefully before submitting your ballot.",
    category: "Voting"
  },
  {
    question: "What should I do if I encounter technical issues?",
    answer: "If you experience any technical issues, please contact our support team through the 'Help' section or email support@i-cast-voting.com.",
    category: "Support"
  },
  {
    question: "How are the results calculated and verified?",
    answer: "Results are calculated automatically by our secure system. They are then verified by independent auditors to ensure accuracy and fairness.",
    category: "Results"
  },
  {
    question: "Can I use I-CAST for my organization's elections?",
    answer: "Yes, I-CAST Online Voting can be customized for various types of elections and organizations. Contact our sales team for more information.",
    category: "Services"
  },
  {
    question: "What devices can I use to access I-CAST Online Voting?",
    answer: "I-CAST Online Voting is accessible on all modern devices, including desktops, laptops, tablets, and smartphones.",
    category: "General"
  },
  {
    question: "What support resources are available?",
    answer: "We provide a comprehensive help center, FAQs, and dedicated support via email and chat to assist users.",
    category: "Support"
  },
  {
    question: "How do I reset my password?",
    answer: "To reset your password, click on the 'Forgot Password?' link on the login page and follow the instructions sent to your email.",
    category: "Account"
  },
  {
    question: "Are there any fees associated with using I-CAST?",
    answer: "I-CAST offers various pricing plans based on the services required. Please contact our sales team for detailed pricing information.",
    category: "Services"
  }
];

const FaqPage: React.FC = () => {
  const [filteredFaqs, setFilteredFaqs] = useState(faqData);

  const handleSearch = (searchTerm: string) => {
    const filtered = faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFaqs(filtered);
  };

  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FaqItem[]>);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <Header />
      <main className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
        <FaqSearch onSearch={handleSearch} />

        <div className="w-full mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {Object.entries(groupedFaqs).map(([category, items]) => (
            <FaqSection key={category} title={category} items={items} />
          ))}

          {filteredFaqs.length === 0 && (
            <p className="mt-4 text-center text-gray-500">No FAQs found. Please try a different search term.</p>
          )}
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FaqPage;
