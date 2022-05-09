import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  role: any;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      "username": new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]),
      "email": new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.email
        ]),
      "phone": new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('\\+?[0-9]+')
        ]),
      "password": new FormControl(null,
        [
          Validators.required,
          Validators.minLength(6)
        ]),
      "role": new FormControl(null,
        [
          Validators.required
        ])
    })
  }

  onSubmit(): void {
    this.authenticationService.register(this.registrationForm.value).subscribe({
      next: value => {
        console.log(value);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }

  onRoleChange() {
    this.registrationForm.removeControl("firstName");
    this.registrationForm.removeControl("lastName");
    this.registrationForm.removeControl("schoolName");
    this.registrationForm.removeControl("schoolAddress");

    if (this.role === 'ROLE_PARENT') {
      this.registrationForm.addControl(
        "firstName",
        new FormControl(null, [Validators.required])
      );
      this.registrationForm.addControl(
        "lastName",
        new FormControl(null, [Validators.required])
      );
    }

    if (this.role === 'ROLE_SCHOOL') {
      this.registrationForm.addControl(
        "schoolName",
        new FormControl(null, [Validators.required])
      );
      this.registrationForm.addControl(
        "schoolAddress",
        new FormControl(null, [Validators.required])
      );
    }
  }
}
