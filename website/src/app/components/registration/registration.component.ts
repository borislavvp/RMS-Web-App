import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterDTO } from 'src/app/models/registerDTO.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
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
        .catch(() => {
          this.toastr.error("There was an error with registration! Please, try again!");
        })
      }
      else this.toastr.error("Passwords do not match!")
    }
    else this.toastr.error("Fields are invalid");
  }
}
