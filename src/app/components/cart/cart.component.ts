import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent{
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
  @Output() idProductEventEmitter = new EventEmitter<number>();

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }
}
