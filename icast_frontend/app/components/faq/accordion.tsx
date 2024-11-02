import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default FaqAccordion