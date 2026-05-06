import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import LiquidButton from './LiquidButton';

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

        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium ${location.pathname === link.href ? 'text-green-400' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
            <Link to="/contact">
                <LiquidButton>Contact Us</LiquidButton>
            </Link>
        </div>

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
        className={`md:hidden transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="bg-gray-800 px-6 pb-4 flex flex-col space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium py-2 ${location.pathname === link.href ? 'text-green-400' : ''}`}
            >
              {link.label}
            </Link>
          ))}
           <Link to="/contact">
                <LiquidButton className="w-full">Contact Us</LiquidButton>
            </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;