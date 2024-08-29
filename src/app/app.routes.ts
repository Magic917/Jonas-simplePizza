import { Routes } from '@angular/router';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';

export const routes: Routes = [
    {path:'order',component:PizzaOrderComponent},
    {path:'list',component:PizzaListComponent},
    
];
