import { Component, OnInit } from '@angular/core';
import {DayCamp} from "../../model/interfaces/day-camp";
import {DayCampsService} from "../../services/day-camps.service";

@Component({
  selector: 'app-day-camps',
  templateUrl: './day-camps.component.html',
  styleUrls: ['./day-camps.component.css']
})
export class DayCampsComponent implements OnInit {
  public futureDayCamps!: DayCamp[];
  public ongoingDayCamps!: DayCamp[];
  public pastDayCamps!: DayCamp[];

  constructor(private dayCampsService: DayCampsService) {
  }

  ngOnInit(): void {
    this.dayCampsService.getFutureDayCamps().subscribe({
      next: value => {
        this.futureDayCamps = value.dayCamps;
      },
      error: err => {
        console.log(err);
      }
    })
    this.dayCampsService.getOngoingDayCamps().subscribe({
      next: value => {
        this.ongoingDayCamps = value.dayCamps;
      },
      error: err => {
        console.log(err);
      }
    })
    this.dayCampsService.getPastDayCamps().subscribe({
      next: value => {
        this.pastDayCamps = value.dayCamps;
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
