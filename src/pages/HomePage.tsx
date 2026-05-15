import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import LiquidButton from '../components/LiquidButton';
import { PRODUCTS_DATA } from '../constants';

import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const DEFAULT_SLIDES = [
  {
    bgImage: "url('https://i.postimg.cc/nrF021Qb/Whats-App-Image-2025-11-07-at-8-31-01-PM.jpg')",
    content: (
       <>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Innovating for a Greener Planet
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Our flagship Bio-Cement & Fertilizer, engineered for sustainability and performance.
        </p>
        <Link to="/products">
            <LiquidButton>Explore Our Products</LiquidButton>
        </Link>
      </>
    ),
  },
  {
    bgImage: "url('https://i.postimg.cc/cLCVRRkY/Whats-App-Image-2025-09-14-at-11.png')",
    bgColor: 'bg-gray-800', // A fallback color
    content: (
      <>
        <img src="https://i.postimg.cc/cLCVRRkY/Whats-App-Image-2025-09-14-at-11.png" alt="Vishwa Aadhar Logo" className="w-40 h-40 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Vishwa Aadhar Enterprises
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          By Strength We Built, By Trust We Endure!
        </p>
      </>
    ),
  },
  {
    bgImage: "url('https://i.postimg.cc/xTj439Km/Whats-App-Image-2025-11-07-at-8-30-54-PM.jpg')",
    content: (
       <>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Award-Winning Innovation
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Recognized for our commitment to pioneering sustainable solutions that build a greener future.
        </p>
        <Link to="/about">
            <LiquidButton>Our Journey</LiquidButton>
        </Link>
      </>
    ),
  },
  {
    bgImage: "url('https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1887&auto=format&fit=crop')",
    content: (
       <>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          From Waste to Wonder.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Our organic biofertilizers breathe new life into soil, increasing yields and promoting sustainable farming.
        </p>
        <Link to="/products/organic-biofertilizers">
            <LiquidButton>Learn About Biofertilizers</LiquidButton>
        </Link>
      </>
    ),
  },
  {
    bgImage: "url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop')",
    content: (
       <>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Your Partner in Sustainability.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Collaborate with us to transform your industrial waste into valuable assets and achieve your green-tech goals.
        </p>
        <Link to="/products/waste-to-product-rd">
            <LiquidButton>Our R&D Services</LiquidButton>
        </Link>
      </>
    ),
  }
];

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<any[]>(DEFAULT_SLIDES);
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    // Priority 1: New homeSlider doc
    const unsubSlider = onSnapshot(doc(db, 'homeSlider', 'main'), (sDoc) => {
      if (sDoc.exists()) {
        const data = sDoc.data();
        if (data.slides && data.slides.length > 0) {
          const formattedSlides = data.slides.map((s: any) => ({
            bgImage: s.bgImage.startsWith('url(') ? s.bgImage : `url('${s.bgImage}')`,
            content: (
              <>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                  {s.heading}
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  {s.paragraph}
                </p>
                { (s.buttonText || s.buttonLink) && (
                  <Link to={s.buttonLink || "/products"}>
                    <LiquidButton>{s.buttonText || "Explore Details"}</LiquidButton>
                  </Link>
                )}
              </>
            )
          }));
          setSlides(formattedSlides);
        }
      } else {
        // Fallback to legacy home_content if homeSlider doesn't exist yet
        const unsubLegacy = onSnapshot(doc(db, 'home_content', 'main'), (lDoc) => {
          if (lDoc.exists()) {
            const data = lDoc.data();
            setHomeData(data);
            
            if (data.slides && data.slides.length > 0) {
                const formattedSlides = data.slides.map((s: any) => ({
                    bgImage: s.bgImage.startsWith('url(') ? s.bgImage : `url('${s.bgImage}')`,
                    content: (
                        <>
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                                {s.heading}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                {s.paragraph}
                            </p>
                            <Link to={s.link || "/products"}>
                                <LiquidButton>{s.buttonText || "Explore Details"}</LiquidButton>
                            </Link>
                        </>
                    )
                }));
                setSlides(formattedSlides);
            } else if (data.bannerImage) {
                const firebaseSlide = {
                    bgImage: `url('${data.bannerImage}')`,
                    content: (
                        <>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                            {data.heading}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            {data.paragraph}
                        </p>
                        <Link to="/products">
                            <LiquidButton>Explore Our Products</LiquidButton>
                        </Link>
                        </>
                    )
                };
                setSlides([firebaseSlide, ...DEFAULT_SLIDES]);
            }
          }
        });
        return () => unsubLegacy();
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'homeSlider/main');
    });

    // Also fetch static home data (sections) from home_content/main
    const unsubHome = onSnapshot(doc(db, 'home_content', 'main'), (doc) => {
        if (doc.exists()) {
            setHomeData(doc.data());
        }
    });

    return () => {
        unsubSlider();
        unsubHome();
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        {slides.map((slide, index) => (
            <div 
                key={index}
                className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${slide.bgColor ?? ''} ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: slide.bgImage }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
            </div>
        ))}

        <div className="relative z-10 max-w-4xl mx-auto">
             {slides[currentSlide].content}
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3">
            {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-green-500 scale-125 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-gray-500/50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                ></button>
            ))}
        </div>
      </section>
      
      {/* What We Do Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">{homeData?.whatWeDo?.title || 'What We Do'}</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">{homeData?.whatWeDo?.description || 'We are pioneers in creating a circular economy by converting waste into high-value, eco-friendly products.'}</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                 { (homeData?.whatWeDo?.cards || [
                     { title: 'Biocementation', desc: 'Manufacturing strong, low-carbon building materials from industrial waste.' },
                     { title: 'Biofertilizers', desc: 'Producing organic fertilizers that restore soil health and boost crop yields.' },
                     { title: 'Waste R&D', desc: 'Partnering with industries to turn their waste streams into profitable assets.' }
                 ]).map((card, idx) => (
                    <AnimatedSection key={idx} delay={500 + idx * 200}>
                        <div className="bg-gray-700 p-8 rounded-xl shadow-lg h-full">
                            <h3 className="text-2xl font-bold text-green-400 mb-3">{card.title}</h3>
                            <p className="text-gray-300">{card.desc}</p>
                        </div>
                    </AnimatedSection>
                 ))}
            </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{homeData?.innovationsSection?.title || 'What We Offer In Place Of Our Innovations'}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4">{homeData?.innovationsSection?.description || 'Explore our range of sustainable solutions designed for a greener tomorrow.'}</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS_DATA.map((product, index) => (
              <AnimatedSection key={product.slug} delay={500 + index * 200}>
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col">
                  <img src={product.cardImage} alt={product.title} className="w-full h-48 object-cover" />
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-2">{product.title}</h3>
                    <p className="text-gray-400 mb-4 flex-grow">{product.shortDescription}</p>
                    <Link to={`/products/${product.slug}`} className="font-semibold text-green-400 group-hover:text-green-300 transition-colors">
                      Learn More &rarr;
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;