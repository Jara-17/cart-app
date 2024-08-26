import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from '../../components/catalog/catalog.component';
import { CartComponent } from '../../components/cart/cart.component';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CartModalComponent } from '../../components/cart-modal/cart-modal.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CommonModule, CatalogComponent, CartModalComponent, NavbarComponent],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css',
})
export class CartAppComponent implements OnInit {
  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  private service: ProductService = inject(ProductService);

  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  onAddCart(product: Product) {
    const hasItem = this.items.find((item) => item.product.id === product.id);

    if (hasItem) {
      this.items = this.items.map((item) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
  
        return item;
      });
    } else {
      this.items = [
        ...this.items,
        {
          product: { ...product },
          quantity: 1,
        },
      ];
    }
    
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number) {
    this.items = this.items.filter((item) => item.product.id !== id);
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal() {
    this.total = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items))
  }

  openCloseCart() {
    this.showCart = !this.showCart;
  }
}
