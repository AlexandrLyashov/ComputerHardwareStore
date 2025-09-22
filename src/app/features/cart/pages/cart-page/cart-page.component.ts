import { Component, computed, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '@core/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-cart-page',
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'], 
})
export class CartPageComponent {
  readonly cart = inject(CartService);


  readonly items = computed(() => this.cart.items());
  readonly subtotal = computed(() => this.cart.total());


  inc(ci: { product: any; qty: number }) {
    this.cart.update(ci.product.id, ci.qty + 1);
  }
  dec(ci: { product: any; qty: number }) {
    const next = Math.max(0, ci.qty - 1);
    this.cart.update(ci.product.id, next);
  }
  remove(id: number) {
    this.cart.remove(id);
  }
  clear() {
    if (this.items().length === 0) return;
    if (confirm('Очистити кошик?')) this.cart.clear();
  }

  trackByItem = (_: number, ci: { product: any }) => ci.product.id;
}