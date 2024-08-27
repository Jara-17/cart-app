import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];

  private sharingDataService: SharingDataService = inject(SharingDataService);
  private productService: ProductService = inject(ProductService);

  ngOnInit(): void {
    if (this.products.length === 0) {
      this.products = this.productService.findAll();
    }
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
