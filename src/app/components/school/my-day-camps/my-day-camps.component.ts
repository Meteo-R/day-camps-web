import { Component, OnInit } from '@angular/core';
import {DayCamp} from "../../../model/interfaces/day-camp";
import {SchoolDayCampsService} from "../../../services/school-day-camps.service";

@Component({
  selector: 'app-my-day-camps',
  templateUrl: './my-day-camps.component.html',
  styleUrls: ['./my-day-camps.component.css']
})
export class MyDayCampsComponent implements OnInit {
  public futureDayCamps?: DayCamp[];
  public ongoingDayCamps?: DayCamp[];
  public pastDayCamps?: DayCamp[];

  constructor(private schoolDayCampsService: SchoolDayCampsService) { }

  ngOnInit(): void {
    this.schoolDayCampsService.getFutureDayCamps().subscribe({
      next: value => {
        this.futureDayCamps = value.dayCamps;
        console.log(this.futureDayCamps);
      },
      error: err => {
        console.log(err);
      }
    })
    this.schoolDayCampsService.getOngoingDayCamps().subscribe({
      next: value => {
        this.ongoingDayCamps = value.dayCamps;
        console.log(this.ongoingDayCamps);
      },
      error: err => {
        console.log(err);
      }
    })
    this.schoolDayCampsService.getPastDayCamps().subscribe({
      next: value => {
        this.pastDayCamps = value.dayCamps;
        console.log(this.pastDayCamps);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
