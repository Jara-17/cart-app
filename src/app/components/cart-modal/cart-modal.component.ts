import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css',
})
export class CartModalComponent {
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
  @Output() idProductEventEmitter = new EventEmitter<number>();
  @Output() openCartEventEmitter = new EventEmitter<boolean>();

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

  closeCart() {
    this.openCartEventEmitter.emit();
  }
}
