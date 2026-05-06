
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { InnovationIcon, CircularIcon, MonetizationIcon, QualityIcon } from '../constants';

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
                text: "At Vishwa Aadhar Enterprises™, we believe the future belongs to those who innovate with empathy, scale with purpose, and lead with integrity.",
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
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {team.map((member, index) => (
                            <AnimatedSection key={member.id} delay={300 + index * 100}>
                                <div className="group relative">
                                    <div className="bg-gray-900/50 rounded-[2rem] p-4 border border-gray-700 group-hover:border-green-500/50 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(34,197,94,0.1)]">
                                        <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 bg-gray-800 border border-gray-700/50">
                                            <img 
                                                src={member.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'} 
                                                alt={member.name} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            />
                                        </div>
                                        <div className="px-2 pb-2">
                                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-green-500 font-bold text-xs uppercase tracking-widest mb-4">
                                                {member.position}
                                            </p>
                                            <div className="w-10 h-0.5 bg-gray-700 mb-4 transition-all duration-500 group-hover:w-full group-hover:bg-green-500/30"></div>
                                            {member.description && (
                                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                                                    {member.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        )}

    </div>
  );
};

export default AboutPage;