import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';

const faqs = [
  {
    question: "What is biocement?",
    answer: "Biocement is a revolutionary, eco-friendly building material created through a process called microbial induced calcite precipitation (MICP). Instead of the high-energy process used for traditional cement, we use natural microorganisms to bind recycled waste materials together, forming strong, durable, and low-carbon bricks and blocks."
  },
  {
    question: "How are your biofertilizers different from chemical fertilizers?",
    answer: "Our organic biofertilizers are derived from decomposed biological waste, enriching the soil with essential nutrients and beneficial microorganisms. Unlike chemical fertilizers that can degrade soil quality over time, our products improve soil structure, water retention, and long-term fertility, leading to healthier crops and a more sustainable agricultural ecosystem."
  },
  {
    question: "Are your products certified?",
    answer: "Yes, all our products undergo rigorous third-party testing to ensure they meet industry standards for quality, safety, and performance. We provide transparent, QR-coded traceability for our product batches."
  },
  {
    question: "Where do you source your waste materials from?",
    answer: "We partner with local industries, municipalities, and agricultural communities to source our raw materials. This includes construction debris, industrial by-products, and organic farm waste. Our circular sourcing model helps reduce landfill waste and supports the local economy."
  },
  {
    question: "Do you offer services for industries?",
    answer: "Absolutely. Our Waste-to-Product R&D service is designed for industries looking to transform their waste streams into valuable assets. We collaborate with companies to develop custom solutions, turning their environmental liabilities into profitable, sustainable products."
  }
];

const AccordionItem: React.FC<{ faq: { question: string; answer: string }, isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick }) => (
    <div className="border-b border-gray-700 py-4">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left text-lg font-semibold text-white hover:text-green-400 transition-colors">
            <span>{faq.question}</span>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-green-400' : ''}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
            <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
        </div>
    </div>
);

const FaqsPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <div className="pt-24 bg-gray-900 text-gray-300">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about our products, services, and mission.
            </p>
          </AnimatedSection>
          
          <AnimatedSection className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} faq={faq} isOpen={openIndex === index} onClick={() => handleClick(index)} />
            ))}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default FaqsPage;