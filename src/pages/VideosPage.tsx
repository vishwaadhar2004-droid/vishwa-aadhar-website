import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

import { db } from '../firebase';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const VideosPage: React.FC = () => {
  const [videos, setVideos] = React.useState<any[]>([]);
  const [header, setHeader] = React.useState<any>(null);

  React.useEffect(() => {
    const headerPath = 'videos_page/content';
    const unsubHeader = onSnapshot(doc(db, 'videos_page', 'content'), (doc) => {
        if (doc.exists()) setHeader(doc.data());
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, headerPath);
    });

    const path = 'videos';
    const unsub = onSnapshot(collection(db, 'videos'), (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
    return () => {
        unsub();
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
      // Use /embed at the end for simple cross-origin embedding
      // Note: Instagram embedding works best when the user is logged in or for public posts
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{header?.title || "From Vision to Action"}</h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
                {header?.description || "Real-world impact stories and R&D highlights from our sustainability journey."}
            </p>
          </AnimatedSection>
          
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video, index) => {
                    const embedUrl = getEmbedUrl(video.youtubeUrl);
                    return (
                        <AnimatedSection key={video.id} delay={500 + index * 100}>
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
                        We are working hard to bring you exciting video content showcasing our projects and innovations. Please check back later!
                    </p>
                </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default VideosPage;