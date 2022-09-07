import { Component, OnInit } from '@angular/core';
import {EnrollmentsService} from "../../../services/enrollments.service";
import {Enrollment} from "../../../model/interfaces/enrollment";
import {DayCamp} from "../../../model/interfaces/day-camp";

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit {
  public enrollments!: Enrollment[];

  constructor(
    private enrollmentsService: EnrollmentsService
  ) { }

  ngOnInit(): void {
    this.getEnrollments();
  }

  private getEnrollments(): void {
    this.enrollmentsService.getEnrollments().subscribe({
      next: value => {
        this.enrollments = value.enrollments;
        console.log(this.enrollments);
      },
      error: err => console.log(err)
    })
  }

  getOngoing(dayCamps: DayCamp[]): DayCamp[] {
    const today = new Date();

    return dayCamps.filter(dayCamp => {
      const startDate = new Date(dayCamp.startDate);
      const endDate = new Date(dayCamp.endDate);
      return startDate <= today && today <= endDate;
    })
  }

  getUpcoming(dayCamps: DayCamp[]): DayCamp[] {
    const today = new Date();

    return dayCamps.filter(dayCamp => {
      const startDate = new Date(dayCamp.startDate);
      return today < startDate;
    })
  }

  getCompleted(dayCamps: DayCamp[]): DayCamp[] {
    const today = new Date();

    return dayCamps.filter(dayCamp => {
      const endDate = new Date(dayCamp.endDate);
      return endDate < today;
    })
  }
}
