import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChildrenResponse} from "../model/interfaces/children-response";

const CHILDREN_URL = 'http://localhost:8080/api/parent/children'

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  constructor(private httpClient: HttpClient) {
  }

  getChildren(): Observable<ChildrenResponse> {
    return this.httpClient.get<ChildrenResponse>(CHILDREN_URL, {responseType: 'json'});
  }

}
