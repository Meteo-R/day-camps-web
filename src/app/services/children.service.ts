import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChildrenResponse} from "../model/interfaces/children-response";
import {FormGroup} from "@angular/forms";
import {ChildEnrolledInAnyDayCampResponse} from "../model/interfaces/child-enrolled-in-any-day-camp-response";

const CHILDREN_URL = 'http://localhost:8080/api/parent/children/'
const ENROLLMENTS_URL = 'http://localhost:8080/api/enrollments/'

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

  isChildEnrolledInAnyDayCamp(childId: number): Observable<ChildEnrolledInAnyDayCampResponse> {
    return this.httpClient.get<ChildEnrolledInAnyDayCampResponse>(ENROLLMENTS_URL + childId, {responseType: 'json'});
  }

  deleteChild(childId: number): Observable<any> {
    return this.httpClient.delete(CHILDREN_URL + childId);
  }

  editChild(editChildForm: FormGroup): Observable<any> {
    return this.httpClient.put(CHILDREN_URL + editChildForm.value.id, {
      firstName: editChildForm.value.firstName,
      lastName: editChildForm.value.lastName
    }, httpOptions)
  }
}
