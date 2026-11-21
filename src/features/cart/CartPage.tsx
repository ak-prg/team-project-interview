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
import CartItemRow from './CartItemRow';
import type { CartItem } from '../../types/cart.types';
import type { RootState } from '../../store';
import './CartPage.css';

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
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

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // TODO - redirect to catalog
  const handleContinueShopping = () => {
    return;
  };

  return (
    <div className="cart">
      <h2 className="cart__title">
        Total Cart Amount: ${formatPrice(calculateTotalAmount(cart))}
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
        className="cart__promo"
        placeholder="Promo code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <div className="cart__total">
        <p>Discount: −${formatPrice(order.discount)}</p>
        <p>Delivery: ${formatPrice(order.delivery)}</p>
        <p>Total: ${formatPrice(order.total)}</p>
      </div>
      <div className="cart__actions">
        <button
          className="cart__button cart__button--continue"
          onClick={() => handleContinueShopping()}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="cart__button cart__button--checkout"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
