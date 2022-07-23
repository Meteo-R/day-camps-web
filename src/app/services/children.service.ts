import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChildrenResponse} from "../model/interfaces/children-response";
import {FormGroup} from "@angular/forms";

const CHILDREN_URL = 'http://localhost:8080/api/parent/children'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  constructor(private httpClient: HttpClient) {
  }

  getChildren(): Observable<ChildrenResponse> {
    return this.httpClient.get<ChildrenResponse>(CHILDREN_URL, {responseType: 'json'});
  }

  addChild(addChildForm: FormGroup): Observable<any> {
    return this.httpClient.post(CHILDREN_URL, {
      firstName: addChildForm.value.firstName,
      lastName: addChildForm.value.lastName
    }, httpOptions);
  }

}
