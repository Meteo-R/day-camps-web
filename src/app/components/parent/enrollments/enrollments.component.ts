import { Component, OnInit } from '@angular/core';
import {EnrollmentsService} from "../../../services/enrollments.service";
import {Enrollment} from "../../../model/interfaces/enrollment";
import {DayCamp} from "../../../model/interfaces/day-camp";
import {Child} from "../../../model/interfaces/child";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit {
  public enrollments!: Enrollment[];
  public childToUnenroll?: Child | null;
  public dayCampToUnenrollFrom?: DayCamp | null;
  public showUnenrollSnackbar: boolean = false;

  constructor(
    private enrollmentsService: EnrollmentsService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getEnrollments();
  }

  private getEnrollments(): void {
    this.enrollmentsService.getEnrollments().subscribe({
      next: value => {
        this.enrollments = value.enrollments;
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

  openUnenrollModal(modal: any, child: Child, dayCamp: DayCamp) {
    this.childToUnenroll = child;
    this.dayCampToUnenrollFrom = dayCamp;

    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      result => this.resetUnenrollmentEntities(),
      reason => this.resetUnenrollmentEntities()
    )
  }

  onUnenrollSubmit() {
    this.enrollmentsService.unenrollChild(this.childToUnenroll!.id, this.dayCampToUnenrollFrom!.id).subscribe({
      next: () => {
        this.getEnrollments();
        this.showUnenrollSnackbar = true;
        setTimeout(() => this.showUnenrollSnackbar = false, 2900);
      },
      error: err => {
        console.log(err);
      }
    })
    this.resetUnenrollmentEntities();
  }

  private resetUnenrollmentEntities(): void {
    this.childToUnenroll = null;
    this.dayCampToUnenrollFrom = null;
  }
}
