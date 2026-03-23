#!/usr/bin/env python3
"""
Import products from JSON file into SmellGood SQLite database.
Usage: python import_products.py --input data/products.json --db ../dev.db
"""

import argparse
import json
import sqlite3
import sys
from datetime import datetime, timezone
from pathlib import Path


def slugify(text: str) -> str:
    import unicodedata
    import re
    text = unicodedata.normalize("NFD", text.lower())
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def load_products(input_path: str) -> list[dict]:
    """Load products from JSON file."""
    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, list):
        return data
    return data.get("products", [])


def ensure_unique_slug(slug: str, existing_slugs: set[str]) -> str:
    """Make slug unique by appending a counter if needed."""
    if slug not in existing_slugs:
        return slug
    counter = 1
    while f"{slug}-{counter}" in existing_slugs:
        counter += 1
    return f"{slug}-{counter}"


def upsert_product(cursor: sqlite3.Cursor, product: dict, existing_slugs: set[str]) -> str:
    """Insert or update a product. Returns the final slug used."""
    now = datetime.now(timezone.utc).isoformat()

    slug = product.get("slug") or slugify(f"{product.get('brand', '')}-{product.get('name', '')}")
    slug = ensure_unique_slug(slug, existing_slugs)
    existing_slugs.add(slug)

    images = product.get("images", [])
    categories = product.get("categories", [])
    tags = product.get("tags", [])

    cursor.execute("""
        INSERT INTO Product (
            sku, slug, name, brand, description, price, currency,
            sizeMl, concentration, scentFamily, topNotes, middleNotes, baseNotes,
            images, stock, available, categories, tags, sourceUrl, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(sku) DO UPDATE SET
            slug = excluded.slug,
            name = excluded.name,
            brand = excluded.brand,
            description = excluded.description,
            price = excluded.price,
            currency = excluded.currency,
            sizeMl = excluded.sizeMl,
            concentration = excluded.concentration,
            scentFamily = excluded.scentFamily,
            topNotes = excluded.topNotes,
            middleNotes = excluded.middleNotes,
            baseNotes = excluded.baseNotes,
            images = excluded.images,
            stock = excluded.stock,
            available = excluded.available,
            categories = excluded.categories,
            tags = excluded.tags,
            sourceUrl = excluded.sourceUrl,
            updatedAt = excluded.updatedAt
    """, (
        product.get("sku", ""),
        slug,
        product.get("name", ""),
        product.get("brand", ""),
        product.get("description", ""),
        float(product.get("price", 0)),
        product.get("currency", "SEK"),
        float(product.get("sizeMl", 10)),
        product.get("concentration", ""),
        product.get("scentFamily", ""),
        product.get("topNotes", ""),
        product.get("middleNotes", ""),
        product.get("baseNotes", ""),
        json.dumps(images if isinstance(images, list) else [], ensure_ascii=False),
        int(product.get("stock", 0)),
        1 if product.get("available", True) else 0,
        json.dumps(categories if isinstance(categories, list) else [], ensure_ascii=False),
        json.dumps(tags if isinstance(tags, list) else [], ensure_ascii=False),
        product.get("sourceUrl", ""),
        now,
        now,
    ))
    return slug


def main():
    parser = argparse.ArgumentParser(description="Import products from JSON to SQLite database")
    parser.add_argument("--input", default="data/products.json", help="Input JSON file")
    parser.add_argument("--db", default="../dev.db", help="SQLite database path")
    parser.add_argument("--dry-run", action="store_true", help="Parse without saving")
    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.exists():
        print(f"❌ Input file not found: {input_path}")
        sys.exit(1)

    db_path = Path(args.db)
    if not db_path.exists() and not args.dry_run:
        print(f"❌ Database not found: {db_path}")
        print("   Run 'npx prisma migrate dev' first to create the database.")
        sys.exit(1)

    print(f"📂 Loading products from {input_path}...")
    products = load_products(str(input_path))
    print(f"   Found {len(products)} products")

    if args.dry_run:
        print("✅ Dry run complete – no changes made")
        for p in products[:3]:
            print(f"   Sample: {p.get('brand')} – {p.get('name')} ({p.get('price')} SEK)")
        return

    print(f"🗄️  Connecting to database: {db_path}")
    conn = sqlite3.connect(str(db_path))
    conn.execute("PRAGMA journal_mode=WAL")
    cursor = conn.cursor()

    # Get existing slugs to ensure uniqueness
    cursor.execute("SELECT slug FROM Product")
    existing_slugs = {row[0] for row in cursor.fetchall()}

    inserted = 0
    updated = 0
    errors = 0

    print(f"⬆️  Upserting {len(products)} products...")
    for i, product in enumerate(products):
        try:
            sku = product.get("sku", "")
            cursor.execute("SELECT id FROM Product WHERE sku = ?", (sku,))
            exists = cursor.fetchone() is not None

            upsert_product(cursor, product, existing_slugs)

            if exists:
                updated += 1
            else:
                inserted += 1

            if (i + 1) % 50 == 0:
                conn.commit()
                print(f"   Progress: {i + 1}/{len(products)} ({inserted} new, {updated} updated)")

        except Exception as e:
            errors += 1
            print(f"   ⚠️  Error for product '{product.get('name', 'unknown')}': {e}")
            conn.rollback()

    conn.commit()
    conn.close()

    print(f"\n✅ Import complete!")
    print(f"   ➕ Inserted: {inserted}")
    print(f"   🔄 Updated:  {updated}")
    print(f"   ❌ Errors:   {errors}")


if __name__ == "__main__":
    main()
