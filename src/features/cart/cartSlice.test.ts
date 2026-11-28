import { describe, test, expect } from 'vitest';

import cartReducer, { addItem, removeItem, updateQuantity } from './cartSlice';
import type { CartState } from '../../types/cart.types';
import type { Product } from '../../types/catalog.types';

// Reducers are tested directly (state + action, no store);
// validation rules are covered in cart-utils.test.ts,
// so each reducer has only one invalid-quantity case to check that validation is applied.

const createProduct = (id: string, stock: number): Product =>
  ({
    id,
    key: id,
    partNumber: `PN-${id}`,
    origNumber: `ON-${id}`,
    name: `Товар ${id}`,
    producer: 'TEST',
    images: [],
    price: 1000,
    stock,
  }) as Product;

const filter = createProduct('p1', 3);
const lamp = createProduct('p2', 5);

const createState = (...items: [Product, number][]): CartState => ({
  items: items.map(([product, quantity]) => ({ product, quantity })),
});

describe('cartSlice: начальное состояние', () => {
  test('корзина пуста', () => {
    expect(cartReducer(undefined, { type: '@@INIT' })).toEqual({ items: [] });
  });
});

describe('addItem', () => {
  test('добавляет новый товар с количеством 1', () => {
    const state = cartReducer(createState(), addItem(filter));
    expect(state.items).toEqual([{ product: filter, quantity: 1 }]);
  });

  test('увеличивает количество существующего товара на 1', () => {
    const state = cartReducer(createState([filter, 1]), addItem(filter));
    expect(state.items).toEqual([{ product: filter, quantity: 2 }]);
  });

  test('не превышает остаток на складе', () => {
    const initial = createState([filter, 3]);
    expect(cartReducer(initial, addItem(filter))).toEqual(initial);
  });

  test('не изменяет другие товары', () => {
    const state = cartReducer(
      createState([filter, 1], [lamp, 2]),
      addItem(filter)
    );
    expect(state.items).toEqual([
      { product: filter, quantity: 2 },
      { product: lamp, quantity: 2 },
    ]);
  });
});

describe('removeItem', () => {
  test('удаляет товар по id', () => {
    const state = cartReducer(
      createState([filter, 1], [lamp, 2]),
      removeItem('p1')
    );
    expect(state.items).toEqual([{ product: lamp, quantity: 2 }]);
  });

  test('не изменяет корзину, если товара нет', () => {
    const initial = createState([filter, 1]);
    expect(cartReducer(initial, removeItem('p999'))).toEqual(initial);
  });
});

describe('updateQuantity', () => {
  test('устанавливает допустимое количество', () => {
    const state = cartReducer(
      createState([filter, 1]),
      updateQuantity({ id: 'p1', quantity: 3 })
    );
    expect(state.items).toEqual([{ product: filter, quantity: 3 }]);
  });

  test('игнорирует количество больше остатка', () => {
    const initial = createState([filter, 1]);
    expect(
      cartReducer(initial, updateQuantity({ id: 'p1', quantity: 4 }))
    ).toEqual(initial);
  });

  test('не изменяет корзину, если товара нет', () => {
    const initial = createState([filter, 1]);
    expect(
      cartReducer(initial, updateQuantity({ id: 'p999', quantity: 2 }))
    ).toEqual(initial);
  });
});
