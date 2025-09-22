import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '@core/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-checkout-page',
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, RouterModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {
  private fb = inject(FormBuilder);
  readonly cart = inject(CartService);
  private router = inject(Router);

  // форма
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    city: ['', [Validators.required]],
    address: ['', [Validators.required]],
    delivery: ['nova_poshta', Validators.required], // nova_poshta | courier | pickup
    payment: ['card', Validators.required],          // card | cod
    comment: [''],
    agree: [false, Validators.requiredTrue],
  });

  
  readonly items = computed(() => this.cart.items());
  readonly subtotal = computed(() => this.cart.total());

  
  readonly shipping = computed(() => {
    const method = this.form.get('delivery')!.value;
    if (this.cart.items().length === 0) return 0;
    switch (method) {
      case 'pickup': return 0;
      case 'courier': return 7.5;
      default: return 4.9; // nova_poshta
    }
  });

  readonly total = computed(() => +(this.subtotal() + this.shipping()).toFixed(2));

  
  dec(ci: { product: any; qty: number }) {
    const q = Math.max(0, ci.qty - 1);
    this.cart.update(ci.product.id, q);
  }
  inc(ci: { product: any; qty: number }) {
    this.cart.update(ci.product.id, ci.qty + 1);
  }
  remove(id: number) {
    this.cart.remove(id);
  }

  
  trackByItem = (index: number, ci: { product: any }) => ci.product.id;

  
  submit() {
    if (this.items().length === 0) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const order = {
      ...this.form.value,
      items: this.items().map(i => ({ id: i.product.id, title: i.product.title, qty: i.qty, price: i.product.price })),
      subtotal: this.subtotal(),
      shipping: this.shipping(),
      total: this.total(),
      createdAt: new Date().toISOString(),
    };
    alert(`Замовлення оформлено!\nНомер: #${Math.floor(Math.random() * 900000 + 100000)}\nСума: $${order.total.toFixed(2)}`);
    this.cart.clear();
    this.router.navigateByUrl('/products');
  }

  
  invalid(control: string) {
    const c = this.form.get(control)!;
    return c.touched && c.invalid;
  }
}
