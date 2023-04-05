import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductosViewComponent } from './views/productos-view/productos-view.component';
import { CardComponent } from './components/card/card.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    HeaderComponent,
    FooterComponent,
    ProductosViewComponent,
    CardComponent,
    ProductsCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
