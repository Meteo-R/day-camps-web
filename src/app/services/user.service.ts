import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/api/test'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getParentBoard(): Observable<any> {
    return this.httpClient.get(API_URL + '/parent', {responseType: 'text'});
  }

  getSchoolBoard(): Observable<any> {
    return this.httpClient.get(API_URL + '/school', {responseType: 'text'});
  }
}
