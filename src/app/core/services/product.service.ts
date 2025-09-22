import { Injectable } from '@angular/core';
import { Product } from '@core/models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  
  private readonly _products: Product[] = [
    {
      id: 1,
      title: 'Intel Core i5-13600K',
      short: '14 ядер, до 5.1 ГГц',
      price: 299,
      stock: 12,
      img: 'assets/images/intel-i5-13600k.jpg'
    },
    {
      id: 2,
      title: 'AMD Ryzen 7 7800X3D',
      short: '3D V-Cache • ігровий монстр',
      price: 429,
      stock: 8,
      img: 'assets/images/amd-ryzen-7800x3d.jpg'
    },
    {
      id: 3,
      title: 'NVIDIA GeForce RTX 4070',
      short: '12GB GDDR6X, DLSS 3',
      price: 549,
      stock: 5,
      img: 'assets/images/nvidia-rtx-4070.jpg'
    },
    {
      id: 4,
      title: 'Samsung 990 PRO 1TB',
      short: 'PCIe 4.0 NVMe, до 7450MB/s',
      price: 129,
      stock: 20,
      img: 'assets/images/samsung-990-pro.jpg'
    }
  ];

  all(): Product[] {
    
    return this._products;
  }

  
  byId(id: number): Product | undefined {
    return this._products.find(p => p.id === id);
  }
}
