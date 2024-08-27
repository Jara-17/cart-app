import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full',
  },

  {
    path: 'catalog',
    component: CatalogComponent,
  },

  {
    path: 'cart',
    component: CartComponent,
  },
];
