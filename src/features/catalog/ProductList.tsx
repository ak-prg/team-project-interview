import { ProductCard } from './ProductCard';
import type { Product } from '../../types/catalog.types';
import parts from './parts.json';
import './ProductList.css';

const products = parts as Product[];

export const ProductList = () => {
  return (
    <div className="product-list">
      <h2 className="product-list__title heading-text">ЗАПЧАСТИ</h2>

      <div className="product-list__items">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
