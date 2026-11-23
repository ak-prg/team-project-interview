import type { CartItemRowProps } from '../../types/cart.types';
import { calculateTotalPrice, formatPrice } from './cart-utils';

export function CartItemRow({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className="cart-item">
      <img
        className="cart-item__image"
        src={item.product.images[0] ?? ''}
        alt={item.product.name}
      />
      <div className="cart-item__details">
        <div className="cart-item__name">{item.product.name}</div>
        <div className="cart-item__price">
          ${formatPrice(item.product.price)}
        </div>
        <div className="cart-item__quantity">
          <button
            className="cart-item__button cart-item__button--decrement"
            onClick={() => onDecrement(item)}
          >
            -
          </button>
          <span className="cart-item__quantity-value">{item.quantity}</span>
          <button
            className="cart-item__button cart-item__button--increment"
            onClick={() => onIncrement(item)}
          >
            +
          </button>
        </div>
        <div className="cart-item__total">
          Total: ${formatPrice(calculateTotalPrice(item))}
        </div>
        <button className="cart-item__delete" onClick={() => onRemove(item)}>
          Delete
        </button>
      </div>
    </div>
  );
}
