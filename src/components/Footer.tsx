import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LiquidButton from './LiquidButton';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, TwitterIcon, YouTubeIcon, PRODUCTS_DATA } from '../constants';

const supportLinks = [
    { href: '/faq', label: 'FAQs' },
    { href: '/help-center', label: 'Help Center' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact Us' },
];

import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Footer: React.FC = () => {
  const location = useLocation();
  const [footerData, setFooterData] = React.useState<any>(null);
  const [clickCount, setClickCount] = React.useState(0);
  const clickTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, 'site_settings', 'footer'), (doc) => {
        if (doc.exists()) setFooterData(doc.data());
    });
    return () => {
        unsub();
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const handleAdminTrigger = () => {
    setClickCount(prev => {
        const next = prev + 1;
        if (next === 6) {
            window.location.href = '/admin-panel/login.html';
            return 0;
        }
        return next;
    });

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
    }, 2000);
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-6 py-12">
             {location.pathname !== '/contact' && (
                <div className="bg-gray-800 rounded-2xl text-white p-8 md:p-12 text-center flex flex-col items-center shadow-lg">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{footerData?.ctaHeading || "Ready to Build a Greener Future?"}</h2>
                    <p className="max-w-2xl mx-auto mb-8 text-gray-300">
                        {footerData?.ctaText || "Join us in our mission to create a sustainable world. Whether you're a farmer, builder, or industry leader, we have a solution for you."}
                    </p>
                    <Link to="/contact">
                        <LiquidButton className="bg-white text-green-700">{footerData?.ctaButtonText || "Get In Touch"}</LiquidButton>
                    </Link>
                </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-sm">
                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Products</h4>
                    <ul className="space-y-3">
                        {PRODUCTS_DATA.map((product) => (
                            <li key={product.slug}>
                                <Link to={`/products/${product.slug}`} className="text-gray-400 hover:text-green-400 transition-colors">{product.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
                    <ul className="space-y-3">
                         <li><Link to="/" className="text-gray-400 hover:text-green-400 transition-colors">Home</Link></li>
                         <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">About Us</Link></li>
                         <li><Link to="/products" className="text-gray-400 hover:text-green-400 transition-colors">Products</Link></li>
                         <li><Link to="/gallery" className="text-gray-400 hover:text-green-400 transition-colors">Gallery</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Support</h4>
                    <ul className="space-y-3">
                       {supportLinks.map(link => (
                           <li key={link.href}><Link to={link.href} className="text-gray-400 hover:text-green-400 transition-colors">{link.label}</Link></li>
                       ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Follow Us</h4>
                    <div className="flex items-center gap-4 flex-wrap">
                        <a href="https://wa.me/message/YIGIQI3SKZ7FI1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-green-500 hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                            <WhatsAppIcon className="w-7 h-7" />
                        </a>
                        <a href="https://www.instagram.com/vishwa_aadhar/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-pink-500 hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                            <InstagramIcon className="w-7 h-7" />
                        </a>
                        <a href="https://www.youtube.com/@VISHWAAADHAR" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-red-500 hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                            <YouTubeIcon className="w-7 h-7" />
                        </a>
                        <a href="https://x.com/Vishwa_Aadhar?s=08" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                            <TwitterIcon className="w-7 h-7" />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61574757361093&mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-blue-500 hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                            <FacebookIcon className="w-7 h-7" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                <p 
                    className="cursor-default select-none pointer-events-auto"
                    onClick={handleAdminTrigger}
                >
                    &copy; {new Date().getFullYear()} Vishwa Aadhar Enterprises. All Rights Reserved.
                </p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;