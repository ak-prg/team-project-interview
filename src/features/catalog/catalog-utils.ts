import type { Product } from '../../types/catalog.types';
import type { Category } from '../../constants';

export type SortOrder = 'default' | 'asc' | 'desc';

export interface FilterParams {
  query: string;
  category: Category | 'all';
  minPrice: string;
  maxPrice: string;
}

export const filterProducts = (
  products: Product[],
  { query, category, minPrice, maxPrice }: FilterParams
): Product[] => {
  return products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    const matchesCategory = category === 'all' || product.category === category;

    const min = minPrice.trim() !== '' ? Number(minPrice) * 100 : null;
    const max = maxPrice.trim() !== '' ? Number(maxPrice) * 100 : null;

    const matchesMinPrice = min !== null ? product.price >= min : true;
    const matchesMaxPrice = max !== null ? product.price <= max : true;

    return (
      matchesQuery && matchesCategory && matchesMinPrice && matchesMaxPrice
    );
  });
};

export const sortProducts = (
  products: Product[],
  order: SortOrder
): Product[] => {
  if (order === 'default') {
    return [...products];
  }

  return [...products].sort((a, b) => {
    if (order === 'asc') return a.price - b.price;
    if (order === 'desc') return b.price - a.price;
    return 0;
  });
};
