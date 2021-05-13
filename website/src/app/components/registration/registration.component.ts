import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/models/registerDTO.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/account']);
    }
    this.buildForm();
  }

  private buildForm(): void{
    this.registrationForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      'password': new FormControl(null, Validators.required),
      'confirm': new FormControl(null, Validators.compose([Validators.required]))
    });
  }

  register() {
    if (this.registrationForm.valid) {
      if(this.registrationForm.get("password").value == this.registrationForm.get("confirm").value){

        var fv = this.registrationForm.value;

        var registerDTO: RegisterDTO = {
          email: fv.email,
          password: fv.password,
          firstName: fv.firstName,
          lastName: fv.lastName,
          address: "",
          phoneNumber: ""
        }

        this.authService.Register(registerDTO)
        // .then(() => this.router.navigate(['account']).catch(() => console.log("Something went wrong!")))
        .catch(() => {
          console.log("Something went wrong! Please, try again!");
        })
      }
      else console.log("Passwords do not match!")
    }
  }
}
