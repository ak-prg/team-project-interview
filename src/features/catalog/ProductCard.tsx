import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../cart/cartSlice';
import { formatPrice } from '../cart/cart-utils';
import type { Product } from '../../types/catalog.types';
import type { RootState } from '../../store';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const isOutOfStock = product.stock === 0;
  const isMaxStockReached = quantityInCart >= product.stock;

  const isButtonDisabled = isOutOfStock || isMaxStockReached;

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const imageSrc = product.images?.[0] || '';

  const productDetails = [
    { label: 'Артикул:', value: product.partNumber },
    { label: 'Производитель:', value: product.producer },
    { label: 'Оригинальный номер:', value: product.origNumber },
    { label: 'Категория:', value: product.category },
    { label: 'Количество:', value: product.stock },
  ];

  let buttonText = 'В корзину';
  if (isOutOfStock) {
    buttonText = 'Нет в наличии';
  } else if (isMaxStockReached) {
    buttonText = `В корзине ${product.stock} шт.`;
  } else if (quantityInCart > 0) {
    buttonText = `В корзине ${quantityInCart} шт.`;
  }

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        {imageSrc ? (
          <img
            className="product-card__image"
            src={imageSrc}
            alt={product.name}
          />
        ) : (
          <div className="product-card__image-placeholder">Нет фото</div>
        )}
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title title-text">{product.name}</h3>

        <div className="product-card__info body-text">
          {productDetails.map((detail) => (
            <div className="product-card__info-row" key={detail.label}>
              <span className="product-card__label">{detail.label}</span>
              <span className="product-card__value">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="product-card__aside">
        <div className="product-card__price">
          <span className="product-card__label">Цена с НДС:</span>
          <span className="product-card__price-value title-text">
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          className="product-card__button action-text"
          onClick={handleAddToCart}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
};
