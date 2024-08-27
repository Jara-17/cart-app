import {
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  items: CartItem[] = [];
  total: number = 0;
  
  private sharingDataService: SharingDataService = inject(SharingDataService);

  constructor(private router: Router) {
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  onDeleteCart(id: number) {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
