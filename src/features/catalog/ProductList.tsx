import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Pagination } from '../../components/pagination/Pagination';
import type { Product } from '../../types/catalog.types';
import parts from './parts.json';
import './ProductList.css';

const products = parts as Product[];
const ITEMS_PER_PAGE = 10;

export const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="product-list">
      <h2 className="product-list__title heading-text">ЗАПЧАСТИ</h2>

      <div className="product-list__items">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
