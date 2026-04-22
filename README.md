# Royal A-ware Product Catalog

Mobile-first product catalog for Royal A-ware sales representatives. Built with Next.js 14 (App Router), Tailwind CSS, and Airtable as the data source.

## Quick start

```bash
cd royal-aware-catalog
npm install

# Copy the env template and fill in your credentials
cp .env.local.example .env.local

npm run dev
# → http://localhost:3000
```

## Environment variables

| Variable | Description |
|---|---|
| `AIRTABLE_TOKEN` | Personal Access Token from airtable.com/account |
| `AIRTABLE_BASE_ID` | Found in the Airtable API docs for your base (starts with `app`) |

## Airtable field mapping

The app reads the **Products** table. Field names must match exactly (case-sensitive):

| Airtable field | Type | Notes |
|---|---|---|
| `Name` | Single line text | Product name |
| `Product Category` | Single select | Packaged Cheese / Whole Packed / Processed & Smoked / Dried Cheese / Cream |
| `Sub Category` | Single line text | Shown as badge on card |
| `Cheese Type` | Single line text | Searched, shown on card |
| `Age / Ripening` | Single line text | Detail view spec |
| `Formats / Weights` | Single line text | Shown on card + detail |
| `Retail` | Checkbox | Channel filter |
| `Export` | Checkbox | Channel filter |
| `Foodservice` | Checkbox | Channel filter |
| `Food Industry` | Checkbox | Channel filter |
| `Brand` | Single line text | Detail view spec |
| `Packaging Type` | Single line text | Detail view spec |
| `Shelf Life` | Single line text | Detail view spec |
| `Certifications` | Multiple select | Shown as chips |
| `Applications` | Long text | Detail view section |
| `Description EN` | Long text | Detail view section |
| `Photo` | Attachment | Card + detail hero image |
| `Active` | Checkbox | **Only checked records are shown** |

## Routes

| Route | Description |
|---|---|
| `/` | Catalog with search and filter chips |
| `/product/[id]` | Full product detail, shareable URL |

## Caching

Products are fetched server-side with `revalidate: 3600` (1 hour). To force a refresh in production, trigger an [on-demand revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation-with-revalidatepath) or re-deploy.

## Deploy to Vercel

```bash
npm i -g vercel
vercel deploy
```

Set `AIRTABLE_TOKEN` and `AIRTABLE_BASE_ID` in the Vercel project environment variables (Project Settings → Environment Variables). Do **not** commit `.env.local`.

## Design tokens

| Token | Value | Usage |
|---|---|---|
| Navy `#1C2B4A` | `navy-600` | Header, primary buttons, nav |
| Amber `#C4973A` | `amber-500` | Accent, category chips |

## What's not built yet (by design)

- Authentication / login
- Admin / edit interface  
- Language switcher (EN field structure is prepared)
- PDF generation
