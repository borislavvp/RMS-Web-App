import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AccountComponent } from './components/account/account.component';
import { BasketComponent } from './components/basket/basket.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomeComponent } from './components/home/home.component';
import { LoginRedirectComponent } from './components/login/login-redirect/login-redirect.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: {title: 'ChorbaDeck | Welcome'} },
  { path: 'menu', component: MenuComponent, data: {title: 'Menu'} },
  { path: 'about', component: AboutComponent, data: {title: 'About'} },
  { path: 'gallery', component: GalleryComponent, data: {title: 'Gallery'} },
  { path: 'account', component: AccountComponent, data: {title: 'Tracking'}, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, data: {title: 'Login'} },
  { path: 'signin-oidc', component: LoginRedirectComponent },
  { path: 'register', component: RegistrationComponent, data: {title: 'Register'} },
  { path: 'basket', component: BasketComponent, data: {title: 'Shopping Basket'} },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
