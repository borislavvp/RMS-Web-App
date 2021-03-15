// * General Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';


// * Angular Material
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';

// * Other Modules
import { FlexLayoutModule } from '@angular/flex-layout';

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
    DrinksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
