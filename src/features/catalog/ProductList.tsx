import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../cart/cartSlice';
import { ROUTES } from '../../routes';
import type { Product } from '../../types/catalog.types';
import parts from './parts.json';

const products: Product[] = parts;

export const ProductList = () => {
  const dispatch = useDispatch();

  const handleAdd = (product: Product) => {
    dispatch(addItem(product));
  };

  // Buttons for testing the cart - delete after catalog implementation
  const firstProduct = products[1];
  const navigate = useNavigate();
  const handleGoToCart = () => {
    navigate(ROUTES.CART);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => firstProduct && handleAdd(firstProduct)}
      >
        Add to cart
      </button>
      <button type="button" onClick={handleGoToCart}>
        Go to cart
      </button>
    </>
  );
};
