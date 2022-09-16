import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnrollmentsResponse} from "../model/interfaces/enrollments-response";
import {DayCampsResponse} from "../model/interfaces/day-camps-response";

const ENROLLMENTS_URL = 'http://localhost:8080/api/enrollments/'

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor(private httpClient: HttpClient) {
  }

  getEnrollments(): Observable<EnrollmentsResponse> {
    return this.httpClient.get<EnrollmentsResponse>(ENROLLMENTS_URL, {responseType: 'json'});
  }

  getPossibleDayCamps(childId: number): Observable<DayCampsResponse> {
    return this.httpClient.get<DayCampsResponse>(ENROLLMENTS_URL + 'possible-day-camps/' + childId);
  }

  enrollChild(childId: number, dayCampId: number): Observable<any> {
    return this.httpClient.post(ENROLLMENTS_URL + childId + '/' + dayCampId, {});
  }

  unenrollChild(childId: number, dayCampId: number): Observable<any> {
    return this.httpClient.delete(ENROLLMENTS_URL + childId + "/" + dayCampId);
  }
}
