import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const visibleLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/products', label: 'Products' },
    { href: '/gallery', label: 'Gallery' },
  ];

  const dropdownLinks = [
    { href: '/technologies', label: 'Technologies' },
    { href: '/validation-center', label: 'Validation Center' },
    { href: '/investors', label: 'Investors & Partners' },
    { href: '/certifications', label: 'Certifications' },
  ];

  const isDropdownActive = dropdownLinks.some(link => location.pathname === link.href);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsMobileMoreOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center gap-x-6 lg:gap-x-12">
        <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
          <img src="https://i.postimg.cc/cLCVRRkY/Whats-App-Image-2025-09-14-at-11.png" alt="Vishwa Aadhar Enterprises Logo" className="h-12 w-12 rounded-full object-cover border-2 border-gray-700" />
          <span className="hidden sm:block md:hidden lg:block text-lg font-bold text-white whitespace-nowrap">Vishwa Aadhar Enterprises</span>
        </Link>

        <nav className="hidden md:flex items-center justify-between md:gap-3 lg:gap-4 xl:gap-6 2xl:gap-8">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-1 py-2 text-[13px] lg:text-sm text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium whitespace-nowrap flex items-center justify-center ${location.pathname === link.href ? 'text-green-400' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="bg-[#0b1224] text-white px-3 lg:px-4 py-1.5 rounded-full text-[13px] lg:text-sm font-medium hover:bg-gray-800 transition-all duration-300 border border-gray-700 shadow-lg whitespace-nowrap flex items-center justify-center ml-1"
          >
            Contact Us
          </Link>

          {/* More ▼ Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
              className={`px-1 py-2 text-[13px] lg:text-sm text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium whitespace-nowrap flex items-center gap-1 focus:outline-none cursor-pointer ${isDropdownActive ? 'text-green-400' : ''}`}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <span>More</span>
              <span className={`text-[9px] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-green-400' : 'rotate-0 text-gray-400'}`}>▼</span>
            </button>
            
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-52 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-1.5 z-50 backdrop-blur-md"
                role="menu"
              >
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`block px-4 py-2 text-xs lg:text-sm text-gray-300 hover:text-green-400 hover:bg-gray-850 transition-colors duration-200 font-medium whitespace-nowrap ${
                      location.pathname === link.href ? 'text-green-400 bg-gray-800/40' : ''
                    }`}
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
        className={`md:hidden transition-all duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'max-h-[calc(100vh-80px)] border-t border-white/5 shadow-2xl' : 'max-h-0'
        }`}
      >
        <div className="bg-gray-900/95 backdrop-blur-md px-6 py-8 flex flex-col items-center space-y-5">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-lg text-gray-300 hover:text-green-400 transition-all duration-300 font-medium w-full text-center py-2 ${location.pathname === link.href ? 'text-green-400' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile More Expandable Accordion */}
          <div className="w-full flex flex-col items-center">
            <button
              onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
              className={`text-lg text-gray-300 hover:text-green-400 transition-all duration-300 font-medium w-full text-center py-2 flex items-center justify-center gap-2 focus:outline-none cursor-pointer ${
                isDropdownActive ? 'text-green-400 font-semibold' : ''
              }`}
            >
              <span>More</span>
              <span className={`text-[10px] transition-transform duration-300 ${isMobileMoreOpen ? 'rotate-180 text-green-400' : 'rotate-0 text-gray-400'}`}>▼</span>
            </button>

            {isMobileMoreOpen && (
              <div className="w-full bg-gray-950/50 border border-gray-800/80 rounded-2xl p-4 mt-3 flex flex-col gap-3.5 animate-in fade-in slide-in-from-top-2 duration-250">
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-base text-gray-400 hover:text-green-400 transition-colors duration-250 font-medium w-full text-center py-1.5 ${
                      location.pathname === link.href ? 'text-green-400 bg-gray-800/20 rounded-xl' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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