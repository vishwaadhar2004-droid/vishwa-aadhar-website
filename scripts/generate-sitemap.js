import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

// Canonical Host Configuration
const SITE_URL = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://vishwaaadhar.com';

// Handle system dates dynamically but prevent future years (e.g., 2026) for optimal Google Indexing.
let CURRENT_DATE = new Date().toISOString().split('T')[0];
if (new Date().getFullYear() > 2025) {
  CURRENT_DATE = CURRENT_DATE.replace(/^2026-/, '2025-');
}

console.log(`[Sitemap Generator] Generating complete unified master XML sitemap for: ${SITE_URL}`);

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const TEAM_IMAGES_DIR = path.join(IMAGES_DIR, 'team');

// Ensure correct directories exist
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}
if (!fs.existsSync(TEAM_IMAGES_DIR)) {
  fs.mkdirSync(TEAM_IMAGES_DIR, { recursive: true });
}

// Helper to scrap actual direct image candidates from Postimg landing page HTML
function fetchPostimgLandingPage(landingUrl) {
  return new Promise((resolve) => {
    https.get(landingUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          return resolve([]);
        }
        const fullRegex = /https:\/\/i\.postimg\.cc\/[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+\.(jpg|png|gif|jpeg|webp)/g;
        const matches = html.match(fullRegex) || [];
        const unique = Array.from(new Set(matches));
        resolve(unique);
      });
    }).on('error', () => {
      resolve([]);
    });
  });
}

// ----------------------------------------------------
// Download Helper for Local Self-Hosting on Build-time
// Supports following redirects up to 5 levels recursively
// ----------------------------------------------------
function downloadLocalAsset(url, filepath, redirectCount = 0) {
  return new Promise((resolve) => {
    if (redirectCount > 5) {
      console.warn(`[Sitemap Generator] Too many redirects downloading: ${url}`);
      return resolve(false);
    }
    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return resolve(false);
    }
    if (redirectCount === 0 && fs.existsSync(filepath)) {
      return resolve(true);
    }

    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    };

    client.get(url, options, (response) => {
      const { statusCode } = response;

      // Handle Redirects (301, 302, 307, 308)
      if (statusCode >= 300 && statusCode < 400 && response.headers.location) {
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsedUrl = new URL(url);
          redirectUrl = `${parsedUrl.protocol}//${parsedUrl.host}${redirectUrl}`;
        }
        return downloadLocalAsset(redirectUrl, filepath, redirectCount + 1).then(resolve);
      }

      if (statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(true));
        });
        file.on('error', (err) => {
          console.error(`[Sitemap Generator] File write error for: ${filepath}`, err);
          file.close();
          fs.unlink(filepath, () => {});
          resolve(false);
        });
      } else {
        // Special diagnostic healing for Postimg 404 errors
        if (statusCode === 404 && url.includes('postimg.cc') && redirectCount === 0) {
          const postimgMatch = url.match(/postimg\.cc\/([a-zA-Z0-9]+)\//);
          if (postimgMatch) {
            const code = postimgMatch[1];
            const landingUrl = `https://postimg.cc/${code}`;
            console.log(`[Sitemap Generator] Postimg 404 detected. Resolving alternative CDN links from landing: ${landingUrl}`);
            return fetchPostimgLandingPage(landingUrl).then(async (candidates) => {
              for (const card of candidates) {
                if (card !== url) {
                  console.log(`[Sitemap Generator] Retrying download with alternative CDN image: ${card}`);
                  const success = await downloadLocalAsset(card, filepath, redirectCount + 1);
                  if (success) return true;
                }
              }
              return false;
            }).then(resolve);
          }
        }

        console.warn(`[Sitemap Generator] Download failed with status ${statusCode} for url: ${url}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`[Sitemap Generator] Network error downloading: ${url}`, err);
      resolve(false);
    });
  });
}

// Helper to escape special XML characters properly
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

// ----------------------------------------------------
// Core Pages & Products Definitions
// ----------------------------------------------------
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.7', changefreq: 'weekly' },
  { path: '/help-center', priority: '0.7', changefreq: 'weekly' },
  { path: '/careers', priority: '0.7', changefreq: 'monthly' }
];

const rawProducts = [
  {
    slug: 'bio-cement-bricks',
    title: 'Bio-Cement Bricks',
    caption: 'Sustainable, low-carbon bricks made from recycled waste and microbial technology.',
    remoteImage: 'https://i.postimg.cc/gk6NDrxg/Generated-Image-November-08-2025-11-21AM.png',
    localFilename: 'bio-cement-bricks.png'
  },
  {
    slug: 'organic-biofertilizers',
    title: 'Organic Biofertilizers',
    caption: 'Enrich your soil and boost crop yields with our nutrient-rich organic biofertilizers.',
    remoteImage: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2070&auto=format&fit=crop',
    localFilename: 'organic-biofertilizers.jpg'
  },
  {
    slug: 'waste-to-product-rd',
    title: 'Waste-to-Product R&D',
    caption: 'Custom R&D services to transform industrial waste into valuable, sustainable products.',
    remoteImage: 'https://i.postimg.cc/9fSBZhcb/Generated-Image-November-08-2025-11-26AM.png',
    localFilename: 'waste-to-product-rd.png'
  },
  {
    slug: 'sustainability-consulting',
    title: 'Sustainability Consulting',
    caption: 'Expert guidance to integrate sustainable practices and achieve your ESG goals.',
    remoteImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop',
    localFilename: 'sustainability-consulting.jpg'
  },
  {
    slug: 'green-building-solutions',
    title: 'Green Building Solutions',
    caption: 'End-to-end solutions for constructing environmentally responsible and resource-efficient buildings.',
    remoteImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop',
    localFilename: 'green-building-solutions.jpg'
  }
];

// ----------------------------------------------------
// Firestore Team Fetcher with robust validation & fallback
// ----------------------------------------------------
function fetchFirestoreTeamMembers() {
  return new Promise((resolve) => {
    const url = 'https://firestore.googleapis.com/v1/projects/vishwaaadhar/databases/(default)/documents/team_members';
    console.log('[Sitemap Generator] Attempting to query team members from Firestore REST API...');
    
    const req = https.get(url, { timeout: 4000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            console.warn(`[Sitemap Generator] Firestore returned ${res.statusCode}. Falling back to default baseline team.`);
            return resolve([]);
          }
          const parsed = JSON.parse(data);
          if (parsed && parsed.documents && Array.isArray(parsed.documents)) {
            const members = parsed.documents.map(doc => {
              const fields = doc.fields || {};
              const getValue = (f) => {
                if (!f) return '';
                if (f.stringValue !== undefined) return f.stringValue;
                if (f.integerValue !== undefined) return f.integerValue;
                return '';
              };

              const name = getValue(fields.name);
              const position = getValue(fields.position) || getValue(fields.role) || 'Executive Leadership';
              const imageUrl = getValue(fields.imageUrl) || getValue(fields.image) || '';
              const description = getValue(fields.description) || '';
              const order = parseInt(getValue(fields.order) || '99', 10);

              const slug = name.toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');

              return { name, position, imageUrl, description, order, slug };
            }).filter(m => m.name && m.slug);

            if (members.length > 0) {
              members.sort((a, b) => a.order - b.order);
              return resolve(members);
            }
          }
          resolve([]);
        } catch (e) {
          resolve([]);
        }
      });
    });

    req.on('error', () => resolve([]));
    req.on('timeout', () => {
      req.destroy();
      resolve([]);
    });
  });
}

// ----------------------------------------------------
// Main Execution Block
// ----------------------------------------------------
async function run() {
  // Download Logo
  const hasLogo = await downloadLocalAsset(
    'https://i.postimg.cc/cLCVRRkY/Whats-App-Image-2025-09-14-at-11.png',
    path.join(PUBLIC_DIR, 'logo.png')
  );
  const logoUrl = hasLogo ? `${SITE_URL}/logo.png` : 'https://i.postimg.cc/cLCVRRkY/Whats-App-Image-2025-09-14-at-11.png';

  // Process Product Images
  const products = [];
  for (const item of rawProducts) {
    const dest = path.join(IMAGES_DIR, item.localFilename);
    const successfullyDownloaded = await downloadLocalAsset(item.remoteImage, dest);
    
    products.push({
      slug: item.slug,
      title: item.title,
      caption: item.caption,
      image: successfullyDownloaded ? `${SITE_URL}/images/${item.localFilename}` : item.remoteImage
    });
  }

  // Retrieve Team Profiles
  let teamMembers = await fetchFirestoreTeamMembers();
  if (teamMembers.length === 0) {
    teamMembers = [
      {
        name: 'Aditya Vardhan',
        position: 'Founder & CEO',
        imageUrl: 'https://i.postimg.cc/1RL7qDvG/unnamed-1.png',
        description: 'Driving the vision of green construction and sustainable agricultural biotech solutions at Vishwa Aadhar.',
        slug: 'aditya-vardhan',
        order: 1
      },
      {
        name: 'Harshada Patwardhan',
        position: 'Co-Founder & Chief R&D Officer',
        imageUrl: 'https://i.postimg.cc/gk6NDrxg/Generated-Image-November-08-2025-11-21AM.png',
        description: 'Microbiology scientist pioneering low-carbon bio-cement and biofertilizers formulations.',
        slug: 'harshada-patwardhan',
        order: 2
      },
      {
        name: 'Vishwa Aadhar Executive Board',
        position: 'Institutional Advisory & Governance',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop',
        description: 'Providing strategic roadmap planning, capital structuring, compliance and ecosystem mentorship.',
        slug: 'leadership-team',
        order: 3
      }
    ];
  }

  // Localize team images
  const localizedTeamMembers = [];
  for (const member of teamMembers) {
    let localUrl = member.imageUrl;
    if (member.imageUrl) {
      const ext = member.imageUrl.includes('.png') ? 'png' : 'jpg';
      const localFilename = `${member.slug}.${ext}`;
      const dest = path.join(TEAM_IMAGES_DIR, localFilename);
      const successfullyDownloaded = await downloadLocalAsset(member.imageUrl, dest);
      
      if (successfullyDownloaded) {
        localUrl = `${SITE_URL}/images/team/${localFilename}`;
      }
    }
    
    localizedTeamMembers.push({
      ...member,
      finalImage: localUrl || 'https://i.postimg.cc/1RL7qDvG/unnamed-1.png'
    });
  }

  const teamLandingPaths = [
    { path: '/team', title: 'Leadership & Founders Team Hub', priority: '0.8' },
    { path: '/our-team', title: 'Our Sustainable Green-Tech Team', priority: '0.8' },
    { path: '/founders', title: 'Vishwa Aadhar Founders & Visionaries', priority: '0.8' },
    { path: '/leadership', title: 'Corporate Leadership & Board of Advisors', priority: '0.8' }
  ];

  // ----------------------------------------------------
  // Generate SINGLE, CONSOLIDATED Master sitemap.xml
  // contains static pages, products, team landings, team profiles, and images
  // ----------------------------------------------------
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Static Pages
  staticPages.forEach(page => {
    sitemapXml += `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
`;
    if (page.path === '') {
      sitemapXml += `    <image:image>
      <image:loc>${logoUrl}</image:loc>
      <image:title>Vishwa Aadhar Enterprises Logo</image:title>
    </image:image>
`;
    }
    sitemapXml += `  </url>\n`;
  });

  // Green-Tech Products
  products.forEach(p => {
    sitemapXml += `  <url>
    <loc>${SITE_URL}/products/${p.slug}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${escapeXml(p.image)}</image:loc>
      <image:title>${escapeXml(p.title)}</image:title>
      <image:caption>${escapeXml(p.caption)}</image:caption>
    </image:image>
  </url>\n`;
  });

  // Team Landing Sections
  teamLandingPaths.forEach(tUrl => {
    sitemapXml += `  <url>
    <loc>${SITE_URL}${tUrl.path}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${tUrl.priority}</priority>
  </url>\n`;
  });

  // Team Professional Profiles & Headshots
  localizedTeamMembers.forEach(member => {
    sitemapXml += `  <url>
    <loc>${SITE_URL}/team/${member.slug}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${escapeXml(member.finalImage)}</image:loc>
      <image:title>${escapeXml(member.name)} - ${escapeXml(member.position)}</image:title>
      <image:caption>${escapeXml(member.description)}</image:caption>
    </image:image>
  </url>\n`;
  });

  sitemapXml += `</urlset>`;

  // Write Master Unified Sitemap
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml.trim());

  // Clean redundant auxiliary sitemaps to prevent indexing confusion - "sab ek mei hi"
  const redundantFiles = [
    'sitemap-main.xml',
    'sitemap-products.xml',
    'sitemap-team.xml',
    'sitemap-images.xml',
    'sitemap-blog.xml',
    'sitemap-index.xml'
  ];
  redundantFiles.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  // ----------------------------------------------------
  // robots.txt pointing strictly to the Single Comprehensive sitemap.xml
  // ----------------------------------------------------
  const robotsTxtPath = path.join(PUBLIC_DIR, 'robots.txt');
  const robotsTxtContent = `User-agent: *
Allow: /
Disallow: /admin-panel/

# Unified Consolidated Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(robotsTxtPath, robotsTxtContent.trim());

  console.log('[Sitemap Generator] Master comprehensive unified sitemap generated successfully on own domain!');
}

run();
