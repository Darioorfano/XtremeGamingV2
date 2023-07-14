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
import { LoginViewComponent } from './views/login-view/login-view.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
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
    ProductDetailsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatChipsModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '105460275370-u9c1mgk3roojh8no0e57rhh1rtdrk0ij.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
