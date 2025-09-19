import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/pages/product-list/product-list.component')
        .then(m => m.ProductList),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/pages/product-detail/product-detail.component')
        .then(m => m.ProductDetail),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/pages/cart-page/cart-page.component')
        .then(m => m.CartPageComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/pages/checkout-page/checkout-page.component')
        .then(m => m.CheckoutPage),
  },

  { path: '**', redirectTo: 'products' },
];
