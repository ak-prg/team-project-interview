import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './cartSlice';
import {
  calculateCartSubtotal,
  calculateOrderTotal,
  getIncreasedQuantity,
  getDecreasedQuantity,
  formatPrice,
  isPromoCodeValid,
} from './cart-utils';
import { CartItemRow } from './CartItemRow';
import type { CartItem } from '../../types/cart.types';
import type { RootState } from '../../store';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { DISCOUNT_PERCENT, PROMO_MIN_SUBTOTAL } from '../../constants';

export const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const order = calculateOrderTotal(cart, promoCode);
  const isEmpty = cart.length === 0;
  let promoMessage = '';
  let promoStatus = '';

  if (promoCode.trim()) {
    if (!isPromoCodeValid(promoCode)) {
      promoMessage = 'Промокод не найден';
      promoStatus = 'error';
    } else if (order.discount > 0) {
      promoMessage = `Скидка ${DISCOUNT_PERCENT}% применена`;
      promoStatus = 'success';
    } else {
      promoMessage = `Промокод действует при заказе от ${formatPrice(PROMO_MIN_SUBTOTAL)}`;
      promoStatus = 'info';
    }
  }

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
    navigate(ROUTES.CATALOG);
  };

  return (
    <div className="cart">
      <h2 className="cart__title heading-text">
        {isEmpty
          ? 'Корзина пуста'
          : `Сумма корзины: ${formatPrice(calculateCartSubtotal(cart))}`}
      </h2>

      {!isEmpty && (
        <>
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
          <p
            className={`cart__promo-message body-text${promoStatus ? ` cart__promo-message--${promoStatus}` : ''}`}
            role="status"
          >
            {promoMessage}
          </p>
        </>
      )}

      <div className="cart__total">
        {!isEmpty && (
          <>
            <p className="body-text">Скидка: −{formatPrice(order.discount)}</p>
            <p className="body-text">Доставка: {formatPrice(order.delivery)}</p>
          </>
        )}
        <p className="total-text">Итого: {formatPrice(order.total)}</p>
      </div>

      <div className="cart__actions">
        <button
          className="cart__button cart__button--continue action-text"
          onClick={() => handleContinueShopping()}
        >
          Продолжить покупки
        </button>
        {!isEmpty && (
          <button
            className="cart__button cart__button--checkout action-text"
            disabled
            title="Скоро будет доступно"
          >
            Оформить заказ
          </button>
        )}
      </div>
    </div>
  );
};
