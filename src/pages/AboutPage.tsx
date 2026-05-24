
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { InnovationIcon, CircularIcon, MonetizationIcon, QualityIcon } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const customerSegments = [
    { name: 'Small and Mid-Scale Farmers', benefit: 'Receive increased yields, lower fertilizer costs, improved soil fertility, and agronomic advisory support.' },
    { name: 'Rural Builders & Masons', benefit: 'Benefit from stronger, affordable construction materials with faster curing and enhanced durability.' },
    { name: 'NGOs & Govt Programs', benefit: 'Access scalable, compliant, and sustainable inputs for restoration and livelihood projects.' },
    { name: 'Corporate & Carbon Buyers', benefit: 'Gain access to verified soil and carbon credits, enabling sustainable procurement and ESG reporting.' },
];

import { db } from '../firebase';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const AboutPage: React.FC = () => {
  const [content, setContent] = React.useState<any>(null);
  const [team, setTeam] = React.useState<any[]>([]);
  const [isPaused, setIsPaused] = React.useState(false);
  const [activeMember, setActiveMember] = React.useState<any | null>(null);

  React.useEffect(() => {
    const pathContent = 'about_page/content';
    const unsubContent = onSnapshot(doc(db, 'about_page', 'content'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setContent(docSnapshot.data());
      } else {
        // Init with defaults if not exists
        setContent({
            mainDescription: "Born from a college lab project, Vishwa Aadhar Enterprises evolved into a pioneering startup focused on transforming waste into purpose.",
            aboutImage: "https://i.postimg.cc/nrF021Qb/Whats-App-Image-2025-11-07-at-8-31-01-PM.jpg",
            mission: "To lead the sustainable waste transformation.",
            vision: "A world with zero waste and maximum value.",
            ceoMessage: {
                heading: "A Future Built on Purpose, Partnership & Progress",
                text: "At Vishwa Aadhar Enterprises, we believe the future belongs to those who innovate with empathy, scale with purpose, and lead with integrity.",
                quote: "We’re not building a brand. We are building a category.",
                footer: "By Strength We Built, By Trust We Endure!",
                image: "https://i.postimg.cc/1RL7qDvG/unnamed-1.png"
            },
            achievements: [
                { image: "https://i.postimg.cc/Fz9RWYZc/Whats-App-Image-2025-11-07-at-8-30-54-PM.jpg", caption: "" },
                { image: "https://i.postimg.cc/50JNyXDZ/Whats-App-Image-2025-11-07-at-8-30-43-PM.jpg", caption: "" },
                { image: "https://i.postimg.cc/RVYSfsj2/Whats-App-Image-2025-11-07-at-8-30-45-PM.jpg", caption: "" }
            ],
            valueModel: [
                { title: "Inputs", desc: "Advanced R&D and locally sourced agricultural/mineral residues." },
                { title: "Processes", desc: "Scientific research transformed into scalable formulations." },
                { title: "Outputs & Outcomes", desc: "Higher crop yields, improved soil health, and lower carbon emissions." }
            ],
            pillars: [
                { title: "Science-Led Innovation" },
                { title: "Circular Sourcing" },
                { title: "Stakeholder Empowerment" },
                { title: "Sustainability Monetization" },
                { title: "Quality & Compliance" }
            ],
            segments: [
                { name: "Small and Mid-Scale Farmers", benefit: "Receive increased yields and lower costs." },
                { name: "Rural Builders & Masons", benefit: "Stronger, affordable construction materials." },
                { name: "NGOs & Govt Programs", benefit: "Scalable, compliant inputs for projects." },
                { name: "Corporate & Carbon Buyers", benefit: "Verified soil and carbon credits." }
            ],
            opportunities: {
                expansion: [
                    "BioCement supply to Smart City projects.",
                    "BioFertilizer production for organic farming.",
                    "Eco-Additives & Green Materials development."
                ],
                diversification: [
                    "Waste-to-BioCement PPP models.",
                    "Agro-Infra Solutions for rural construction.",
                    "Carbon Credit Trading & ESG Consultancy.",
                    "Technology Licensing."
                ],
                futureTech: [
                    "Microbial Nanotech R&D.",
                    "Smart Construction Materials with IoT.",
                    "AI-driven Production & QC."
                ]
            }
        });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, pathContent);
    });

    const pathTeam = 'team_members';
    const q = query(collection(db, 'team_members'), orderBy('order', 'asc'));
    const unsubTeam = onSnapshot(q, (snapshot) => {
      setTeam(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, pathTeam);
    });

    return () => {
        unsubContent();
        unsubTeam();
    };
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMember(null);
      }
    };
    if (activeMember) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMember]);

  return (
    <div className="pt-24 bg-gray-900 text-gray-300">
      {/* Corporate Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Corporate Overview</h1>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {content?.mainDescription}
                        </p>
                    </div>
                    <div>
                        <img 
                            src={content?.aboutImage} 
                            alt="Vishwa Aadhar Overview" 
                            className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" 
                        />
                    </div>
                </div>
            </AnimatedSection>
        </div>
      </section>

      {/* Mission / Vision from Firebase */}
      <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12">
                  <AnimatedSection>
                      <div className="p-8 bg-gray-900 rounded-2xl border border-green-500/20">
                          <h2 className="text-3xl font-bold text-green-400 mb-4">Our Mission</h2>
                          <p className="text-gray-300 leading-relaxed">{content?.mission}</p>
                      </div>
                  </AnimatedSection>
                  <AnimatedSection delay={700}>
                      <div className="p-8 bg-gray-900 rounded-2xl border border-green-500/20">
                          <h2 className="text-3xl font-bold text-green-400 mb-4">Our Vision</h2>
                          <p className="text-gray-300 leading-relaxed">{content?.vision}</p>
                      </div>
                  </AnimatedSection>
              </div>
          </div>
      </section>

      {/* CEO Message */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
            <AnimatedSection className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-4">
                        <img src={content?.ceoMessage?.image} alt="CEO Message" className="rounded-2xl shadow-lg w-full h-auto object-cover aspect-square" />
                    </div>
                    <div className="md:col-span-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content?.ceoMessage?.heading}</h2>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            {content?.ceoMessage?.text}
                        </p>
                        <p className="text-gray-300 font-semibold italic">"{content?.ceoMessage?.quote}"</p>
                         <p className="mt-2 text-gray-400 font-bold">{content?.ceoMessage?.footer}</p>
                    </div>
                </div>
            </AnimatedSection>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Our Achievements & Recognition</h2>
                <p className="text-gray-400 max-w-3xl mx-auto mt-4">We are proud to be recognized for our innovative contributions to sustainability and green technology.</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {content?.achievements?.map((ach: any, idx: number) => (
                    <AnimatedSection key={idx} delay={500 + idx*100}>
                        <div className="h-full overflow-hidden rounded-xl shadow-lg group">
                            <img src={ach.image} alt={ach.caption || "Achievement"} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"/>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    </section>

      {/* Value Creation Model */}
      <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Our Value-Creation Model</h2>
                  <p className="text-gray-400 max-w-3xl mx-auto mt-4">An integrated framework combining scientific innovation, local resource utilization, and sustainability-driven production.</p>
              </AnimatedSection>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                  {content?.valueModel?.map((val: any, idx: number) => (
                    <AnimatedSection key={idx} delay={500 + idx*100} className="p-6 bg-gray-700 rounded-xl">
                        <h3 className="text-2xl font-bold text-green-400 mb-3">{val.title}</h3>
                        <p className="text-gray-400">{val.desc}</p>
                    </AnimatedSection>
                  ))}
              </div>
          </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
            <AnimatedSection className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Our Strategic Pillars</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {content?.pillars?.map((pillar: any, index: number) => {
                    const icons: any = {
                        InnovationIcon: <InnovationIcon />,
                        CircularIcon: <CircularIcon />,
                        MonetizationIcon: <MonetizationIcon />,
                        QualityIcon: <QualityIcon />
                    };
                    return (
                        <AnimatedSection key={index} delay={500 + index * 100}>
                            <div className="p-6 bg-gray-800 rounded-xl shadow-md flex flex-col items-center h-full">
                                {icons[pillar.icon] || <InnovationIcon />}
                                <h3 className="text-xl font-bold text-white mt-4">{pillar.title}</h3>
                            </div>
                        </AnimatedSection>
                    );
                })}
            </div>
        </div>
      </section>

      {/* Customer Segments */}
        <section className="py-20 bg-gray-800">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Customer Segments</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">We serve a diverse range of clients, each benefiting from our unique solutions.</p>
                </AnimatedSection>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {content?.segments?.map((segment: any, index: number) => (
                        <AnimatedSection key={index} delay={500 + index * 100}>
                            <div className="bg-gray-700 p-6 rounded-xl text-center hover:bg-green-900/50 transition-colors border border-transparent hover:border-green-500/30 h-full">
                                <h3 className="text-xl font-bold text-green-400">{segment.name}</h3>
                                <p className="text-gray-400 mt-2">{segment.benefit}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>

        {/* Business Opportunities */}
        <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-6">
                 <AnimatedSection className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Business Opportunities</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">Our roadmap for sustainable growth and global leadership in green infrastructure.</p>
                </AnimatedSection>
                <div className="space-y-12">
                    {content?.opportunities?.expansion && (
                        <div>
                            <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">Core Business Expansion</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {content.opportunities.expansion.map((item: string, idx: number) => (
                                    <div key={idx} className="bg-gray-800 p-6 rounded-lg">{item}</div>
                                ))}
                            </div>
                        </div>
                    )}
                     {content?.opportunities?.diversification && (
                        <div>
                            <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">Vertical Diversification</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {content.opportunities.diversification.map((item: string, idx: number) => (
                                    <div key={idx} className="bg-gray-800 p-6 rounded-lg">{item}</div>
                                ))}
                            </div>
                        </div>
                     )}
                     {content?.opportunities?.futureTech && (
                        <div>
                            <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">Future-Tech Divisions</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {content.opportunities.futureTech.map((item: string, idx: number) => (
                                    <div key={idx} className="bg-gray-800 p-6 rounded-lg">{item}</div>
                                ))}
                            </div>
                        </div>
                     )}
                </div>
            </div>
        </section>

        {/* Team Members Section */}
        {team.length > 0 && (
            <section className="py-24 bg-gray-800 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
                <div className="container mx-auto px-6">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Leadership Team</h2>
                        <div className="w-24 h-1 bg-green-500 mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            The visionaries and experts driving the sustainable biotech revolution at Vishwa Aadhar.
                        </p>
                    </AnimatedSection>
                    
                    {/* Desktop View (Centered Flex Layout) */}
                    <div className="hidden md:flex flex-wrap justify-center gap-6 items-stretch">
                        {team.map((member, index) => {
                            const isCeoOrFounder = member.position && (
                                member.position.toLowerCase().includes('ceo') || 
                                member.position.toLowerCase().includes('founder')
                            );
                            const badgeText = isCeoOrFounder ? (
                                member.position.toLowerCase().includes('ceo') && member.position.toLowerCase().includes('founder') ? 'Founder & CEO' :
                                member.position.toLowerCase().includes('ceo') ? 'CEO' : 'Founder'
                            ) : '';

                            return (
                                <AnimatedSection key={member.id} delay={300 + index * 100} className="w-[190px] lg:w-[210px] xl:w-[230px] flex-shrink-0 flex flex-col">
                                    <div 
                                        className="group relative flex-grow flex flex-col h-full cursor-pointer hover:shadow-[0_10px_30px_rgba(34,197,94,0.15)] active:scale-95 transition-all duration-300"
                                        onClick={() => setActiveMember(member)}
                                    >
                                        <div className="bg-gray-900/50 rounded-xl p-2.5 border border-gray-700 group-hover:border-green-500/50 transition-all duration-500 flex-grow flex flex-col h-[340px] justify-between">
                                            <div className="aspect-[4/5] rounded-lg overflow-hidden mb-2 bg-gray-800 border border-gray-700/50 flex-shrink-0 relative">
                                                <img 
                                                    src={member.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'} 
                                                    alt={member.name} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                />
                                                {isCeoOrFounder && (
                                                    <div className="absolute top-2 right-2 z-10 bg-gray-950/90 text-green-400 font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-[0_4px_10px_rgba(0,0,0,0.6)] border border-green-500/40 flex items-center gap-1 select-none backdrop-blur-sm">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                                        {badgeText}
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="text-[10px] font-bold text-green-400 bg-gray-950/80 px-2.5 py-1 rounded-full uppercase tracking-wider border border-green-500/30">View Bio</span>
                                                </div>
                                            </div>
                                            <div className="px-0.5 pb-0.5 flex-grow flex flex-col justify-between gap-1 overflow-hidden">
                                                <div>
                                                    <h3 className="text-sm font-bold text-white mb-0.5 leading-snug group-hover:text-green-400 transition-colors line-clamp-1">
                                                        {member.name}
                                                    </h3>
                                                    <p className="text-green-500 font-bold text-[10px] uppercase tracking-wider mb-1 leading-none line-clamp-1">
                                                        {member.position}
                                                    </p>
                                                    <div className="w-6 h-0.5 bg-gray-700 mb-1 transition-all duration-500 group-hover:w-full group-hover:bg-green-500/30 flex-shrink-0"></div>
                                                </div>
                                                {member.description ? (
                                                    <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-3 h-[50px] overflow-hidden">
                                                        {member.description}
                                                    </p>
                                                ) : (
                                                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 italic h-[50px]">
                                                        Vishwa Aadhar core leadership member.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            );
                        })}
                    </div>
 
                    {/* Mobile View (Endless Auto-scrolling Row) */}
                    <div 
                        className="md:hidden w-full relative overflow-hidden py-2 select-none flex cursor-pointer"
                        onClick={() => setIsPaused(prev => !prev)}
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-800 via-gray-800/20 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-800 via-gray-800/20 to-transparent z-10 pointer-events-none"></div>
 
                        {/* First marquee track */}
                        <div 
                            className="flex gap-4 shrink-0 animate-marquee pr-4"
                            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                        >
                            {team.map((member, index) => {
                                const isCeoOrFounder = member.position && (
                                    member.position.toLowerCase().includes('ceo') || 
                                    member.position.toLowerCase().includes('founder')
                                );
                                const badgeText = isCeoOrFounder ? (
                                    member.position.toLowerCase().includes('ceo') && member.position.toLowerCase().includes('founder') ? 'Founder & CEO' :
                                    member.position.toLowerCase().includes('ceo') ? 'CEO' : 'Founder'
                                ) : '';

                                return (
                                    <div 
                                        key={`${member.id}-mob-t1-${index}`} 
                                        className="flex-shrink-0 w-[130px] flex flex-col cursor-pointer active:scale-95 transition-transform"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMember(member);
                                        }}
                                    >
                                        <div className="group relative flex-grow flex flex-col h-full">
                                            <div className="bg-gray-900/50 rounded-xl p-2.5 border border-gray-700 group-hover:border-green-500/50 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] flex-grow flex flex-col h-[230px] justify-between">
                                                <div className="aspect-[4/5] rounded-lg overflow-hidden mb-1.5 bg-gray-800 border border-gray-700/50 flex-shrink-0 relative">
                                                    <img 
                                                        src={member.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'} 
                                                        alt={member.name} 
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                    />
                                                    {isCeoOrFounder && (
                                                        <div className="absolute top-1 right-1 z-10 bg-gray-950/90 text-green-400 font-extrabold text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow-[0_2px_6px_rgba(0,0,0,0.6)] border border-green-500/40 flex items-center gap-1 select-none backdrop-blur-sm">
                                                            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></span>
                                                            {badgeText}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="px-0.5 pb-0.5 flex-grow flex flex-col justify-between gap-1 overflow-hidden">
                                                    <div>
                                                        <h3 className="text-[10px] font-bold text-white mb-0.5 leading-snug group-hover:text-green-400 transition-colors line-clamp-1">
                                                            {member.name}
                                                        </h3>
                                                        <p className="text-green-500 font-bold text-[7px] uppercase tracking-wider mb-1 leading-none line-clamp-1">
                                                            {member.position}
                                                        </p>
                                                        <div className="w-5 h-px bg-gray-700 mb-1 transition-all duration-500 group-hover:w-full group-hover:bg-green-500/30 flex-shrink-0"></div>
                                                    </div>
                                                    <p className="text-gray-400 text-[8px] leading-relaxed line-clamp-3 h-[30px] overflow-hidden">
                                                        {member.description || "Leadership member."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
 
                        {/* Second marquee track (seamless clone) */}
                        <div 
                            className="flex gap-4 shrink-0 animate-marquee pr-4" 
                            aria-hidden="true"
                            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                        >
                            {team.map((member, index) => {
                                const isCeoOrFounder = member.position && (
                                    member.position.toLowerCase().includes('ceo') || 
                                    member.position.toLowerCase().includes('founder')
                                );
                                const badgeText = isCeoOrFounder ? (
                                    member.position.toLowerCase().includes('ceo') && member.position.toLowerCase().includes('founder') ? 'Founder & CEO' :
                                    member.position.toLowerCase().includes('ceo') ? 'CEO' : 'Founder'
                                ) : '';

                                return (
                                    <div 
                                        key={`${member.id}-mob-t2-${index}`} 
                                        className="flex-shrink-0 w-[130px] flex flex-col cursor-pointer active:scale-95 transition-transform"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMember(member);
                                        }}
                                    >
                                        <div className="group relative flex-grow flex flex-col h-full">
                                            <div className="bg-gray-900/50 rounded-xl p-2.5 border border-gray-700 group-hover:border-green-500/50 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] flex-grow flex flex-col h-[230px] justify-between">
                                                <div className="aspect-[4/5] rounded-lg overflow-hidden mb-1.5 bg-gray-800 border border-gray-700/50 flex-shrink-0 relative">
                                                    <img 
                                                        src={member.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'} 
                                                        alt={member.name} 
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                    />
                                                    {isCeoOrFounder && (
                                                        <div className="absolute top-1 right-1 z-10 bg-gray-950/90 text-green-400 font-extrabold text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow-[0_2px_6px_rgba(0,0,0,0.6)] border border-green-500/40 flex items-center gap-1 select-none backdrop-blur-sm">
                                                            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></span>
                                                            {badgeText}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="px-0.5 pb-0.5 flex-grow flex flex-col justify-between gap-1 overflow-hidden">
                                                    <div>
                                                        <h3 className="text-[10px] font-bold text-white mb-0.5 leading-snug group-hover:text-green-400 transition-colors line-clamp-1">
                                                            {member.name}
                                                        </h3>
                                                        <p className="text-green-500 font-bold text-[7px] uppercase tracking-wider mb-1 leading-none line-clamp-1">
                                                            {member.position}
                                                        </p>
                                                        <div className="w-5 h-px bg-gray-700 mb-1 transition-all duration-500 group-hover:w-full group-hover:bg-green-500/30 flex-shrink-0"></div>
                                                    </div>
                                                    <p className="text-gray-400 text-[8px] leading-relaxed line-clamp-3 h-[30px] overflow-hidden">
                                                        {member.description || "Leadership member."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        )}
 
        {/* Animated Leadership Bio Lightbox Modal */}
        <AnimatePresence>
            {activeMember && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md"
                    onClick={() => setActiveMember(null)}
                >
                    <motion.div
                        initial={{ scale: 0.94, y: 30, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.94, y: 30, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        className="relative w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button with circular layout */}
                        <button
                            onClick={() => setActiveMember(null)}
                            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-gray-950/80 border border-gray-800 text-gray-400 hover:text-white hover:border-red-500/30 transition-all duration-300 active:scale-90 cursor-pointer shadow-xl focus:outline-none"
                            aria-label="Close details"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left/Top image banner */}
                        <div className="w-full md:w-5/12 h-64 md:h-auto bg-gray-950 flex-shrink-0 relative overflow-hidden">
                            <img
                                src={activeMember.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'}
                                alt={activeMember.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:hidden"></div>
                        </div>

                        {/* Right/Bottom info sheet */}
                        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                            <div>
                                <div className="inline-block bg-green-500/15 text-green-400 text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 border border-green-500/20">
                                    Leadership Profile
                                </div>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
                                    {activeMember.name}
                                </h3>
                                <p className="text-green-500 font-bold text-xs md:text-sm uppercase tracking-wider mb-5">
                                    {activeMember.position}
                                </p>
                                <div className="w-16 h-1 bg-green-500 rounded-full mb-6"></div>
                                
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                    {activeMember.description || "Driving sustainable biotechnological resource transformation at Vishwa Aadhar Enterprises."}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-800/80 flex justify-between items-center text-[11px] text-gray-500 font-medium">
                                <span>Vishwa Aadhar Enterprises</span>
                                <button 
                                    onClick={() => setActiveMember(null)}
                                    className="text-green-400 font-bold hover:text-green-300 hover:underline transition-colors focus:outline-none"
                                >
                                    Close Bio
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

    </div>
  );
};

export default AboutPage;