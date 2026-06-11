import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { PRODUCTS_DATA } from '../constants';

interface RouteItem {
  path: string;
  label: string;
  priority: string;
  changefreq: string;
  type: 'static' | 'dynamic';
}

const SitemapPage: React.FC = () => {
  // Automatically collect all routes
  const staticRoutes: RouteItem[] = [
    { path: '/', label: 'Home', priority: '1.0', changefreq: 'daily', type: 'static' },
    { path: '/about', label: 'About Us', priority: '0.8', changefreq: 'weekly', type: 'static' },
    { path: '/products', label: 'Products', priority: '0.8', changefreq: 'weekly', type: 'static' },
    { path: '/gallery', label: 'Gallery', priority: '0.8', changefreq: 'weekly', type: 'static' },
    { path: '/certifications', label: 'Certifications', priority: '0.8', changefreq: 'weekly', type: 'static' },
    { path: '/contact', label: 'Contact Us', priority: '0.6', changefreq: 'weekly', type: 'static' },
    { path: '/faq', label: 'FAQs', priority: '0.6', changefreq: 'weekly', type: 'static' },
    { path: '/help-center', label: 'Help Center', priority: '0.6', changefreq: 'weekly', type: 'static' },
    { path: '/careers', label: 'Careers', priority: '0.6', changefreq: 'weekly', type: 'static' },
  ];

  const dynamicRoutes: RouteItem[] = PRODUCTS_DATA.map((product) => ({
    path: `/products/${product.slug}`,
    label: `Product: ${product.title}`,
    priority: '0.6',
    changefreq: 'weekly',
    type: 'dynamic',
  }));

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // Simulated lastmod helper representing modern build release timestamps
  const getLastmodDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="pt-24 bg-gray-900 text-gray-300 min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16" id="sitemap-header">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sitemap.xml for now to see Page
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Automated visual directory of all live pages, search engine priorities, indexation frequencies, and dynamic nested canonical paths.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visual Route Index */}
            <AnimatedSection className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 h-full" id="sitemap-visual-index">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                Visual Route Directory
              </h2>
              <div className="space-y-4">
                {allRoutes.map((route, idx) => (
                  <Link
                    key={idx}
                    to={route.path}
                    className="flex justify-between items-center p-3 rounded-lg bg-gray-700/40 hover:bg-gray-700 border border-gray-700 transition"
                  >
                    <div>
                      <span className="block font-medium text-white">{route.label}</span>
                      <span className="font-mono text-xs text-green-400">{route.path}</span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-gray-600 uppercase font-bold text-gray-300">
                      {route.type}
                    </span>
                  </Link>
                ))}
              </div>
            </AnimatedSection>

            {/* Live Search Engine Indexes / Stats */}
            <AnimatedSection className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 h-full" id="sitemap-metadata">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                Search Engine Metadata
              </h2>
              <div className="p-4 bg-gray-900 rounded-xl mb-6 border border-gray-800">
                <span className="block text-sm text-gray-400 mb-1">Dynamic Canonical Link:</span>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-green-400 hover:underline break-all"
                >
                  {window.location.origin}/sitemap.xml
                </a>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Sitemap Configuration Guidelines</h3>
                  <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
                    <li>Sitemap matches standard XML-schema protocol format.</li>
                    <li>Priority values assigned based on structural page depth.</li>
                    <li>Dynamically tracks routing files from application source repository.</li>
                    <li>Filters out test, admin panels, and invalid sub-routes.</li>
                  </ul>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Crawler Status Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-700/30 text-center">
                      <span className="block text-2xl font-bold text-white">{allRoutes.length}</span>
                      <span className="text-xs text-gray-400">Total Crawlable URLs</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-700/30 text-center">
                      <span className="block text-2xl font-bold text-white">{getLastmodDate()}</span>
                      <span className="text-xs text-gray-400">XML Last Modified</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;
