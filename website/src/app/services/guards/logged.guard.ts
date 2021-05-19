import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  async canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.isAuthenticated.then(logged => {
        if (logged) {
          return reject(this.router.navigate(['/account']));
        }
        return resolve(true);
      })
    })
  }
}