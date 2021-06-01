// * General Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './services/interceptors/token.interceptor';

// * Angular Material
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

// * Other Modules
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';

// * Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { SaladsComponent } from './components/menu/salads/salads.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { MainsComponent } from './components/menu/mains/mains.component';
import { DessertsComponent } from './components/menu/desserts/desserts.component';
import { DrinksComponent } from './components/menu/drinks/drinks.component';
import { ItemModalComponent } from './components/menu/item-modal/item-modal.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BasketComponent } from './components/basket/basket.component';
import { DeliveryDetailsComponent } from './components/basket/delivery-details/delivery-details.component';
import { PaymentDetailsComponent } from './components/basket/payment-details/payment-details.component';
import { AboutComponent } from './components/about/about.component';
import { LoginRedirectComponent } from './components/login/login-redirect/login-redirect.component';
import { LogoutRedirectComponent } from './components/login/logout-redirect/logout-redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    SaladsComponent,
    MenuItemComponent,
    MainsComponent,
    DessertsComponent,
    DrinksComponent,
    ItemModalComponent,
    GalleryComponent,
    AccountComponent,
    LoginComponent,
    RegistrationComponent,
    BasketComponent,
    DeliveryDetailsComponent,
    PaymentDetailsComponent,
    AboutComponent,
    LoginRedirectComponent,
    LogoutRedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    MatBadgeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
