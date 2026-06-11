---
type: page-note
status: active
owner: Eddie Amintohir
route: /[locale]/products
sanity_documents: [product, productCategory]
components: [ProductFilters, ProductsGrid, ProductDetail]
priority: high
tags: [page, products, sanity]
updated: 2026-05-22
---

# Products

Product listing and detail content should come from Studio-managed `product` and `productCategory` records. Product filters should use Studio category labels/icons/order rather than hardcoded taxonomy.

| Concern | File |
|---|---|
| Listing route | `src/app/[locale]/products/page.tsx` |
| Detail route | `src/app/[locale]/products/[handle]/page.tsx` |
| Product grid | `src/components/products/ProductsGrid.tsx` |
| Filters | `src/components/products/ProductFilters.tsx` |
| Product detail | `src/components/products/ProductDetail.tsx` |
| Schemas | `sanity/schemas/product.ts`, `sanity/schemas/productCategory.ts` |
