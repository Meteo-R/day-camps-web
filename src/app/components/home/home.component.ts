import { Component, OnInit } from '@angular/core';
import {DayCampsService} from "../../services/day-camps.service";
import {DayCamp} from "../../model/interfaces/day-camp";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private dayCamps!: DayCamp[];

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
