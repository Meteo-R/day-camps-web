import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authenticationService: AuthenticationService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    this.loginForm = new FormGroup({
      "username": new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]),
      "password": new FormControl(null,
        [
          Validators.required,
          Validators.minLength(6)
        ]),
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm.value).subscribe({
      next: value => {
        this.tokenStorage.saveToken(value.token);
        this.tokenStorage.saveUser(value);

        console.log(value.token);
        console.log(value);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    })
  }

  reloadPage(): void {
    window.location.reload();
  }
}
