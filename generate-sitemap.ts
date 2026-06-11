import fs from "fs";
import path from "path";

// Helper function to recursively retrieve all files in a directory
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });
  return arrayOfFiles;
}

// Find component source file location to query lastmod modification time
function findComponentFile(elementName: string): string | null {
  const pagesDir = path.join(process.cwd(), "src", "pages");
  const componentsDir = path.join(process.cwd(), "src", "components");

  const pagePath = path.join(pagesDir, `${elementName}.tsx`);
  if (fs.existsSync(pagePath)) return pagePath;
  const pagePathTs = path.join(pagesDir, `${elementName}.ts`);
  if (fs.existsSync(pagePathTs)) return pagePathTs;

  const compPath = path.join(componentsDir, `${elementName}.tsx`);
  if (fs.existsSync(compPath)) return compPath;
  const compPathTs = path.join(componentsDir, `${elementName}.ts`);
  if (fs.existsSync(compPathTs)) return compPathTs;

  return null;
}

// Filter out development, private, auth, or test route paths
function shouldIncludeRoute(routePath: string): boolean {
  if (!routePath || routePath === "*") return false;
  if (routePath.includes("*")) return false;

  const excludedPatterns = [
    /admin/i,
    /dev/i,
    /test/i,
    /private/i,
    /auth/i,
    /login/i,
    /signup/i,
    /callback/i,
    /draft/i,
    /temp/i,
    /broken/i,
    /sitemap/i
  ];

  for (const pattern of excludedPatterns) {
    if (pattern.test(routePath)) {
      return false;
    }
  }

  return true;
}

// Expand path parameters like ':productId' into actual product slugs
function expandRoute(routePath: string, discoveredSlugs: string[]): string[] {
  if (!routePath.includes(":")) {
    return [routePath];
  }

  const segments = routePath.split("/");
  const paramIndices = segments
    .map((seg, idx) => (seg.startsWith(":") ? idx : -1))
    .filter((idx) => idx !== -1);

  if (paramIndices.length === 0) {
    return [routePath];
  }

  // Handle single parameter replacement (common case)
  if (paramIndices.length === 1) {
    const idx = paramIndices[0];
    return discoveredSlugs.length > 0
      ? discoveredSlugs.map((slug) => {
          const copy = [...segments];
          copy[idx] = slug;
          return copy.join("/");
        })
      : [routePath.replace(/:[^/]+/g, "unknown")];
  }

  // Handle multiple parameters
  const expanded: string[] = [];
  discoveredSlugs.forEach((slug) => {
    const copy = [...segments];
    paramIndices.forEach((pIdx) => {
      copy[pIdx] = slug;
    });
    expanded.push(copy.join("/"));
  });
  return expanded;
}

// Calculate the precise lastmod date using file mtime or full system fallback
function getRouteLastmod(routePath: string, elementName: string | null): string {
  let latestMtime = 0;

  if (elementName) {
    const compFile = findComponentFile(elementName);
    if (compFile) {
      latestMtime = Math.max(latestMtime, fs.statSync(compFile).mtimeMs);
    }
  }

  // Check constants.tsx for product database-specific updates
  if (routePath.includes("/products/")) {
    const constantsFile = path.join(process.cwd(), "src", "constants.tsx");
    if (fs.existsSync(constantsFile)) {
      latestMtime = Math.max(latestMtime, fs.statSync(constantsFile).mtimeMs);
    }
  }

  // Overall layout updates
  const appFile = path.join(process.cwd(), "src", "App.tsx");
  if (fs.existsSync(appFile)) {
    latestMtime = Math.max(latestMtime, fs.statSync(appFile).mtimeMs);
  }

  const dateObj = latestMtime > 0 ? new Date(latestMtime) : new Date();
  return dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
}

// Assign priorities and change frequencies intelligently based on path depth
function getRouteMeta(routePath: string) {
  if (routePath === "/") {
    return { priority: "1.0", changefreq: "daily" };
  }

  const isTopLevel = ["/about", "/products", "/gallery", "/contact", "/certifications"].includes(routePath);
  if (isTopLevel) {
    return { priority: "0.8", changefreq: "weekly" };
  }

  return { priority: "0.6", changefreq: "weekly" };
}

// Scans components and files dynamically to construct the virtual sitemap routes
function scanRoutes() {
  const appFilePath = path.join(process.cwd(), "src", "App.tsx");
  if (!fs.existsSync(appFilePath)) {
    return [];
  }

  const appContent = fs.readFileSync(appFilePath, "utf-8");

  // Filter comments to prevent disabled paths from showing up
  const cleanContent = appContent
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*/g, "");

  const routeRegex = /<Route\s+[^>]*>/g;
  let match;
  const rawRoutes: { path: string; element: string | null }[] = [];

  while ((match = routeRegex.exec(cleanContent)) !== null) {
    const routeTag = match[0];
    const pathMatch = routeTag.match(/path=["']([^"']+)["']/);
    const elementMatch = routeTag.match(/element=\{<([^/\s>]+)/);

    if (pathMatch) {
      rawRoutes.push({
        path: pathMatch[1],
        element: elementMatch ? elementMatch[1] : null,
      });
    }
  }

  // Discover all dynamically registered slugs across the source directory
  const slugs: string[] = [];
  try {
    const allSrcFiles = getAllFiles(path.join(process.cwd(), "src"));
    allSrcFiles.forEach((file) => {
      if (file.endsWith(".tsx") || file.endsWith(".ts") || file.endsWith(".json")) {
        const fileContent = fs.readFileSync(file, "utf-8");
        const slugMatches = fileContent.matchAll(/\bslug\s*:\s*['"']([^'"]+)['"']/g);
        for (const slugMatch of slugMatches) {
          if (slugMatch[1] && !slugs.includes(slugMatch[1])) {
            slugs.push(slugMatch[1]);
          }
        }
      }
    });
  } catch (err) {
    console.error("Error scanning for dynamic slugs:", err);
  }

  const finalUrls = new Set<string>();
  const results: { url: string; lastmod: string; priority: string; changefreq: string }[] = [];

  rawRoutes.forEach((route) => {
    if (!shouldIncludeRoute(route.path)) return;

    const expandedPaths = expandRoute(route.path, slugs);

    expandedPaths.forEach((p) => {
      let normalizedPath = p;
      if (!normalizedPath.startsWith("/")) {
        normalizedPath = "/" + normalizedPath;
      }
      if (normalizedPath.endsWith("/") && normalizedPath.length > 1) {
        normalizedPath = normalizedPath.slice(0, -1);
      }

      if (!finalUrls.has(normalizedPath)) {
        finalUrls.add(normalizedPath);
        const lastmod = getRouteLastmod(normalizedPath, route.element);
        const meta = getRouteMeta(normalizedPath);
        results.push({
          url: normalizedPath,
          lastmod,
          priority: meta.priority,
          changefreq: meta.changefreq,
        });
      }
    });
  });

  return results;
}

// Generate legal XML mapping of available sitemap routes
function generateSitemapXml(baseUrl: string): string {
  const routes = scanRoutes();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  routes.forEach((route) => {
    const fullLoc = `${baseUrl}${route.url}`;
    xml += '  <url>\n';
    xml += `    <loc>${fullLoc}</loc>\n`;
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += "</urlset>";
  return xml;
}

function run() {
  const baseUrl = "https://vishwaaadhar.com";
  console.log("Generating sitemap.xml & robots.txt...");

  const xmlContent = generateSitemapXml(baseUrl);
  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xmlContent, "utf-8");
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsContent, "utf-8");

  console.log("Sitemap and robots.txt written successfully to public/!");
}

run();
