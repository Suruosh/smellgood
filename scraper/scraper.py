#!/usr/bin/env python3
"""
SmellGood scraper for bigbox.nu pocket perfume category.
Usage: python scraper.py --max-pages 10 --output data/products.json
"""

import argparse
import json
import os
import random
import re
import time
import urllib.robotparser
from pathlib import Path
from typing import Optional
from urllib.parse import urljoin, urlparse

import httpx
from bs4 import BeautifulSoup
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from tqdm import tqdm

BASE_URL = "https://www.bigbox.nu"
CATEGORY_URL = f"{BASE_URL}/parfym/pocket-perfyme/"
USER_AGENT = "SmellGoodBot/1.0 (Educational scraper; +https://smellgood.se)"

HEADERS = {
    "User-Agent": USER_AGENT,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "sv-SE,sv;q=0.9,en;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
}


def check_robots_txt(base_url: str, path: str) -> bool:
    """Check if scraping is allowed by robots.txt."""
    rp = urllib.robotparser.RobotFileParser()
    robots_url = urljoin(base_url, "/robots.txt")
    try:
        rp.set_url(robots_url)
        rp.read()
        return rp.can_fetch(USER_AGENT, urljoin(base_url, path))
    except Exception:
        return True  # Allow if robots.txt is unreachable


@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type((httpx.HTTPError, httpx.TimeoutException)),
)
def fetch_page(client: httpx.Client, url: str) -> Optional[str]:
    """Fetch a page with retry logic and rate limiting."""
    response = client.get(url, headers=HEADERS, follow_redirects=True, timeout=15)

    if response.status_code == 429:
        retry_after = int(response.headers.get("Retry-After", 60))
        print(f"\n⚠️  Rate limited. Waiting {retry_after}s...")
        time.sleep(retry_after)
        raise httpx.HTTPError(f"Rate limited, retry after {retry_after}s")

    response.raise_for_status()
    return response.text


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug."""
    import unicodedata
    text = unicodedata.normalize("NFD", text.lower())
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def make_sku(brand: str, name: str) -> str:
    """Generate SKU from brand and name."""
    brand_part = re.sub(r"[^A-Z0-9]", "", brand.upper())[:8]
    name_part = re.sub(r"[^A-Z0-9]", "", name.upper())[:12]
    return f"{brand_part}-{name_part}-10ML"


def parse_price(price_str: str) -> float:
    """Extract numeric price from string like '249 kr' or '249,00 kr'."""
    cleaned = re.sub(r"[^\d,.]", "", price_str)
    cleaned = cleaned.replace(",", ".")
    try:
        return float(cleaned)
    except ValueError:
        return 0.0


def parse_product_listing(html: str, base_url: str) -> list[dict]:
    """Parse product cards from a listing page."""
    soup = BeautifulSoup(html, "lxml")
    products = []

    # Try common product card selectors
    cards = (
        soup.select(".product-item") or
        soup.select(".product-card") or
        soup.select("article.product") or
        soup.select("[data-product-id]") or
        soup.select(".produktlista .produkt")
    )

    for card in cards:
        try:
            # Name
            name_el = (
                card.select_one(".product-name") or
                card.select_one(".product-title") or
                card.select_one("h2") or
                card.select_one("h3") or
                card.select_one(".namn")
            )
            name = name_el.get_text(strip=True) if name_el else ""
            if not name:
                continue

            # Brand
            brand_el = (
                card.select_one(".brand") or
                card.select_one(".product-brand") or
                card.select_one(".marke")
            )
            brand = brand_el.get_text(strip=True) if brand_el else "Okänt"

            # Price
            price_el = (
                card.select_one(".price") or
                card.select_one(".product-price") or
                card.select_one(".pris") or
                card.select_one("[data-price]")
            )
            price_text = price_el.get_text(strip=True) if price_el else "0"
            price = parse_price(price_text)

            # URL
            link_el = card.select_one("a[href]")
            product_url = urljoin(base_url, link_el["href"]) if link_el else ""

            # Image
            img_el = card.select_one("img")
            image_url = ""
            if img_el:
                image_url = img_el.get("data-src") or img_el.get("src") or ""
                if image_url and not image_url.startswith("http"):
                    image_url = urljoin(base_url, image_url)

            slug = slugify(f"{brand}-{name}")
            sku = make_sku(brand, name)

            products.append({
                "sku": sku,
                "slug": slug,
                "name": name,
                "brand": brand,
                "price": price,
                "sizeMl": 10.0,
                "concentration": "",
                "scentFamily": "",
                "description": "",
                "topNotes": "",
                "middleNotes": "",
                "baseNotes": "",
                "images": [image_url] if image_url else [],
                "stock": random.randint(5, 30),
                "available": True,
                "categories": ["parfym", "pocket-parfym"],
                "tags": [],
                "sourceUrl": product_url,
            })
        except Exception as e:
            continue

    return products


def parse_product_detail(html: str, product: dict) -> dict:
    """Enrich product with details from its own page."""
    soup = BeautifulSoup(html, "lxml")

    # Description
    desc_el = (
        soup.select_one(".product-description") or
        soup.select_one(".beskrivning") or
        soup.select_one("[itemprop='description']") or
        soup.select_one(".description")
    )
    if desc_el:
        product["description"] = desc_el.get_text(strip=True)[:1000]

    # Concentration (EDP/EDT etc.)
    full_text = soup.get_text(" ", strip=True).lower()
    for conc in ["eau de parfum", "edp", "eau de toilette", "edt", "parfum", "edc"]:
        if conc in full_text:
            mapping = {
                "eau de parfum": "EDP",
                "edp": "EDP",
                "eau de toilette": "EDT",
                "edt": "EDT",
                "parfum": "Parfum",
                "edc": "EDC",
            }
            product["concentration"] = mapping[conc]
            break

    # Notes
    notes_section = soup.select_one(".noter") or soup.select_one(".notes") or soup.select_one(".fragrance-notes")
    if notes_section:
        notes_text = notes_section.get_text(" ", strip=True)
        top_match = re.search(r"topp\w*\s*[:\-]?\s*([^.]+)", notes_text, re.I)
        if top_match:
            product["topNotes"] = top_match.group(1).strip()[:200]
        mid_match = re.search(r"hjärt\w*\s*[:\-]?\s*([^.]+)", notes_text, re.I)
        if mid_match:
            product["middleNotes"] = mid_match.group(1).strip()[:200]
        base_match = re.search(r"bas\w*\s*[:\-]?\s*([^.]+)", notes_text, re.I)
        if base_match:
            product["baseNotes"] = base_match.group(1).strip()[:200]

    # Additional images
    images = []
    for img in soup.select(".product-images img, .gallery img"):
        src = img.get("data-src") or img.get("src") or ""
        if src and not src.startswith("data:"):
            if not src.startswith("http"):
                src = urljoin(BASE_URL, src)
            if src not in images:
                images.append(src)
    if images:
        product["images"] = images

    return product


def get_next_page_url(html: str, current_url: str) -> Optional[str]:
    """Find the next page URL from pagination."""
    soup = BeautifulSoup(html, "lxml")

    next_el = (
        soup.select_one("a[rel='next']") or
        soup.select_one(".pagination .next a") or
        soup.select_one(".pager .nasta a") or
        soup.select_one("[aria-label='Nästa'] a") or
        soup.select_one(".next-page a")
    )

    if next_el and next_el.get("href"):
        return urljoin(current_url, next_el["href"])

    return None


def save_products(products: list[dict], output_path: str) -> None:
    """Save products to JSON file."""
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)


def main():
    parser = argparse.ArgumentParser(description="Scrape pocket perfumes from bigbox.nu")
    parser.add_argument("--max-pages", type=int, default=20, help="Maximum number of pages to scrape")
    parser.add_argument("--output", default="data/products.json", help="Output JSON file path")
    parser.add_argument("--detail", action="store_true", help="Fetch detail pages for each product")
    parser.add_argument("--delay-min", type=float, default=0.5, help="Minimum delay between requests (seconds)")
    parser.add_argument("--delay-max", type=float, default=1.5, help="Maximum delay between requests (seconds)")
    args = parser.parse_args()

    # Check robots.txt
    print("🤖 Checking robots.txt...")
    allowed = check_robots_txt(BASE_URL, "/parfym/pocket-perfyme/")
    if not allowed:
        print("❌ Scraping not allowed by robots.txt. Exiting.")
        return

    print(f"✅ Robots.txt allows scraping. Starting...")
    print(f"📦 Output: {args.output}")
    print(f"📄 Max pages: {args.max_pages}")

    all_products: list[dict] = []
    seen_skus: set[str] = set()
    current_url = CATEGORY_URL
    page_num = 0

    with httpx.Client(timeout=15.0) as client:
        while current_url and page_num < args.max_pages:
            page_num += 1
            print(f"\n📄 Page {page_num}: {current_url}")

            try:
                html = fetch_page(client, current_url)
                if not html:
                    break

                products = parse_product_listing(html, current_url)
                print(f"   Found {len(products)} products")

                for product in tqdm(products, desc="   Processing", leave=False):
                    if product["sku"] in seen_skus:
                        continue
                    seen_skus.add(product["sku"])

                    if args.detail and product.get("sourceUrl"):
                        try:
                            delay = random.uniform(args.delay_min, args.delay_max)
                            time.sleep(delay)
                            detail_html = fetch_page(client, product["sourceUrl"])
                            if detail_html:
                                product = parse_product_detail(detail_html, product)
                        except Exception as e:
                            print(f"\n   ⚠️  Failed to fetch detail for {product['name']}: {e}")

                    all_products.append(product)

                # Save incrementally
                save_products(all_products, args.output)

                # Find next page
                next_url = get_next_page_url(html, current_url)
                current_url = next_url

                if current_url:
                    delay = random.uniform(args.delay_min, args.delay_max)
                    time.sleep(delay)

            except Exception as e:
                print(f"\n❌ Error on page {page_num}: {e}")
                break

    print(f"\n✅ Scraped {len(all_products)} products total")
    print(f"💾 Saved to {args.output}")


if __name__ == "__main__":
    main()
