import { useCartStore } from './cart-store';

const item = {
  id: 1,
  title: 'Test product',
  heroImage: 'https://example.com/image.png',
  price: 10,
  quantity: 1,
  maxQuantity: 3,
};

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe('cart-store', () => {
  it('adds a new item', () => {
    useCartStore.getState().addItem(item);
    expect(useCartStore.getState().items).toEqual([item]);
  });

  it('merges quantity when adding an existing item, capped at maxQuantity', () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().addItem({ ...item, quantity: 5 });
    expect(useCartStore.getState().items[0].quantity).toBe(item.maxQuantity);
  });

  it('increments and decrements within bounds', () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().incrementItem(item.id);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
    useCartStore.getState().decrementItem(item.id);
    useCartStore.getState().decrementItem(item.id);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it('removes an item', () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().removeItem(item.id);
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('computes total price and item count', () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().addItem({ ...item, id: 2, quantity: 2 });
    expect(useCartStore.getState().getTotalPrice()).toBe('30.00');
    expect(useCartStore.getState().getItemCount()).toBe(3);
  });

  it('resets the cart', () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().resetCart();
    expect(useCartStore.getState().items).toEqual([]);
  });
});
