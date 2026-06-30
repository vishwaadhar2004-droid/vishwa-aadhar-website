import React from 'react';
import { 
  FileText, 
  Award, 
  Eye, 
  Download, 
  ShieldCheck, 
  Calendar, 
  Lock,
  ExternalLink
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface DocItem {
  id: string;
  title: string;
  category: string;
  url: string;
  fileName: string;
  fileSize?: string;
  lastUpdated?: string;
}

const ValidationCenterPage: React.FC = () => {
  const documents: DocItem[] = [
    {
      id: 'xrd-testing-results',
      title: 'XRD TESTING RESULTS AND INTERPRETATION',
      category: 'Research Report',
      url: 'https://hdsaozsnvwyjcscjupcu.supabase.co/storage/v1/object/public/vishwaaadhar%20report/XRD%20TESTING%20RESULTS%20AND%20INTERPRETATION.pdf',
      fileName: 'XRD TESTING RESULTS AND INTERPRETATION.pdf',
      fileSize: '1.4 MB',
      lastUpdated: '2024-25'
    },
    {
      id: 'ethical-certificate',
      title: 'VA- RESEARCH ETHICAL CERTIFICATE',
      category: 'Research Ethical Certificate',
      url: 'https://hdsaozsnvwyjcscjupcu.supabase.co/storage/v1/object/public/vishwaaadhar%20report/VA-%20RESEARCH%20ETHICAL%20CERTIFICATE%20.pdf',
      fileName: 'VA- RESEARCH ETHICAL CERTIFICATE .pdf',
      fileSize: '420 KB',
      lastUpdated: '2024-25'
    }
  ];

  return (
    <div id="validation-center-page" className="bg-gray-900 text-white min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-16 relative overflow-hidden font-sans">
      {/* Background Soft Lighting - Premium Slate Atmosphere */}
      <div className="absolute top-1/4 right-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-green-500/5 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-teal-500/5 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
        
        {/* Title Block with Badges & Enterprise Styling */}
        <AnimatedSection className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
            <span>Verified Repository</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Research & Validation
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Verified Research Documents & Certifications
          </p>
        </AnimatedSection>

        {/* Premium Enterprise Document Rows Grid */}
        <div className="space-y-4 sm:space-y-6">
          {documents.map((doc, index) => (
            <AnimatedSection key={doc.id} delay={150 * (index + 1)}>
              <div 
                id={`doc-card-${doc.id}`}
                className="bg-gray-850/80 border border-gray-750 p-5 sm:p-8 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 hover:border-green-500/30 hover:bg-gray-850 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Background ambient lighting on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Left Side: Document Icon & Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 flex-1 w-full">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-gray-900 border border-gray-700 flex-shrink-0 group-hover:border-green-500/30 transition-colors duration-300 relative">
                    {doc.category === 'Research Report' ? (
                      <FileText className="w-6.5 h-6.5 sm:w-7 sm:h-7 text-green-400" />
                    ) : (
                      <Award className="w-6.5 h-6.5 sm:w-7 sm:h-7 text-teal-400" />
                    )}
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-gray-900 animate-pulse" />
                  </div>
                  
                  <div className="space-y-2.5 w-full">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className={`text-[10px] font-mono tracking-widest uppercase border px-2.5 py-0.5 rounded-full font-bold ${
                        doc.category === 'Research Report' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                      }`}>
                        {doc.category}
                      </span>
                      {doc.lastUpdated && (
                        <span className="text-gray-400 text-xs font-mono flex items-center gap-1 bg-gray-900/50 px-2.5 py-0.5 rounded-md border border-gray-850">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          <span>Last Updated: {doc.lastUpdated}</span>
                        </span>
                      )}
                      {doc.fileSize && (
                        <span className="text-gray-400 text-xs font-mono bg-gray-900/50 px-2.5 py-0.5 rounded-md border border-gray-850">
                          Size: {doc.fileSize}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-green-400 transition-colors duration-200 text-balance leading-snug">
                      {doc.title}
                    </h2>
                  </div>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-3 w-full md:w-auto border-t border-gray-800 md:border-t-0 pt-4 md:pt-0">
                  <a
                    id={`btn-view-${doc.id}`}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-initial h-11 min-h-[44px] flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-750 text-white border border-gray-700 hover:border-gray-600 px-5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] text-center cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-green-400" />
                    <span>View PDF</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                  </a>

                  <a
                    id={`btn-download-${doc.id}`}
                    href={`${doc.url}?download=`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-initial h-11 min-h-[44px] flex items-center justify-center gap-2 bg-[#0b1224] hover:bg-gray-800 text-white border border-gray-700 px-5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] text-center cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-green-400" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Dynamic Verification Seal at Page End */}
        <AnimatedSection className="mt-16 text-center text-xs text-gray-500 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-500" />
            <span>Official Research Repository • VishwaAadhar Enterprises</span>
          </div>
          <div className="flex items-center gap-2 bg-green-500/5 border border-green-500/10 px-3.5 py-1.5 rounded-full text-green-400/80 font-mono">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>Direct Integrity Synced</span>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ValidationCenterPage;
