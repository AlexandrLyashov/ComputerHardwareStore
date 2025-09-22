import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  year = new Date().getFullYear();

  readonly email = 'support@ch-store.ua';
  readonly hotline = '0 800 33 44 55';
  readonly intl = '+380 44 390 12 34';
  readonly address =
    'м. Київ, вул. Хрещатик, 22, БЦ «Глобус», офіс 704';
}