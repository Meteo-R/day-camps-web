import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTHENTICATION_API = 'http://localhost:8080/api/authentication'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  register(registrationForm: any): Observable<any> {
    return this.http.post(AUTHENTICATION_API + '/sign-up', {
      username: registrationForm.username,
      email: registrationForm.email,
      password: registrationForm.password,
      role: 'ROLE_PARENT'
      }, httpOptions);
  }

}
