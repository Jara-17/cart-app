import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartAppComponent } from './pages/cart-app/cart-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CartAppComponent],
  template: '<cart-app/>',
})
export class AppComponent {
  title = 'cart-app';
}
