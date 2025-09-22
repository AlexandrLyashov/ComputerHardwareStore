import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () =>
      import('@features/home/pages/home-page/home-page.component')
        .then(m => m.HomePageComponent)
  },

  {
    path: 'products',
    loadComponent: () =>
      import('@features/products/pages/product-list/product-list.component')
        .then(m => m.ProductListComponent)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('@features/cart/pages/cart-page/cart-page.component')
        .then(m => m.CartPageComponent)
  },

  {
    path: 'checkout',
    loadComponent: () =>
      import('@features/checkout/pages/checkout-page/checkout-page.component')
        .then(m => m.CheckoutPageComponent)
  },

  { path: '**', redirectTo: 'home' }
];
