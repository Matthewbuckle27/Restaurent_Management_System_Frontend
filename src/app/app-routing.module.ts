import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './product-home/dashboard.component';
import { CreateproductComponent } from './create-product/createproduct.component';
import { CreateorderComponent } from './create-order/create-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [

  {path:'',redirectTo:'/dashboard', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'createproduct',component:CreateproductComponent},
  {path:'createorder',component:CreateorderComponent},
  {path: 'myorders', component:MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
