import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSuccessful: boolean = false;
  regForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.regForm = new FormGroup({
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

}
