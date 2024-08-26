import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() showCart: boolean = false;
  @Input() items: CartItem[] = [];
  @Output() openCartEventEmitter = new EventEmitter<boolean>();
  
  openCart() {
    this.openCartEventEmitter.emit();
  };
}
