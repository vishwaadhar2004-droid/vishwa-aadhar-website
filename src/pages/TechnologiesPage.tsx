import React from 'react';
import { ShieldCheck, Cpu, Recycle, HelpCircle, ArrowRight, CheckCircle2, FlaskConical } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const TechnologiesPage: React.FC = () => {
  const techDetails = [
    {
      title: "Microbial Bio-Cement Technology",
      subtitle: "Low-Carbon Biological Bonding",
      desc: "An ambient-temperature alternative to Ordinary Portland Cement (OPC). Using beneficial, non-pathogenic bacteria, we induce calcite precipitation within recycled aggregates, bonding them into load-bearing masonry units without kiln firing.",
      icon: Cpu,
      color: "from-green-500 to-emerald-500",
      features: [
        "Cures entirely at room temperature",
        "Over 80% carbon footprint reduction",
        "Consumes up to 90% less thermal energy",
        "Employs natural biological bonding"
      ]
    },
    {
      title: "Biomineralization Science (MICP)",
      subtitle: "Nature's Mineral Binder",
      desc: "Microbially Induced Calcite Precipitation (MICP) replicates the natural geological processes that build coral reefs. Bacteria catalyze urea hydrolysis to produce calcium carbonate (CaCO₃) crystals, which weld micro-aggregates together.",
      icon: FlaskConical,
      color: "from-teal-500 to-cyan-500",
      features: [
        "In-situ crystal growth on aggregate grains",
        "Self-healing behavior triggered by humidity",
        "High durability against environmental weathering",
        "Non-toxic, bio-safe crystalline matrices"
      ]
    },
    {
      title: "Industrial Waste Conversion System",
      subtitle: "Circular Sourcing Engine",
      desc: "We treat and formulation-match demolition debris, industrial byproducts, and liquid waste nutrients. This proprietary material refining process prepares waste residues for bio-engineered mineralization.",
      icon: Recycle,
      color: "from-emerald-500 to-lime-500",
      features: [
        "Upcycles demolition aggregates and powder wastes",
        "Diverts tons of solid waste from city landfills",
        "Converts organic liquid residues into cell nutrients",
        "Supports 100% asset-light localized production"
      ]
    }
  ];

  const faqs = [
    {
      q: "What makes this technology unique?",
      a: "Unlike traditional binding agents, VishwaAadhar's technology uses a living, bio-induced mineralizing process. We utilize harmless bacteria to precipitate durable calcite crystals that actively bond industrial and construction wastes into durable, structural-grade blocks."
    },
    {
      q: "Why is it different from traditional cement?",
      a: "Traditional cement requires heating limestone to 1,450°C in massive kilns, releasing massive amounts of fossil-fuel and chemical CO₂. Our bio-cement grows crystals and builds strength completely at ambient temperature (20-35°C), utilizing eco-friendly microbial metabolism."
    },
    {
      q: "Why is it better than conventional cement?",
      a: "It produces up to 80% fewer carbon emissions, uses recycled and industrial aggregates as over 70% of its core matrix, and has an active micro-cracking self-healing potential (microbes crystallize more calcite when moisture penetrates, sealing voids)."
    },
    {
      q: "Is this technology real?",
      a: "Yes! Biomineralization through MICP is a highly established scientific category validated by global academic research. VishwaAadhar has successfully bridged the lab-to-market gap, optimizing proprietary microbial formulations and using them to create actual, certified load-bearing block prototypes."
    },
    {
      q: "Why should customers adopt it?",
      a: "Adopting VishwaAadhar products enables construction firms and developers to meet stringent ESG targets, secure green building certifications (like LEED/GRIHA), and gain a significant brand advantage in the rapidly growing green building market."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Waste Sourcing & Prep",
      desc: "Sourcing demolition aggregates, mineral byproducts, and agricultural/liquid wastes to build our core matrix.",
      color: "border-emerald-500/30 text-emerald-400"
    },
    {
      num: "02",
      title: "Microbial Processing",
      desc: "Culturing and inoculating proprietary non-pathogenic bacteria into the waste matrix alongside natural nutrient solutions.",
      color: "border-teal-500/30 text-teal-400"
    },
    {
      num: "03",
      title: "Biomineralization",
      desc: "Bacteria catalyze urea hydrolysis, precipitating calcium carbonate crystals that lock the grains together at ambient temperature.",
      color: "border-cyan-500/30 text-cyan-400"
    },
    {
      num: "04",
      title: "Construction Products",
      desc: "The final, hardened eco-material is cured, tested, and shipped as carbon-negative blocks, ready for use.",
      color: "border-green-500/30 text-green-400"
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Hero Section */}
        <AnimatedSection className="text-center mb-16">
          <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold inline-block mb-4">
            Deep-Tech Innovation
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 tracking-tight mb-4">
            Our Core Technologies
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Reimagining material binding through the lens of biology. Our proprietary deep-tech platform translates micro-scale biochemical processes into heavy-duty sustainable assets.
          </p>
        </AnimatedSection>

        {/* Core Technologies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {techDetails.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <AnimatedSection key={index} delay={200 + index * 100}>
                <div className="bg-gray-800/50 border border-gray-750 p-8 rounded-2xl h-full flex flex-col justify-between hover:border-green-500/30 hover:shadow-green-500/5 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/5 to-transparent rounded-full blur-xl group-hover:bg-green-500/10 transition-colors" />
                  
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{tech.title}</h3>
                    <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-4">{tech.subtitle}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{tech.desc}</p>
                  </div>

                  <div className="space-y-2 border-t border-gray-750 pt-4 mt-6">
                    {tech.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Process Flow section (Technology Flow Diagram) */}
        <AnimatedSection className="mb-24">
          <div className="bg-gray-850 border border-gray-750 p-8 sm:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Technology Flow Diagram</h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
                How we upcycle mineral resources and carbon-negative binding matrices from source to building solutions.
              </p>
            </div>

            {/* Stepper Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="relative h-full">
                  <div className={`bg-gray-900/60 border ${step.color} p-6 rounded-2xl h-full flex flex-col relative z-10 hover:-translate-y-1 transition-all duration-300`}>
                    <div className="text-3xl font-extrabold opacity-45 mb-4">{step.num}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                  
                  {/* Visual Connector Arrow (Desktop Only) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-green-400/30">
                      <ArrowRight className="w-6 h-6 animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Core Scientific Questions Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">Understanding Our Innovation</h2>
            <p className="text-gray-400 text-sm mt-2">Answering key technical and commercial adoption questions about biomineralization.</p>
          </AnimatedSection>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <AnimatedSection key={idx} delay={100 * idx}>
                <div className="bg-gray-800/40 border border-gray-750 rounded-2xl p-6 sm:p-8 hover:border-green-500/20 transition-all duration-300">
                  <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-3 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed pl-8">
                    {faq.a}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechnologiesPage;
