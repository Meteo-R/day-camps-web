import {Component, OnInit} from '@angular/core';
import {Child} from "../../../model/interfaces/child";
import {ChildrenService} from "../../../services/children.service";
import {EnrollmentsService} from "../../../services/enrollments.service";
import {DayCamp} from "../../../model/interfaces/day-camp";

@Component({
  selector: 'app-enroll-child',
  templateUrl: './enroll-child.component.html',
  styleUrls: ['./enroll-child.component.css']
})
export class EnrollChildComponent implements OnInit {
  public children!: Child[];
  public selectedChild: Child | null = null;
  public possibleDayCamps!: DayCamp[];

  showEnrollSnackbar: boolean = false;

  constructor(
    private childrenService: ChildrenService,
    private enrollmentsService: EnrollmentsService,
  ) {
  }

  ngOnInit(): void {
    this.childrenService.getChildren().subscribe({
      next: value => this.children = value.children,
      error: err => console.log(err)
    })
  }

  onChildChange(child: Child | null): void {
    this.refreshPossibleDayCamps(child);
  }

  onEnroll(child: Child | null, dayCamp: DayCamp) {
    if (child != null) {
      this.enrollmentsService.enrollChild(child.id, dayCamp.id).subscribe({
        next: value => {
          this.showEnrollSnackbar = true;
          setTimeout(() => this.showEnrollSnackbar = false, 2900);
          this.refreshPossibleDayCamps(child);
        },
        error: err => console.log(err)
      });
    }
  }

  private refreshPossibleDayCamps(child: Child | null) {
    if (child != null) {
      this.enrollmentsService.getPossibleDayCamps(child.id).subscribe({
        next: value => {
          this.possibleDayCamps = value.dayCamps;
          console.log(this.possibleDayCamps);
        },
        error: err => console.log(err)
      })
    }
  }
}
