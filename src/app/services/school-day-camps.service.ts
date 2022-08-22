import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DayCampsResponse} from "../model/interfaces/day-camps-response";

const SCHOOL_DAY_CAMPS_URL = 'http://localhost:8080/api/school/daycamps'
const TIMELINE_LOCATION_QUERY_PARAM = '?timelineLocation='
const PAST_SUFFIX = 'PAST'
const ONGOING_SUFFIX = 'ONGOING'
const FUTURE_SUFFIX = 'FUTURE'

@Injectable({
  providedIn: 'root'
})
export class SchoolDayCampsService {

  constructor(private httpClient: HttpClient) {
  }

  getFutureDayCamps(): Observable<DayCampsResponse> {
    return this.httpClient.get<DayCampsResponse>(SCHOOL_DAY_CAMPS_URL + TIMELINE_LOCATION_QUERY_PARAM + FUTURE_SUFFIX,
      {responseType: 'json'});
  }

  getOngoingDayCamps(): Observable<DayCampsResponse> {
    return this.httpClient.get<DayCampsResponse>(SCHOOL_DAY_CAMPS_URL + TIMELINE_LOCATION_QUERY_PARAM + ONGOING_SUFFIX,
      {responseType: 'json'});
  }

  getPastDayCamps(): Observable<DayCampsResponse> {
    return this.httpClient.get<DayCampsResponse>(SCHOOL_DAY_CAMPS_URL + TIMELINE_LOCATION_QUERY_PARAM + PAST_SUFFIX,
      {responseType: 'json'});
  }

}
