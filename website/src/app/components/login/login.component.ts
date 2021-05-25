import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/account']);
    }
    
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl(null, Validators.required),
    });
  }

  login() {
    if (this.loginForm.valid) {
      var email = this.loginForm.value.email;
      var password = this.loginForm.value.password;

      this.authService.SignIn(email, password)
      .then(() => {
        this.toastr.success("Logged in successfully!"); 
        this.router.navigate(['account']);
      }).catch(() => this.toastr.error("Invalid credentials!"))
      .catch(() => {
        this.toastr.error("Something went wrong! Please, try again!");
      })
    }
    else this.toastr.error("Fields are invalid!");
  }

  get canSignIn() {
    return this.loginForm.valid;
  }

}
