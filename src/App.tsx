import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import FaqsPage from './pages/FaqsPage';
import HelpCenterPage from './pages/HelpCenterPage';
import CareersPage from './pages/CareersPage';
import CertificationsPage from './pages/CertificationsPage';
import { PRODUCTS_DATA } from './constants';


const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();

  // Asynchronously preload all product images for instant loading
  useEffect(() => {
    const urlsToPreload = PRODUCTS_DATA.flatMap(p => [p.cardImage, p.details.mainImage]);
    const linkElements: HTMLLinkElement[] = [];

    urlsToPreload.forEach(url => {
      // 1. Memory instantiation to queue high priority download
      const img = new Image();
      img.src = url;

      // 2. Link preloading addition to the document head
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
      linkElements.push(link);
    });

    return () => {
      linkElements.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  useEffect(() => {
    // 1. Disable right-click context menu (Temporarily disabled for inspection)
    const handleContextMenu = (e: MouseEvent) => {
      // e.preventDefault();
    };

    // 2. Disable DevTools shortcuts & keys (Temporarily disabled for inspection)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === 'F12') {
        // e.preventDefault();
        return;
      }

      // Check OS
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      const keyUpper = e.key.toUpperCase();

      // Ctrl+Shift+I / Cmd+Option+I (Inspect tool)
      if (isCmdOrCtrl && e.shiftKey && keyUpper === 'I') {
        // e.preventDefault();
        return;
      }
      if (isMac && e.metaKey && e.altKey && keyUpper === 'I') {
        // e.preventDefault();
        return;
      }

      // Ctrl+Shift+J / Cmd+Option+J (Console tool)
      if (isCmdOrCtrl && e.shiftKey && keyUpper === 'J') {
        // e.preventDefault();
        return;
      }
      if (isMac && e.metaKey && e.altKey && keyUpper === 'J') {
        // e.preventDefault();
        return;
      }

      // Ctrl+Shift+C / Cmd+Option+C (Inspector selector)
      if (isCmdOrCtrl && e.shiftKey && keyUpper === 'C') {
        // e.preventDefault();
        return;
      }
      if (isMac && e.metaKey && e.altKey && keyUpper === 'C') {
        // e.preventDefault();
        return;
      }

      // Ctrl+U / Cmd+U (View Page Source)
      if (isCmdOrCtrl && keyUpper === 'U') {
        // e.preventDefault();
        return;
      }

      // Ctrl+S / Cmd+S (Save web page)
      if (isCmdOrCtrl && keyUpper === 'S') {
        // e.preventDefault();
        return;
      }
    };

    // document.addEventListener('contextmenu', handleContextMenu);
    // document.addEventListener('keydown', handleKeyDown);

    return () => {
      // document.removeEventListener('contextmenu', handleContextMenu);
      // document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollToTop />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqsPage />} />
              <Route path="/help-center" element={<HelpCenterPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;