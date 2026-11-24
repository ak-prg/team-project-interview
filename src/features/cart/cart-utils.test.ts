import { describe, test, expect } from 'vitest';

import {
  calculateTotalAmount,
  calculateTotalPrice,
  canIncreaseQuantity,
  getIncreasedQuantity,
  getDecreasedQuantity,
  calculateTotalQuantity,
  isInCart,
  formatPrice,
  validateQuantity,
  calculateCartSubtotal,
  calculateOrderTotal,
} from './cart-utils';

import {
  PROMO_CODE,
  DISCOUNT_PERCENT,
  FREE_DELIVERY_FROM,
  DELIVERY_COST,
  PROMO_MIN_SUBTOTAL,
} from '../../constants';

import type { CartItem } from '../../types/cart.types';

const filter = { id: 'p1', name: 'Масляный фильтр', price: 15876, stock: 8 };
const lamp = { id: 'p4', name: 'Лампа H7', price: 2790, stock: 3 };

const createItem = (product: typeof filter, quantity: number): CartItem =>
  ({ product, quantity }) as CartItem;

describe('calculateTotalPrice', () => {
  test('умножает цену товара на количество', () => {
    expect(calculateTotalPrice(createItem(lamp, 2))).toBe(5580);
  });

  test('возвращает цену товара при количестве 1', () => {
    expect(calculateTotalPrice(createItem(filter, 1))).toBe(15876);
  });
});

describe('calculateTotalAmount', () => {
  test('возвращает ноль для пустой корзины', () => {
    expect(calculateTotalAmount([])).toBe(0);
  });

  test('учитывает количество одного товара', () => {
    expect(calculateTotalAmount([createItem(lamp, 2)])).toBe(5580);
  });

  test('суммирует несколько разных товаров', () => {
    const cart = [createItem(filter, 1), createItem(lamp, 2)];
    expect(calculateTotalAmount(cart)).toBe(21456);
  });
});

describe('calculateCartSubtotal', () => {
  test('возвращает ноль для пустой корзины', () => {
    expect(calculateCartSubtotal([])).toBe(0);
  });

  test('учитывает количество одного товара', () => {
    expect(calculateCartSubtotal([createItem(lamp, 2)])).toBe(5580);
  });

  test('суммирует несколько разных товаров', () => {
    const cart = [createItem(filter, 1), createItem(lamp, 2)];
    expect(calculateCartSubtotal(cart)).toBe(21456);
  });
});

describe('calculateTotalQuantity', () => {
  test('возвращает ноль для пустой корзины', () => {
    expect(calculateTotalQuantity([])).toBe(0);
  });

  test('суммирует количество всех товаров', () => {
    const cart = [createItem(filter, 1), createItem(lamp, 2)];
    expect(calculateTotalQuantity(cart)).toBe(3);
  });
});

describe('getIncreasedQuantity', () => {
  test('увеличивает количество на 1', () => {
    expect(getIncreasedQuantity(createItem(filter, 2))).toBe(3);
  });

  test('не изменяет исходный товар', () => {
    const item = createItem(filter, 2);
    getIncreasedQuantity(item);
    expect(item.quantity).toBe(2);
  });
});

describe('getDecreasedQuantity', () => {
  test('уменьшает количество на 1', () => {
    expect(getDecreasedQuantity(createItem(filter, 2))).toBe(1);
  });

  test('не изменяет исходный товар', () => {
    const item = createItem(filter, 2);
    getDecreasedQuantity(item);
    expect(item.quantity).toBe(2);
  });
});

describe('canIncreaseQuantity', () => {
  test('разрешает увеличение, если на складе есть остаток', () => {
    expect(canIncreaseQuantity(createItem(lamp, 2))).toBe(true);
  });

  test('запрещает увеличение, если достигнут остаток на складе', () => {
    expect(canIncreaseQuantity(createItem(lamp, 3))).toBe(false);
  });
});

describe('isInCart', () => {
  const cart = [createItem(filter, 1), createItem(lamp, 2)];

  test('находит товар в корзине', () => {
    expect(isInCart(cart, 'p4')).toBe(true);
  });

  test('возвращает false для отсутствующего товара', () => {
    expect(isInCart(cart, 'p999')).toBe(false);
  });

  test('возвращает false для пустой корзины', () => {
    expect(isInCart([], 'p1')).toBe(false);
  });
});

describe('formatPrice', () => {
  test('переводит копейки в рубли с двумя знаками', () => {
    expect(formatPrice(15876)).toBe('158.76 BYN');
  });

  test('добавляет нули к целой сумме', () => {
    expect(formatPrice(50000)).toBe('500.00 BYN');
  });

  test('форматирует ноль', () => {
    expect(formatPrice(0)).toBe('0.00 BYN');
  });

  test('форматирует сумму меньше рубля', () => {
    expect(formatPrice(5)).toBe('0.05 BYN');
  });
});

describe('validateQuantity', () => {
  test('принимает количество в пределах остатка', () => {
    expect(validateQuantity(2, 3)).toBe(true);
  });

  test('принимает количество, равное остатку', () => {
    expect(validateQuantity(3, 3)).toBe(true);
  });

  test('не позволяет указать количество больше остатка', () => {
    expect(validateQuantity(4, 3)).toBe(false);
  });

  test('не принимает нулевое количество', () => {
    expect(validateQuantity(0, 3)).toBe(false);
  });

  test('не принимает отрицательное количество', () => {
    expect(validateQuantity(-1, 3)).toBe(false);
  });

  test('не принимает дробное количество', () => {
    expect(validateQuantity(1.5, 3)).toBe(false);
  });

  test('не принимает NaN', () => {
    expect(validateQuantity(NaN, 3)).toBe(false);
  });
});

describe('calculateOrderTotal', () => {
  const getDiscount = (subtotal: number) =>
    Math.round((subtotal * DISCOUNT_PERCENT) / 100);

  const createProduct = (price: number) => ({
    id: 'p100',
    name: 'Тестовый товар',
    price,
    stock: 10,
  });

  test('возвращает нули для пустой корзины', () => {
    expect(calculateOrderTotal([], '')).toEqual({
      subtotal: 0,
      discount: 0,
      delivery: 0,
      total: 0,
    });
  });

  test('считает несколько разных товаров с количеством больше одного', () => {
    const cart = [createItem(filter, 2), createItem(lamp, 3)];
    const subtotal = filter.price * 2 + lamp.price * 3;
    const discount = getDiscount(subtotal);
    expect(calculateOrderTotal(cart, PROMO_CODE)).toEqual({
      subtotal,
      discount,
      delivery: DELIVERY_COST,
      total: subtotal - discount + DELIVERY_COST,
    });
  });

  test('итог равен сумме минус скидка плюс доставка', () => {
    const cart = [createItem(filter, 2), createItem(lamp, 3)];
    const { subtotal, discount, delivery, total } = calculateOrderTotal(
      cart,
      PROMO_CODE
    );
    expect(total).toBe(subtotal - discount + delivery);
  });

  test('добавляет доставку к маленькому заказу без промокода', () => {
    const product = createProduct(PROMO_MIN_SUBTOTAL - 1);
    expect(calculateOrderTotal([createItem(product, 1)], '')).toEqual({
      subtotal: product.price,
      discount: 0,
      delivery: DELIVERY_COST,
      total: product.price + DELIVERY_COST,
    });
  });

  test('делает доставку бесплатной при сумме выше порога', () => {
    const product = createProduct(FREE_DELIVERY_FROM + 1);
    expect(calculateOrderTotal([createItem(product, 1)], '')).toEqual({
      subtotal: product.price,
      discount: 0,
      delivery: 0,
      total: product.price,
    });
  });

  test('делает доставку бесплатной при сумме, равной порогу', () => {
    const product = createProduct(FREE_DELIVERY_FROM);
    expect(calculateOrderTotal([createItem(product, 1)], '')).toEqual({
      subtotal: FREE_DELIVERY_FROM,
      discount: 0,
      delivery: 0,
      total: FREE_DELIVERY_FROM,
    });
  });

  test('добавляет доставку при сумме чуть ниже порога', () => {
    const product = createProduct(FREE_DELIVERY_FROM - 1);
    expect(calculateOrderTotal([createItem(product, 1)], '').delivery).toBe(
      DELIVERY_COST
    );
  });

  test('применяет промокод к заказу выше минимальной суммы', () => {
    const product = createProduct(PROMO_MIN_SUBTOTAL + 1);
    const discount = getDiscount(product.price);
    expect(calculateOrderTotal([createItem(product, 1)], PROMO_CODE)).toEqual({
      subtotal: product.price,
      discount,
      delivery: DELIVERY_COST,
      total: product.price - discount + DELIVERY_COST,
    });
  });

  test('применяет промокод к заказу, равному минимальной сумме', () => {
    const product = createProduct(PROMO_MIN_SUBTOTAL);
    expect(
      calculateOrderTotal([createItem(product, 1)], PROMO_CODE).discount
    ).toBe(getDiscount(PROMO_MIN_SUBTOTAL));
  });

  test('не применяет промокод к заказу ниже минимальной суммы', () => {
    const product = createProduct(PROMO_MIN_SUBTOTAL - 1);
    expect(
      calculateOrderTotal([createItem(product, 1)], PROMO_CODE).discount
    ).toBe(0);
  });

  test('принимает промокод в нижнем регистре и с пробелами', () => {
    const product = createProduct(PROMO_MIN_SUBTOTAL);
    const code = `  ${PROMO_CODE.toLowerCase()} `;
    expect(calculateOrderTotal([createItem(product, 1)], code).discount).toBe(
      getDiscount(PROMO_MIN_SUBTOTAL)
    );
  });

  test('игнорирует неизвестный промокод', () => {
    const product = createProduct(PROMO_MIN_SUBTOTAL);
    expect(calculateOrderTotal([createItem(product, 1)], 'HELLO')).toEqual({
      subtotal: product.price,
      discount: 0,
      delivery: DELIVERY_COST,
      total: product.price + DELIVERY_COST,
    });
  });
});
