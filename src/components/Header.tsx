import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src="https://i.postimg.cc/cLCVRRkY/Whats-App-Image-2025-09-14-at-11.png" alt="Vishwa Aadhar Enterprises Logo" className="h-12 w-12 rounded-full object-cover border-2 border-gray-700" />
          <span className="hidden sm:block text-lg font-bold text-white">Vishwa Aadhar Enterprises</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm lg:text-base text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium ${location.pathname === link.href ? 'text-green-400' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="bg-[#0b1224] text-white px-6 py-2 rounded-full text-sm lg:text-base font-medium hover:bg-gray-800 transition-all duration-300 border border-gray-700 shadow-lg whitespace-nowrap ml-2"
          >
            Contact Us
          </Link>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen border-t border-white/5 shadow-2xl' : 'max-h-0'
        }`}
      >
        <div className="bg-gray-900/95 backdrop-blur-md px-6 py-8 flex flex-col items-center space-y-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-lg text-gray-300 hover:text-green-400 transition-all duration-300 font-medium w-full text-center py-2 ${location.pathname === link.href ? 'text-green-400' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="bg-[#0b1224] text-white px-8 py-3 rounded-full font-semibold text-center w-full max-w-[220px] hover:bg-gray-800 transition-all duration-300 shadow-lg border border-gray-700 mt-2"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;