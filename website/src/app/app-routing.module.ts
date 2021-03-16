import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: {title: 'ChorbaDeck | Welcome'} },
  { path: 'menu', component: MenuComponent, data: {title: 'Menu'} },
  { path: 'gallery', component: GalleryComponent, data: {title: 'Gallery'} },
  { path: 'account', component: AccountComponent, data: {title: 'Tracking'} },
  { path: 'login', component: LoginComponent, data: {title: 'Login'} },
  { path: 'register', component: RegistrationComponent, data: {title: 'Register'} },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
