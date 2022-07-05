import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DayCampsResponse} from "../model/interfaces/day-camps-response";

const DAY_CAMPS_URL = 'http://localhost:8080/api/daycamps'

@Injectable({
  providedIn: 'root'
})
export class DayCampsService {

  constructor(private httpClient: HttpClient) {
  }

  getDayCamps(): Observable<DayCampsResponse> {
    return this.httpClient.get<DayCampsResponse>(DAY_CAMPS_URL, {responseType: 'json'});
  }

}
