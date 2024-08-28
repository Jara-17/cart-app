import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { CustomFooterComponent } from '../../components/custom-footer/custom-footer.component';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet, CustomFooterComponent],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;
  private options: SweetAlertOptions[] = [
    {
      title: 'Estás Seguro?',
      text: 'Estas a punto de eliminar un producto del carro de compras. ¿Quieres Continuar??!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar!!',
    },

    {
      title: 'Carro de Compras',
      text: 'Se ha agregado un nuevo producto al corro de compras!',
      icon: 'success',
    },

    {
      title: 'Eliminado!',
      text: 'El producto ha sido eliminado con éxito!',
      icon: 'success',
    },
  ];

  private sharingDataService: SharingDataService = inject(SharingDataService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe((product) => {
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
      this.router.navigate(['/cart'], {
        state: {
          items: this.items,
          total: this.total,
        },
      });

      Swal.fire(this.options[1]);
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id) => {
      Swal.fire(this.options[0]).then((result) => {
        if (result.isConfirmed) {
          this.items = this.items.filter((item) => item.product.id !== id);

          this.calculateTotal();
          this.saveSession();

          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/cart'], {
                state: {
                  items: this.items,
                  total: this.total,
                },
              });
            });

          Swal.fire(this.options[2]);
        }
      });
    });
  }

  calculateTotal() {
    this.total = this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
