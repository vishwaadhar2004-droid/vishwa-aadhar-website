import React, { useState } from 'react';
import { ArrowRight, Download, Mail, Leaf, BarChart3, TrendingUp, Cpu, Globe, Milestone } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const InvestorsPage: React.FC = () => {
  const [showPitchDeckAlert, setShowPitchDeckAlert] = useState(false);

  const investmentPillars = [
    {
      title: "Strong ESG Advantage",
      desc: "Our zero-kiln biocement eliminates thermal limestone firing, producing over 80% lower CO₂ emissions than traditional Portland cement. Highly aligned with global decarbonization credits and green building taxonomies.",
      icon: Leaf,
      color: "from-green-500/10 to-emerald-500/5 border-green-500/20"
    },
    {
      title: "Scalable Asset-Light Model",
      desc: "By utilizing regionally sourced demolition aggregates, local mineral residues, and organic nutrients, we bypass centralized manufacturing bottlenecks. Setup micro-bioreactors near demand nodes for maximum margins.",
      icon: Globe,
      color: "from-blue-500/10 to-cyan-500/5 border-blue-500/20"
    },
    {
      title: "Circular Economy Integration",
      desc: "VishwaAadhar bridges two massive industries—construction materials and agriculture. We process mineral aggregate wastes and liquid nutrients into active green building components and rich organic biofertilizers.",
      icon: BarChart3,
      color: "from-amber-500/10 to-orange-500/5 border-amber-500/20"
    },
    {
      title: "Proprietary Deep-Tech Intellectual Property",
      desc: "Backed by rigorous biomineralization research, our core assets include specialized non-pathogenic bacterial strains, proprietary bioreactor accelerator formulas, and optimized low-carbon block compositions.",
      icon: Cpu,
      color: "from-teal-500/10 to-cyan-500/5 border-teal-500/20"
    }
  ];

  const marketOpportunities = [
    {
      level: "TAM (Total Addressable Market)",
      market: "Global Green Construction Materials & Sustainable Agri inputs",
      value: "Coming Soon",
      desc: "Driven by worldwide regulations mandating carbon neutrality and chemical fertilizer reductions."
    },
    {
      level: "SAM (Serviceable Addressable Market)",
      market: "Indian Green Masonry Blocks, Plasters & Organic Farming Markets",
      value: "Coming Soon",
      desc: "Accelerated by government initiatives for smart cities, MSME incentives, and green infrastructure."
    },
    {
      level: "SOM (Serviceable Obtainable Market)",
      market: "Maharashtra & Western India Eco-block and Biofertilizer Demand Nodes",
      value: "Coming Soon",
      desc: "Capitalizing on localized sourcing loops, rural farming connections, and close logistics corridors."
    }
  ];

  const roadmapPhases = [
    {
      phase: "Phase 1: Lab-to-Pilot Validation",
      status: "COMPLETED",
      details: [
        "Optimized proprietary bacterial strain formulations in lab environments.",
        "Fabricated initial bio-cement structural block prototypes.",
        "Secured central Government of India MSME registration."
      ]
    },
    {
      phase: "Phase 2: Localized Rural Pilot",
      status: "ACTIVE",
      details: [
        "Deploying micro-pilot setups in Badlapur, Maharashtra.",
        "Testing biocement plasters and bricks on local agricultural storage sheds.",
        "Seeding initial biofertilizer batches with smallholder sugar and cotton farmers."
      ]
    },
    {
      phase: "Phase 3: B2B Commercial Launch",
      status: "UPCOMING",
      details: [
        "Establishing localized supply-chain agreements with municipal recycling centers.",
        "Obtaining IS-standard certifications for load-bearing building blocks.",
        "Licensing biofertilizer blends to major agricultural cooperatives."
      ]
    },
    {
      phase: "Phase 4: Global Sublicensing & Scaling",
      status: "HORIZON",
      details: [
        "Sublicensing deep-tech MICP formulas and bioreactor schematics globally.",
        "Integrating with carbon credits networks for supplemental monetization.",
        "Scaling asset-light waste-to-product R&D hubs across emerging economies."
      ]
    }
  ];

  const handlePitchDeckDownload = () => {
    setShowPitchDeckAlert(true);
    setTimeout(() => {
      setShowPitchDeckAlert(false);
    }, 5000);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Hero Section */}
        <AnimatedSection className="text-center mb-16">
          <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold inline-block mb-4">
            Financial & Partnerships Portal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 tracking-tight mb-4">
            Invest in VishwaAadhar
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Capitalizing on deep-tech microbial science to lead the global transition towards net-zero construction and fertile, circular agriculture.
          </p>

          {/* Prompt action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handlePitchDeckDownload}
              className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
            >
              <Download className="w-5 h-5" />
              <span>Download Pitch Deck</span>
            </button>
            <Link
              to="/contact"
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-750 px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Founder</span>
            </Link>
          </div>

          {/* Dynamic Popup Notice */}
          {showPitchDeckAlert && (
            <div className="mt-4 max-w-md mx-auto bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl text-sm font-semibold transition-all duration-500 animate-fadeIn">
              The official pitch deck is currently being updated for HER GRANT 3.0. Documents will be uploaded soon. Please contact our founder directly!
            </div>
          )}
        </AnimatedSection>

        {/* Investment Thesis - Why Invest in VishwaAadhar */}
        <div className="mb-24">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">Investment Thesis</h2>
            <p className="text-gray-400 text-sm mt-1">Why VishwaAadhar is positioned to deliver massive financial and environmental value.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investmentPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <AnimatedSection key={index} delay={100 * index}>
                  <div className={`bg-gray-850/50 border ${pillar.color} p-8 rounded-2xl h-full hover:-translate-y-1 transition-all duration-300 flex gap-5 items-start`}>
                    <div className="p-3 bg-gray-900 rounded-xl text-green-400 flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="mb-24">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">Market Opportunity</h2>
            <p className="text-gray-400 text-sm mt-1">Targeting high-growth circular economies across infrastructure and sustainable agriculture.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {marketOpportunities.map((opportunity, idx) => (
              <AnimatedSection key={idx} delay={200 + idx * 100}>
                <div className="bg-gray-850 border border-gray-750 p-8 rounded-2xl h-full flex flex-col justify-between hover:border-green-500/20 transition-all duration-300">
                  <div>
                    <span className="text-[10px] bg-green-500/10 text-green-400 font-extrabold uppercase px-2.5 py-1 rounded-full border border-green-500/20 inline-block mb-4">
                      {opportunity.level}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">{opportunity.market}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-6">{opportunity.desc}</p>
                  </div>
                  
                  <div className="border-t border-gray-850 pt-4 flex justify-between items-center text-xs mt-auto">
                    <span className="text-gray-500 font-semibold font-mono">Projected Sizing</span>
                    <span className="text-green-400 font-extrabold font-mono uppercase bg-gray-900/60 py-1 px-3 rounded-lg border border-gray-800">
                      {opportunity.value}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Projected Revenue Timeline (Traction) */}
        <div className="mb-24">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">Projected Traction</h2>
            <p className="text-gray-400 text-sm mt-1">Forward-looking business milestone and financial scaling timeline.</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-gray-850 border border-gray-750 p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Revenue Growth Projections</h3>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
                Our dynamic business model scales via local block sales, biofertilizer supply channels, and upcoming intellectual property sublicensing.
              </p>
              
              <div className="inline-block bg-amber-500/10 text-amber-400 border border-amber-500/20 px-6 py-2.5 rounded-full text-xs font-semibold">
                Coming Soon
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Growth Roadmap */}
        <div className="mb-16">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">Scaling Roadmap</h2>
            <p className="text-gray-400 text-sm mt-1">Four strategic horizons driving VishwaAadhar from a regional pilot to global biotechnology licensing.</p>
          </AnimatedSection>

          <div className="space-y-6">
            {roadmapPhases.map((phase, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-gray-850 border border-gray-750 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-green-500/20 transition-all duration-300">
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded shadow ${
                        phase.status === 'COMPLETED' ? 'bg-green-500 text-black' :
                        phase.status === 'ACTIVE' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                      }`}>
                        {phase.status}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{phase.phase}</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-400 pl-4 list-disc">
                      {phase.details.map((detail, idx2) => (
                        <li key={idx2}>{detail}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-shrink-0 text-right md:border-l md:border-gray-800 md:pl-8 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                    <Milestone className="w-8 h-8 text-green-400/30" />
                    <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-widest">Horizon {idx + 1}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvestorsPage;
