import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ProductosViewComponent } from './views/productos-view/productos-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { ProductDetailsViewComponent } from './views/product-details-view/product-details-view.component';


const routes : Routes = [
  {path:'',component:HomeViewComponent},
  {path:'productos',component:ProductosViewComponent},
  {path:'producto/:nombre',component:ProductDetailsViewComponent},
  {path:'login', component:LoginViewComponent},
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
