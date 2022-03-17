import { Component, OnInit } from '@angular/core';
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

  constructor(private authenticationService: AuthenticationService) { }

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
      "password": new FormControl(null,
        [
          Validators.required,
          Validators.minLength(6)
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
}
