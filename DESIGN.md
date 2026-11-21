# Structure

```
src/
├── index.html      ← entry page (Vite root is src/)
├── main.tsx        ← index.html points here (/main.tsx)
├── App.tsx         ← layout: Header, main (router outlet), Footer
├── store.ts        ← configureStore + RootState
├── constants.ts    ← promo code, discount, delivery
├── types/
│   ├── cart.types.ts
│   └── catalog.types.ts
└── features/
    ├── core/
    ├── about/
    ├── catalog/
    └── cart/
```

```
features/
├── core/
│   ├── Header.tsx
│   └── Footer.tsx
│
├── about/
│   ├── AboutPage.tsx
│   └── AboutPage.css
│
├── catalog/
│   ├── CatalogPage.tsx
│   ├── CatalogPage.css
│   ├── CategorySection.tsx
│   ├── CategorySection.css
│   ├── PartCard.tsx
│   ├── PartCard.css
│   └── parts.json
│
└── cart/
    ├── CartPage.tsx
    ├── CartPage.css
    ├── CartItemRow.tsx
    ├── CartItemRow.css
    ├── cartSlice.ts
    ├── cart-utils.ts
    └── cart-utils.test.ts
```
