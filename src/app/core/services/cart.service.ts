import { Injectable, signal } from '@angular/core';
import { Product } from '@core/models/product';
import { CartItem } from '@core/models/cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);

  
  items(): CartItem[] {
    return this._items();
  }

  count(): number {
    return this._items().reduce((s: number, i: CartItem) => s + i.qty, 0);
  }

  total(): number {
    return this._items().reduce((s: number, i: CartItem) => s + i.qty * i.product.price, 0);
  }

  add(product: Product, qty: number = 1): void {
    const items = [...this._items()];
    const idx = items.findIndex((i: CartItem) => i.product.id === product.id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], qty: items[idx].qty + qty };
    } else {
      items.push({ product, qty });
    }
    this._items.set(items);
  }

  update(id: number, qty: number): void {
    const items = [...this._items()];
    const idx = items.findIndex((i: CartItem) => i.product.id === id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], qty };
      this._items.set(items);
    }
  }

  remove(id: number): void {
    this._items.set(this._items().filter((i: CartItem) => i.product.id !== id));
  }

  clear(): void {
    this._items.set([]);
  }
}
