import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './cartSlice';
import {
  calculateTotalAmount,
  calculateOrderTotal,
  getIncreasedQuantity,
  getDecreasedQuantity,
  formatPrice,
} from './cart-utils';
import { CartItemRow } from './CartItemRow';
import type { CartItem } from '../../types/cart.types';
import type { RootState } from '../../store';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const order = calculateOrderTotal(cart, promoCode);

  const handleIncrement = (item: CartItem) => {
    dispatch(
      updateQuantity({
        id: item.product.id,
        quantity: getIncreasedQuantity(item),
      })
    );
  };

  const handleDecrement = (item: CartItem) => {
    const quantity = getDecreasedQuantity(item);
    if (quantity > 0) {
      dispatch(updateQuantity({ id: item.product.id, quantity }));
    } else {
      dispatch(removeItem(item.product.id));
    }
  };

  const handleRemove = (item: CartItem) => {
    dispatch(removeItem(item.product.id));
  };

  const handleContinueShopping = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="cart">
      <h2 className="cart__title heading-text">
        Сумма корзины: {formatPrice(calculateTotalAmount(cart))}
      </h2>
      <div className="cart__list">
        {cart.map((item: CartItem) => (
          <CartItemRow
            key={item.product.id}
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <input
        className="cart__promo body-text"
        placeholder="Промокод"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <div className="cart__total">
        <p className="body-text">Скидка: −{formatPrice(order.discount)}</p>
        <p className="body-text">Доставка: {formatPrice(order.delivery)}</p>
        <p className="total-text">Итого: {formatPrice(order.total)}</p>
      </div>
      <div className="cart__actions">
        <button
          className="cart__button cart__button--continue action-text"
          onClick={() => handleContinueShopping()}
        >
          Продолжить покупки
        </button>
        <button
          className="cart__button cart__button--checkout action-text"
          disabled
          title="Скоро будет доступно"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};
