import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnrollmentsResponse} from "../model/interfaces/enrollments-response";

const ENROLLMENTS_URL = 'http://localhost:8080/api/enrollments/'

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor(private httpClient: HttpClient) {
  }

  getEnrollments(): Observable<EnrollmentsResponse> {
    return this.httpClient.get<EnrollmentsResponse>(ENROLLMENTS_URL, {responseType: 'json'})
  }
}
