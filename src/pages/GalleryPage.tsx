import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

import { db } from '../firebase';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const GalleryPage: React.FC = () => {
  const [videos, setVideos] = React.useState<any[]>([]);
  const [images, setImages] = React.useState<any[]>([]);
  const [header, setHeader] = React.useState<any>(null);

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

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // YouTube
    const ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const ytMatch = url.match(ytRegExp);
    if (ytMatch && ytMatch[2].length === 11) {
      return `https://www.youtube.com/embed/${ytMatch[2]}`;
    }

    // Instagram
    const instaRegExp = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reels?|reel|tv)\/([^/?#&]+)/;
    const instaMatch = url.match(instaRegExp);
    if (instaMatch && instaMatch[1]) {
      const mediaId = instaMatch[1];
      const type = url.includes('/p/') ? 'p' : 'reel';
      return `https://www.instagram.com/${type}/${mediaId}/embed`;
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <AnimatedSection key={image.id} delay={200 + index * 50}>
                    <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-800 border border-gray-700">
                      <img 
                        src={image.url} 
                        alt={image.caption} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
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
                        const embedUrl = getEmbedUrl(video.youtubeUrl);
                        return (
                            <AnimatedSection key={video.id} delay={400 + index * 100}>
                                <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 h-full flex flex-col">
                                    <div className="relative aspect-video bg-black">
                                        {embedUrl ? (
                                            <iframe 
                                                className="absolute inset-0 w-full h-full"
                                                src={embedUrl}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs text-center p-4">
                                            Invalid or unsupported video URL<br/>(Use YouTube or Instagram)
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
    </div>
  );
};

export default GalleryPage;