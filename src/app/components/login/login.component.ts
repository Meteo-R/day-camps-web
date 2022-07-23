import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {RoleMapperService} from "../../services/mappers/role-mapper.service";

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
  readableRoles: string[] = [];

  constructor(private authenticationService: AuthenticationService,
              private tokenStorageService: TokenStorageService,
              private roleMapperService: RoleMapperService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.readableRoles = this.getReadableRoles();
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
    this.authenticationService.login(this.loginForm.value).subscribe({
      next: value => {
        this.tokenStorageService.saveToken(value.token);
        this.tokenStorageService.saveUser(value);

        console.log(value.token);
        console.log(value);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.readableRoles = this.getReadableRoles();
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

  private getReadableRoles() {
    return this.roleMapperService.mapToReadableRoles(this.tokenStorageService.getUser().roles);
  }
}
