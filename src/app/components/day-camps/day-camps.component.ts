import { Component, OnInit } from '@angular/core';
import {DayCamp} from "../../model/interfaces/day-camp";
import {DayCampsService} from "../../services/day-camps.service";

@Component({
  selector: 'app-day-camps',
  templateUrl: './day-camps.component.html',
  styleUrls: ['./day-camps.component.css']
})
export class DayCampsComponent implements OnInit {
  public dayCamps!: DayCamp[];

  constructor(private dayCampsService: DayCampsService) {
  }

  ngOnInit(): void {
    this.dayCampsService.getDayCamps().subscribe({
      next: value => {
        this.dayCamps = value.dayCamps;
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
