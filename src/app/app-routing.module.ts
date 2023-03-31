import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ProductosViewComponent } from './views/productos-view/productos-view.component';

const routes : Routes = [
  {path:'',component: HomeViewComponent}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path:'', component:HomeViewComponent},
      {path:'productos', component:ProductosViewComponent}
    ])
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
