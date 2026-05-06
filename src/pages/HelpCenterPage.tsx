import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import LiquidButton from '../components/LiquidButton';

const HelpCenterPage: React.FC = () => {
  return (
    <div className="pt-24 bg-gray-900 text-gray-300">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Help Center</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              How can we assist you today? We are here to provide the support you need.
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center h-full flex flex-col justify-between hover:shadow-green-500/10 transition-shadow">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Explore our FAQs</h2>
                    <p className="text-gray-400 mb-6">
                        Find quick answers to common questions about our products, services, and company mission in our frequently asked questions section.
                    </p>
                </div>
                <Link to="/faq">
                  <LiquidButton className="w-full">View FAQs</LiquidButton>
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={700}>
               <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center h-full flex flex-col justify-between hover:shadow-green-500/10 transition-shadow">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Us Directly</h2>
                    <p className="text-gray-400 mb-6">
                       Have a specific question or partnership inquiry? Our team is ready to help. Reach out to us via our contact page.
                    </p>
                </div>
                <Link to="/contact">
                  <LiquidButton className="w-full">Contact Us</LiquidButton>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenterPage;