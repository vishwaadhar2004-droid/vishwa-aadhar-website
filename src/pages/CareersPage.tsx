import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const CareersPage: React.FC = () => {
  return (
    <div className="pt-24 bg-gray-900 text-gray-300">
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join Our Team</h1>
            <p className="text-lg text-gray-400 mb-8">
              Join our team and help us build a sustainable future.
            </p>
            
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">No Openings Currently</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                    We are not actively hiring at the moment, but we are always interested in connecting with talented individuals who are passionate about our mission. Feel free to send your resume to <a href="mailto:vishwaadhar2004@gmail.com" className="text-green-400 font-semibold hover:underline">vishwaadhar2004@gmail.com</a> and we will keep it on file for future opportunities.
                </p>
            </div>

          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;