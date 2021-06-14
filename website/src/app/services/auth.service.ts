import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User, UserManager } from 'oidc-client';
import { environment } from 'src/environments/environment';
import { RegisterDTO } from '../models/registerDTO.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    withCredentials: true
  };

  private _userManager: UserManager;

  fetching: boolean = false;
  authChanged = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) { 
    this._userManager = new UserManager({
      authority: environment.IDENTITY_AUTHORITY,
      client_id: "WEBSITE_ID",
      redirect_uri:  window.location.protocol + "//" + window.location.host + "/website/signin-oidc",
      response_type: "code",
      scope: "openid profile proepwebsitegateway.fullaccess",
      post_logout_redirect_uri: window.location.protocol + "//" + window.location.host + "/website/signout-callback-oidc",
      automaticSilentRenew: true,
      silent_redirect_uri: window.location.protocol + "//" + window.location.host + "/website/assets/silent-callback.html"
    })
    this._userManager.events.addAccessTokenExpired(() => this.router.navigate(["login"]))
  }
  
  get isAuthenticated() {
    return new Promise<boolean>(resolve => {
      this._userManager.getUser()
        .then((user) => {
          const IsLoggedIn = user ? !user.expired : false;
          resolve(IsLoggedIn);
          this.authChanged.next(IsLoggedIn);
        })
        .catch(() => {
          resolve(false);
          this.authChanged.next(false);
        })
     })
  }

  get User() {
    return new Promise<User>((resolve, reject) => {
      this._userManager.getUser()
        .then(user => {
          resolve(user);
        }).catch(() => {
            reject();
        })
    });
  }

  get UserId() {
    return this.User.then(user => user.profile.sub)
  }

  SignIn(email: string, password: string): Promise<void> {
    this.fetching = true;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.httpClient.post<void>(`${this._userManager.settings.authority}/api/login`, { email, password },this.httpOptions)
        .toPromise()
        .then(() => this._userManager.signinRedirect()
            .then(() => resolve())
            .catch(() => reject())
            .finally(() => this.fetching = false)
        )
        .catch(() => reject())
        .finally(() => this.fetching = false)
      }, 500);
    }) 
  }

  HandleLoginCallback() {
    return new Promise<void>((resolve, reject) => {
      this._userManager
        .signinRedirectCallback()
        .then(() => {
          this._userManager.getUser()
            .then(() => resolve())
            .catch(() => reject());
        })
        .catch(() => reject());
    })
  }

  Logout() {
    return new Promise<void>((resolve, reject) => {
      this._userManager
        .signoutRedirect()
        .then(() => resolve())
        .catch(() => reject());
    })
  }

  HandleLogoutCallback() {
    return new Promise<void>((resolve, reject) => {
      this._userManager
        .signoutRedirectCallback()
        .then(() => resolve())
        .catch(() => reject());
    })
  }

  Register(registerDTO: RegisterDTO): Promise<void> {
    this.fetching = true;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.httpClient.post<void>(`${this._userManager.settings.authority}/api/register`, registerDTO, this.httpOptions)
        .toPromise()
        .then(() => this._userManager.signinRedirect()
            .then(() => resolve())
            .catch(() => reject())
            .finally(() => this.fetching = false)
        )
        .catch(() => reject())
        .finally(() => this.fetching = false)
      }, 500);
    }) 
  }
  
}
