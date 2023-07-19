import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductosViewComponent } from './views/productos-view/productos-view.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatExpansionModule} from '@angular/material/expansion';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MatMenuModule} from '@angular/material/menu';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MatChipsModule } from '@angular/material/chips';
import { ProductDetailsViewComponent } from './views/product-details-view/product-details-view.component';
import { CardProductsComponent } from './components/card-products/card-products.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { CartViewComponent } from './views/cart-view/cart-view.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { CardComponent } from './components/card/card.component';
import { CartComponent } from './components/cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    HeaderComponent,
    FooterComponent,
    ProductosViewComponent,
    CardComponent,
    ProductsCarouselComponent,
    LoginViewComponent,
    LoginComponent,
    CardProductsComponent,
    LeftMenuComponent,
    ProductDetailsComponent,
    ProductDetailsViewComponent,
    CartViewComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatChipsModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatBadgeModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
