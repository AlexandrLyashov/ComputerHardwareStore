import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { Product } from '@core/models/product';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private products = inject(ProductService);
  private cart = inject(CartService);

  private readonly _product = signal<Product | null>(null);
  product = this._product.asReadonly();

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._product.set(this.products.byId(id) ?? null);
  }

  addToCart(p: Product) {
    this.cart.add(p);
  }


  readonly crumbs = computed(() => {
    const p = this.product();
    if (!p) return [];
    return [
      { title: 'Каталог', link: '/products' },
      { title: p.title, link: null },
    ];
  });
}
