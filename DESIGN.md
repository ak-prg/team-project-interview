# Structure

```
src/
├── main.tsx        ← index.html points here (/src/main.tsx)
├── App.tsx         ← routes
├── store.ts        ← configureStore + typed hooks
├── Header.tsx
├── CartIcon.tsx
├── features/
│   ├── about/
│   ├── catalog/
│   └── cart/
└── types/
features/
├── about/
│   ├── AboutPage.tsx
│   └── AboutPage.module.css
│
├── catalog/
│   ├── CatalogPage.tsx
│   ├── CatalogPage.module.css
│   ├── CategorySection.tsx
│   ├── CategorySection.module.css
│   ├── PartCard.tsx
│   ├── PartCard.module.css
│   └── parts.json
│
└── cart/
    ├── CartPage.tsx
    ├── CartPage.module.css
    ├── CartItemRow.tsx
    ├── CartItemRow.module.css
    ├── cartSlice.ts
    ├── cartUtils.ts
    └── cartUtils.test.ts
```
