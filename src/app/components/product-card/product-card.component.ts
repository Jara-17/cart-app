import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product: Product = new Product();
  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();

  onAddCart(product: Product) {
    this.productEventEmitter.emit(product);
  }
}
