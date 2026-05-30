import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import LiquidButton from '../components/LiquidButton';
import { PRODUCTS_DATA } from '../constants';

import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const isVideoUrl = (url: string) => {
  if (!url) return false;
  const cleanUrl = url.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '').toLowerCase().trim();
  return cleanUrl.endsWith('.mp4') || 
         cleanUrl.endsWith('.webm') || 
         cleanUrl.endsWith('.mov') || 
         cleanUrl.endsWith('.ogg') ||
         cleanUrl.includes('/videos/') ||
         cleanUrl.includes('.mp4');
};

interface VideoBackgroundProps {
  src: string;
  isActive: boolean;
  onEnded: () => void;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src, isActive, onEnded }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch((err) => {
        console.warn("Autoplay block handle:", err);
      });
    } else {
      video.pause();
    }
  }, [isActive, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      onEnded={() => {
        if (isActive) {
          onEnded();
        }
      }}
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
  );
};

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
            bgImage: s.bgImage,
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
                    bgImage: s.bgImage,
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

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const activeSlide = slides[currentSlide];
    const isVideo = activeSlide && isVideoUrl(activeSlide.bgImage);
    
    // For video slides, the transition is driven entirely by the video timeline (onEnded event).
    // For images, we use the standard 4-second auto-advance.
    if (isVideo) {
      return;
    }

    const timer = setTimeout(() => {
      nextSlide();
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentSlide, slides, nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        {slides.map((slide, index) => {
            const isVideo = isVideoUrl(slide.bgImage);
            const cleanUrl = slide.bgImage ? slide.bgImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '') : '';
            return (
              <div 
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${slide.bgColor ?? ''} ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  style={isVideo ? {} : { backgroundImage: `url('${cleanUrl}')` }}
              >
                {isVideo && (
                  <VideoBackground
                    src={cleanUrl}
                    isActive={index === currentSlide}
                    onEnded={nextSlide}
                  />
                )}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
              </div>
            );
        })}

        <div className="relative z-10 max-w-4xl mx-auto">
             {slides[currentSlide].content}
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-green-500 hover:text-black text-white p-3 md:p-4 rounded-full border border-white/10 hover:border-green-400 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-green-500 hover:text-black text-white p-3 md:p-4 rounded-full border border-white/10 hover:border-green-400 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </>
        )}

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
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <AnimatedSection className="text-center mb-10 md:mb-12">
                <h2 id="about-what-is-it-header" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    About VishwaAadhar: What Is It
                </h2>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
                <Link to="/about" className="block group">
                    <div className="bg-gray-900/60 border border-gray-750 group-hover:border-green-500/50 rounded-2xl p-6 sm:p-10 md:p-12 shadow-xl hover:shadow-green-500/5 transition-all duration-300 relative overflow-hidden transform hover:-translate-y-1">
                        {/* Elegant abstract background decor */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-green-500/10 transition-colors duration-500" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />
                        
                        {/* Large Quote Ornament on top-left for tablet/desktop */}
                        <span className="hidden sm:block absolute top-6 left-6 text-6xl text-green-500/10 font-serif select-none pointer-events-none">“</span>
                        
                        <div className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg relative z-10 text-justify sm:text-left">
                            <p>
                                “ At <span className="text-white font-semibold">Vishwaaadhar Biocement and Fertilizer Enterprises</span>, we are reimagining the future of sustainable infrastructure by combining Microbial Science, Biomineralization, Advanced Research, and Circular Economy principles to transform Liquid Sanitation and Industrial Waste into high-performance, low-carbon Biocement, Biofertilizers, and green technologies designed for stronger, smarter, and environmentally responsible construction and agriculture. Driven by innovation, our ultimate mission is to build a cleaner, greener, and healthier world for future generations to live, grow, and thrive. ”
                            </p>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end items-center relative z-10">
                            <span className="text-xs sm:text-sm md:text-base font-semibold text-green-400 group-hover:text-green-300 transition-colors flex items-center gap-1.5">
                                Learn More About Our Journey <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                            </span>
                        </div>
                    </div>
                </Link>
            </AnimatedSection>
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