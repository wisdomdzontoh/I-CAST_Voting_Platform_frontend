import React from 'react'
import FaqAccordion from './accordion'

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  items: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ title, items }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <FaqAccordion items={items} />
    </div>
  )
}

export default FaqSection