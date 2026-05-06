
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import LiquidButton from '../components/LiquidButton';

import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const ContactPage: React.FC = () => {
  const [details, setDetails] = useState<any>(null);

  React.useEffect(() => {
    const path = 'site_settings/contact';
    const unsub = onSnapshot(doc(db, 'site_settings', 'contact'), (docSnapshot) => {
        if (docSnapshot.exists()) {
            setDetails(docSnapshot.data());
        } else {
            setDetails({
                email: "vishwaadhar2004@gmail.com",
                phone: "+91 73979 86935",
                address: "At. Badlapur, pincode-421503"
            });
        }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
    return () => unsub();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
        const response = await fetch('https://formspree.io/f/mwpgnjlk', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            const data = await response.json();
            // FIX: Replace Object.hasOwn with Object.prototype.hasOwnProperty.call for better compatibility.
            if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                setErrorMessage(data["errors"].map((error: any) => error["message"]).join(", "));
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    } catch (error) {
        setErrorMessage('A network error occurred. Please check your connection and try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 bg-gray-900 text-gray-300">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              We're here to answer your questions and explore partnerships. Reach out to us.
            </p>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <AnimatedSection>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg h-full">
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <p className="text-gray-400 mb-8">
                  Fill out the form and our team will get back to you within 24 hours. You can also reach us through the channels below.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <a href={`mailto:${details?.email || 'vishwaadhar2004@gmail.com'}`} className="text-lg hover:text-green-400 transition-colors">{details?.email || 'vishwaadhar2004@gmail.com'}</a>
                  </div>
                   <div className="flex items-center space-x-4">
                     <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    <a href={`tel:${details?.phone || '+917397986935'}`} className="text-lg hover:text-green-400 transition-colors">{details?.phone || '+91 73979 86935'}</a>
                  </div>
                  <div className="flex items-start space-x-4">
                     <svg className="w-6 h-6 text-green-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="text-lg">{details?.address || 'At. Badlapur, pincode-421503'}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Contact Form */}
            <AnimatedSection delay={700}>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
                {isSubmitted ? (
                  <div className="text-center py-10 flex flex-col items-center justify-center h-full">
                    <h3 className="text-2xl font-bold text-green-400 mb-4">Thank You!</h3>
                    <p className="text-gray-300 mb-8">Your message has been sent successfully. We'll be in touch soon.</p>
                    <LiquidButton onClick={() => setIsSubmitted(false)}>Send Another Message</LiquidButton>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-green-500 focus:border-green-500"/>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-green-500 focus:border-green-500"/>
                      </div>
                    </div>
                    <div className="mt-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                      <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-green-500 focus:border-green-500"/>
                    </div>
                    <div className="mt-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                      <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:ring-green-500 focus:border-green-500"></textarea>
                    </div>
                    <div className="mt-8 text-right">
                      <LiquidButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </LiquidButton>
                    </div>
                    {errorMessage && (
                      <p className="mt-4 text-center text-red-400">{errorMessage}</p>
                    )}
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;