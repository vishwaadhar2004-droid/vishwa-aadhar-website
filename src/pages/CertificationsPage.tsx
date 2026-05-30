import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle, FileText, ZoomIn, Download, ExternalLink } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { motion, AnimatePresence } from 'motion/react';

const CertificationsPage: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const certificateUrl = "https://i.postimg.cc/wBtbxTkh/Whats-App-Image-2026-05-30-at-4-16-22-PM.jpg";

  const certHighlights = [
    {
      icon: Award,
      title: "Government of India MSME Registration",
      desc: "Vishwa Aadhar Enterprises is officially registered and recognized under the Ministry of Micro, Small & Medium Enterprises (Udyam Registration).",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: ShieldCheck,
      title: "Verified Business Credibility",
      desc: "Our registration guarantees a transparent business framework, assuring our clients, partners, and farmers of our legal authenticity.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: CheckCircle,
      title: "Quality Service Assurance",
      desc: "Committed to delivering peerless, authentic, and high-performance sustainable solutions for agricultural and civic sectors with maximum integrity.",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <div className="bg-gray-905 text-white min-h-screen pt-28 pb-16">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Hero Section */}
        <AnimatedSection className="text-center mb-16">
          <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold inline-block mb-4">
            Official Credentials
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 tracking-tight mb-4">
            Our Certifications & Registrations
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Vishwa Aadhar Enterprises is built on the pillars of transparency, official compliance, and unwavering reliability. Browse our official certificate registration below.
          </p>
        </AnimatedSection>

        {/* Certificate Display & Key Info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left - Certificate Viewer */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={200}>
              <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl border border-gray-700/80 shadow-2xl relative group">
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="p-2 bg-gray-900/80 hover:bg-green-500 text-white hover:text-black rounded-lg transition-all duration-300 shadow-md flex items-center gap-1 text-xs"
                    title="Zoom Certificate"
                  >
                    <ZoomIn className="w-4 h-4" />
                    <span>Zoom</span>
                  </button>
                  <a
                    href={certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-900/80 hover:bg-green-500 text-white hover:text-black rounded-lg transition-all duration-300 shadow-md flex items-center gap-1 text-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>

                <div 
                  className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-900 aspect-[3/4] sm:aspect-auto sm:h-[650px] flex items-center justify-center cursor-zoom-in"
                  onClick={() => setIsFullscreen(true)}
                >
                  <img 
                    src={certificateUrl} 
                    alt="Vishwa Aadhar Enterprises Official Certificate" 
                    className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6 pb-8 pointer-events-none">
                    <span className="text-sm font-medium text-green-300 flex items-center gap-2 bg-gray-900/90 py-2 px-4 rounded-full border border-green-500/20 backdrop-blur-sm shadow-xl">
                      <ZoomIn className="w-4 h-4 text-green-400" /> Click to view full screen
                    </span>
                  </div>
                </div>

                <p className="text-center mt-4 text-xs sm:text-sm text-gray-400 font-mono">
                  Official Registration Copy • Vishwa Aadhar Enterprises
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right - Quality & Standards Details */}
          <div className="lg:col-span-5 space-y-8">
            <AnimatedSection delay={400}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="w-2 h-8 bg-green-500 rounded-full inline-block" />
                    A Foundation of Trust
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    Every operation and solution delivered by Vishwa Aadhar Enterprises strictly complies with official national records. Our certified legal profile guarantees transparent dealings, verified ownership pathways, and compliant commercial growth.
                  </p>
                </div>

                {/* Highlight Blocks */}
                <div className="space-y-4">
                  {certHighlights.map((hl, index) => {
                    const Icon = hl.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-gray-800/40 border border-gray-700/50 hover:border-green-500/30 p-5 rounded-xl transition-all duration-300 flex gap-4"
                      >
                        <div className={`p-3 h-fit rounded-lg bg-gradient-to-br ${hl.color} text-white flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1">{hl.title}</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">{hl.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Extra Stats Card */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />
                  <h4 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Corporate Assurance
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    By choosing Vishwa Aadhar Enterprises, you are working directly with a government-registered commercial enterprise dedicated to green innovation, local community empowerment, and transparent supply chains.
                  </p>
                  <p className="text-xs text-gray-400 mt-4 font-mono">
                    Udyam Central Registration Registry Compliant
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>

        {/* Corporate Trust Badges Section */}
        <div className="bg-gray-800/30 border border-gray-700/40 rounded-2xl p-8 mb-12">
          <AnimatedSection className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Our Framework of Integrity</h3>
            <p className="text-gray-400 text-sm mt-1">We maintain the highest bars of operations, corporate transparency, and standard registered compliances.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gray-900/40 rounded-xl border border-gray-800">
              <div className="text-3xl font-extrabold text-green-400 mb-1">MSME</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Registered Entity</div>
            </div>
            <div className="p-4 bg-gray-900/40 rounded-xl border border-gray-800">
              <div className="text-3xl font-extrabold text-green-400 mb-1">Government</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Approved Setup</div>
            </div>
            <div className="p-4 bg-gray-900/40 rounded-xl border border-gray-800">
              <div className="text-3xl font-extrabold text-green-400 mb-1">100%</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Legal & Verified</div>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox / Fullscreen Viewer */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-gray-800/80 hover:bg-red-500 rounded-full text-white hover:text-black transition-colors shadow-lg focus:outline-none"
              onClick={() => setIsFullscreen(false)}
              aria-label="Close Fullscreen View"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-4xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={certificateUrl} 
                alt="Certificate full screen view"
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl border border-gray-800 object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="text-center mt-4 text-sm text-gray-300 flex items-center justify-center gap-4">
                <span>Vishwa Aadhar Registration Certify Copy</span>
                <a 
                  href={certificateUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 underline flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Save High Res
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificationsPage;
