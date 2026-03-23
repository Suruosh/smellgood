/**
 * BigBox.nu Product Scraper for SmellGood
 *
 * This script scrapes perfume products from bigbox.nu and outputs them
 * in a format compatible with the SmellGood store.
 *
 * Prerequisites:
 *   npm install cheerio node-fetch
 *
 * Usage:
 *   npx ts-node scripts/scrape-bigbox.ts
 *
 * Note: You may need to adjust the selectors based on the actual bigbox.nu
 * HTML structure. Inspect the website to verify CSS selectors.
 */

import * as fs from 'fs';
import * as path from 'path';

interface ScrapedProduct {
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'men' | 'women' | 'unisex';
  size: string;
  url: string;
}

// Configuration - adjust these based on actual bigbox.nu structure
const CONFIG = {
  baseUrl: 'https://bigbox.nu',
  // Update these paths based on actual site structure
  categoryPaths: {
    men: '/kategori/herr-parfym',
    women: '/kategori/dam-parfym',
    unisex: '/kategori/unisex-parfym',
  },
  // CSS Selectors - update these based on actual site HTML
  selectors: {
    productCard: '.product-card, .product-item, .woocommerce-LoopProduct-link',
    productName: '.product-title, .woocommerce-loop-product__title, h2',
    productPrice: '.price, .product-price',
    productOriginalPrice: '.price del, .original-price',
    productSalePrice: '.price ins, .sale-price',
    productImage: 'img',
    productLink: 'a',
    pagination: '.pagination a, .page-numbers a',
    // Detail page selectors
    detailDescription: '.product-description, .woocommerce-product-details__short-description',
    detailBrand: '.product-brand, .brand',
    detailSize: '.product-size, .size',
    detailNotes: '.fragrance-notes, .product-notes',
  },
};

async function fetchPage(url: string): Promise<string> {
  // Dynamic import for node-fetch (ESM)
  const fetchModule = await import('node-fetch');
  const fetch = fetchModule.default;

  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function scrapeProductList(
  categoryUrl: string,
  category: 'men' | 'women' | 'unisex',
): Promise<ScrapedProduct[]> {
  const cheerioModule = await import('cheerio');
  const products: ScrapedProduct[] = [];

  console.log(`Scraping ${categoryUrl}...`);
  const html = await fetchPage(categoryUrl);
  const $ = cheerioModule.load(html);

  $(CONFIG.selectors.productCard).each((_i, el) => {
    const $el = $(el);
    const name = $el.find(CONFIG.selectors.productName).text().trim();
    const link = $el.find(CONFIG.selectors.productLink).attr('href') ?? '';
    const image = $el.find(CONFIG.selectors.productImage).attr('src') ?? '';

    // Parse price
    const salePriceText = $el.find(CONFIG.selectors.productSalePrice).text().trim();
    const originalPriceText = $el.find(CONFIG.selectors.productOriginalPrice).text().trim();
    const priceText = salePriceText || $el.find(CONFIG.selectors.productPrice).text().trim();

    const price = parseSwedishPrice(priceText);
    const originalPrice = originalPriceText ? parseSwedishPrice(originalPriceText) : undefined;

    if (name && price) {
      products.push({
        name,
        brand: extractBrand(name),
        description: '',
        price,
        originalPrice,
        image: image.startsWith('http') ? image : `${CONFIG.baseUrl}${image}`,
        category,
        size: '25ml pocket',
        url: link.startsWith('http') ? link : `${CONFIG.baseUrl}${link}`,
      });
    }
  });

  // Check for pagination
  const nextPage = $(CONFIG.selectors.pagination).last().attr('href');
  if (nextPage && !nextPage.includes('current')) {
    const nextUrl = nextPage.startsWith('http') ? nextPage : `${CONFIG.baseUrl}${nextPage}`;
    const moreProducts = await scrapeProductList(nextUrl, category);
    products.push(...moreProducts);
  }

  return products;
}

async function scrapeProductDetail(product: ScrapedProduct): Promise<ScrapedProduct> {
  const cheerioModule = await import('cheerio');

  try {
    const html = await fetchPage(product.url);
    const $ = cheerioModule.load(html);

    const description = $(CONFIG.selectors.detailDescription).text().trim();
    const brand = $(CONFIG.selectors.detailBrand).text().trim();
    const size = $(CONFIG.selectors.detailSize).text().trim();

    return {
      ...product,
      description: description || product.description,
      brand: brand || product.brand,
      size: size || product.size,
    };
  } catch (error) {
    console.warn(`Failed to scrape details for ${product.name}: ${error}`);
    return product;
  }
}

function parseSwedishPrice(priceStr: string): number {
  // Handle Swedish price formats: "299 kr", "299:-", "299,00 kr", "SEK 299"
  const cleaned = priceStr
    .replace(/[^0-9,.\s]/g, '')
    .replace(',', '.')
    .trim();
  const match = cleaned.match(/(\d+(?:\.\d+)?)/);
  return match ? Math.round(parseFloat(match[1])) : 0;
}

function extractBrand(productName: string): string {
  // Common perfume brands - try to extract from product name
  const brands = [
    'Dior', 'Chanel', 'Versace', 'Armani', 'Paco Rabanne', 'Tom Ford',
    'Yves Saint Laurent', 'YSL', 'Hugo Boss', 'Calvin Klein', 'Dolce & Gabbana',
    'Gucci', 'Prada', 'Burberry', 'Valentino', 'Hermès', 'Creed',
    'Byredo', 'Le Labo', 'Jo Malone', 'Marc Jacobs', 'Viktor & Rolf',
    'Lancôme', 'Givenchy', 'Bvlgari', 'Kenzo', 'Issey Miyake',
    'Carolina Herrera', 'Ralph Lauren', 'Michael Kors', 'Coach',
    'Narciso Rodriguez', 'Thierry Mugler', 'Jean Paul Gaultier',
  ];

  for (const brand of brands) {
    if (productName.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }

  // Fallback: use first word(s) before common separators
  const parts = productName.split(/[-–—|]/);
  return parts[0].trim();
}

function generateProductId(brand: string, name: string, index: number): string {
  const slug = `${brand}-${name}`
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${slug}-${index}`;
}

async function main() {
  console.log('🔍 SmellGood BigBox.nu Scraper');
  console.log('================================\n');

  const allProducts: ScrapedProduct[] = [];

  for (const [category, categoryPath] of Object.entries(CONFIG.categoryPaths)) {
    const url = `${CONFIG.baseUrl}${categoryPath}`;
    try {
      const products = await scrapeProductList(url, category as 'men' | 'women' | 'unisex');
      console.log(`  ✓ ${category}: ${products.length} products found`);
      allProducts.push(...products);
    } catch (error) {
      console.error(`  ✗ ${category}: Failed to scrape - ${error}`);
    }
  }

  console.log(`\nTotal products found: ${allProducts.length}`);

  if (allProducts.length === 0) {
    console.log('\n⚠️  No products found. Please check:');
    console.log('  1. The bigbox.nu website is accessible');
    console.log('  2. The category paths in CONFIG are correct');
    console.log('  3. The CSS selectors match the website structure');
    console.log('\nTip: Visit bigbox.nu in a browser and inspect the HTML');
    console.log('to update the selectors in this script.');
    return;
  }

  // Scrape details for each product (with rate limiting)
  console.log('\nScraping product details...');
  for (let i = 0; i < allProducts.length; i++) {
    allProducts[i] = await scrapeProductDetail(allProducts[i]);
    // Rate limit: wait 500ms between requests
    await new Promise((resolve) => setTimeout(resolve, 500));
    if ((i + 1) % 10 === 0) {
      console.log(`  Progress: ${i + 1}/${allProducts.length}`);
    }
  }

  // Generate TypeScript output
  const tsOutput = generateTypeScriptOutput(allProducts);
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'scraped-products.ts');
  fs.writeFileSync(outputPath, tsOutput);
  console.log(`\n✅ Products saved to ${outputPath}`);
  console.log(`   Total: ${allProducts.length} products`);

  // Also save raw JSON
  const jsonPath = path.join(__dirname, '..', 'src', 'data', 'scraped-products.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allProducts, null, 2));
  console.log(`   JSON backup: ${jsonPath}`);
}

function generateTypeScriptOutput(products: ScrapedProduct[]): string {
  const lines: string[] = [
    "import { Product } from '@/lib/types';",
    '',
    '// Auto-generated from bigbox.nu scraper',
    `// Generated at: ${new Date().toISOString()}`,
    `// Total products: ${products.length}`,
    '',
    'export const scrapedProducts: Product[] = [',
  ];

  products.forEach((p, i) => {
    lines.push('  {');
    lines.push(`    id: '${generateProductId(p.brand, p.name, i + 1)}',`);
    lines.push(`    name: '${escapeString(p.name)}',`);
    lines.push(`    brand: '${escapeString(p.brand)}',`);
    lines.push(`    description: '${escapeString(p.description || `${p.brand} ${p.name} i praktiskt pocketformat.`)}',`);
    lines.push(`    price: ${p.price},`);
    if (p.originalPrice) {
      lines.push(`    originalPrice: ${p.originalPrice},`);
    }
    lines.push(`    image: '${escapeString(p.image)}',`);
    lines.push(`    category: '${p.category}',`);
    lines.push(`    size: '${p.size}',`);
    lines.push('    notes: { top: [], middle: [], base: [] },');
    lines.push(`    rating: ${(3.5 + Math.random() * 1.5).toFixed(1)},`);
    lines.push('    inStock: true,');
    lines.push('  },');
  });

  lines.push('];');
  return lines.join('\n');
}

function escapeString(str: string): string {
  return str.replace(/'/g, "\\'").replace(/\n/g, ' ').trim();
}

main().catch(console.error);
