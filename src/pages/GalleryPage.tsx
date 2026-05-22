import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { db } from '../firebase';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const GalleryPage: React.FC = () => {
  const [videos, setVideos] = React.useState<any[]>([]);
  const [images, setImages] = React.useState<any[]>([]);
  const [header, setHeader] = React.useState<any>(null);
  
  // Custom states for Pagination / Auto-managing list sizes and Lightbox
  const [visibleCount, setVisibleCount] = React.useState(12);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const headerPath = 'gallery_page/content';
    const unsubHeader = onSnapshot(doc(db, 'gallery_page', 'content'), (doc) => {
        if (doc.exists()) setHeader(doc.data());
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, headerPath);
    });

    const videosPath = 'videos';
    const unsubVideos = onSnapshot(collection(db, 'videos'), (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, videosPath);
    });

    const galleryPath = 'gallery_media';
    const unsubGallery = onSnapshot(collection(db, 'gallery_media'), (snapshot) => {
      setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, galleryPath);
    });

    return () => {
        unsubVideos();
        unsubGallery();
        unsubHeader();
    }
  }, []);

  // Keyboard navigation for Lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => prev !== null ? (prev - 1 + images.length) % images.length : null);
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => prev !== null ? (prev + 1) % images.length : null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images]);

  const getVideoMedia = (url: string) => {
    if (!url) return null;
    const lowerUrl = url.trim().toLowerCase();

    // Check if it's a direct mp4, webm, ogg, mov file URL (including normal query params, firebase, image2url, etc.)
    if (
      lowerUrl.includes('.mp4') || 
      lowerUrl.includes('.webm') || 
      lowerUrl.includes('.ogg') || 
      lowerUrl.includes('.mov') ||
      lowerUrl.includes('image2url') || 
      lowerUrl.includes('firebasestorage.googleapis.com') ||
      (lowerUrl.startsWith('http') && lowerUrl.includes('video'))
    ) {
      return { type: 'direct', src: url.trim() };
    }

    // YouTube
    const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const ytMatch = url.match(ytRegExp);
    if (ytMatch && ytMatch[2].length === 11) {
      return { type: 'embed', src: `https://www.youtube.com/embed/${ytMatch[2]}` };
    }

    // Instagram
    const instaRegExp = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reels?|reel|tv)\/([^/?#&]+)/;
    const instaMatch = url.match(instaRegExp);
    if (instaMatch && instaMatch[1]) {
      const mediaId = instaMatch[1];
      const type = url.includes('/p/') ? 'p' : 'reel';
      return { type: 'embed', src: `https://www.instagram.com/${type}/${mediaId}/embed` };
    }

    return null;
  };

  return (
    <div className="pt-24 bg-gray-900 text-gray-300">
      <section className="py-20 min-h-[calc(100vh-12rem)]">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{header?.title || "Gallery & Media"}</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
                {header?.description || "Visual stories and highlights from our sustainability journey."}
            </p>
          </AnimatedSection>
          
          {/* Images Section */}
          <div className="mb-24">
            <AnimatedSection className="mb-10">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-green-500 rounded-full"></span>
                Photo Gallery
              </h2>
            </AnimatedSection>
            
            {images.length > 0 ? (
              <div>
                {/* Responsive Compact Grid - 2 columns on mobile, scaling cleanly with small gutters */}
                <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
                  {images.slice(0, visibleCount).map((image, index) => (
                    <AnimatedSection key={image.id} delay={150 + (index % 6) * 40}>
                      <div 
                        onClick={() => setLightboxIndex(index)}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-gray-800 border border-gray-700/65 hover:border-green-500/40 cursor-pointer shadow-md hover:shadow-green-500/5 transition-all duration-300"
                      >
                        <img 
                          src={image.url} 
                          alt={image.caption} 
                          className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* overlay caption */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                          <p className="text-white text-[11px] leading-tight font-medium line-clamp-2">{image.caption}</p>
                        </div>
                        {/* subtle indicator for mobile view touch devices */}
                        <div className="md:hidden absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-[8px] text-gray-400 tracking-wider">
                          VIEW
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>

                {/* Auto Management / Smart Load More button */}
                {images.length > visibleCount && (
                  <div className="flex justify-center mt-12">
                    <button 
                      onClick={() => setVisibleCount(p => p + 12)}
                      className="flex items-center gap-2 bg-gray-800/40 hover:bg-green-600 hover:text-white text-green-400 font-semibold px-6 py-2.5 rounded-xl border border-gray-700 hover:border-transparent transition-all duration-300 active:scale-95 text-sm shadow-md cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Load More Photos
                    </button>
                  </div>
                )}
              </div>
            ) : (
                <div className="text-center py-10 bg-gray-800/50 rounded-2xl border border-dashed border-gray-700">
                    <p className="text-gray-500 italic">No gallery images available yet.</p>
                </div>
            )}
          </div>

          {/* Videos Section */}
          <div className="mb-10">
            <AnimatedSection className="mb-10">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <span className="w-8 h-1 bg-green-500 rounded-full"></span>
                    Video Media
                </h2>
            </AnimatedSection>

            {videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, index) => {
                        const videoMedia = getVideoMedia(video.youtubeUrl);
                        return (
                            <AnimatedSection key={video.id} delay={400 + index * 100}>
                                <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 h-full flex flex-col">
                                    <div className="relative aspect-video bg-black">
                                        {videoMedia ? (
                                            videoMedia.type === 'embed' ? (
                                                <iframe 
                                                    className="absolute inset-0 w-full h-full"
                                                    src={videoMedia.src}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <video 
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    src={videoMedia.src}
                                                    controls
                                                    preload="metadata"
                                                    playsInline
                                                ></video>
                                            )
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs text-center p-4">
                                            Invalid or unsupported video URL<br/>(Use YouTube, Instagram or direct .mp4)
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                                    </div>
                                </div>
                            </AnimatedSection>
                        );
                    })}
                </div>
            ) : (
                <AnimatedSection className="text-center">
                    <div className="bg-gray-800 p-10 rounded-2xl max-w-2xl mx-auto shadow-lg">
                        <div className="text-6xl mb-4" role="img" aria-label="film projector emoji">🎬</div>
                        <h2 className="text-3xl font-bold text-white mb-3">Coming Soon</h2>
                        <p className="text-gray-400">
                            We are working hard to bring you exciting video content.
                        </p>
                    </div>
                </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* Sleek full-viewport Lightbox Modal for both phone & desktop */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 backdrop-blur-md p-4 md:p-8 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Header area with close button aligned cleanly */}
            <motion.div 
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ delay: 0.05, duration: 0.2 }}
              className="w-full flex justify-end items-center h-12" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="text-white hover:text-green-400 bg-gray-950 p-3 rounded-full border border-gray-800 hover:border-green-500/30 transition-all duration-300 shadow-xl cursor-pointer focus:outline-none"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Gallery"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Navigation controls around the central image */}
            <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-4" onClick={(e) => e.stopPropagation()}>
              {/* Prev Image Button */}
              <button 
                className="absolute left-2 md:-left-16 z-20 text-white hover:text-green-400 bg-gray-900/80 hover:bg-gray-800 p-3.5 rounded-full border border-gray-800 hover:border-green-500/30 transition-all duration-300 active:scale-95 cursor-pointer shadow-lg h-12 w-12 flex items-center justify-center"
                onClick={() => {
                  setLightboxIndex(prev => prev !== null ? (prev - 1 + images.length) % images.length : null);
                }}
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Displaying active image cleanly with spring zoom-in on load, and unique key so it animates when swapping images! */}
              <div className="w-full h-full max-h-[55vh] md:max-h-[65vh] flex items-center justify-center p-2">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={lightboxIndex}
                    initial={{ scale: 0.93, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.93, opacity: 0, y: -15 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    src={images[lightboxIndex].url} 
                    alt={images[lightboxIndex].caption || "Vishwa Aadhar Gallery"} 
                    className="max-h-full max-w-full rounded-2xl object-contain border border-gray-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                  />
                </AnimatePresence>
              </div>

              {/* Next Image Button */}
              <button 
                className="absolute right-2 md:-right-16 z-20 text-white hover:text-green-400 bg-gray-900/80 hover:bg-gray-800 p-3.5 rounded-full border border-gray-800 hover:border-green-500/30 transition-all duration-300 active:scale-95 cursor-pointer shadow-lg h-12 w-12 flex items-center justify-center"
                onClick={() => {
                  setLightboxIndex(prev => prev !== null ? (prev + 1) % images.length : null);
                }}
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Premium caption card with glassmorphism */}
            <motion.div 
              key={`caption-${lightboxIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              className="w-full max-w-xl bg-gray-900/95 backdrop-blur-lg border border-gray-800 rounded-2xl p-4 md:p-5 text-center shadow-2xl mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="inline-block bg-green-500/15 text-green-400 text-[10px] md:text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-2">
                Photo {lightboxIndex + 1} of {images.length}
              </div>
              <p className="text-white text-base md:text-lg font-bold tracking-tight leading-snug">
                {images[lightboxIndex].caption || "Vishwa Aadhar Enterprises Gallery Image"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;