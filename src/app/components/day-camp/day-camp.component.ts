import {Component, Input, OnInit} from '@angular/core';
import {DayCamp} from "../../model/interfaces/day-camp";

@Component({
  selector: 'app-day-camp',
  templateUrl: './day-camp.component.html',
  styleUrls: ['./day-camp.component.css']
})
export class DayCampComponent implements OnInit {
  @Input() dayCamp?: DayCamp;

  constructor() { }

  ngOnInit(): void {
  }

}
