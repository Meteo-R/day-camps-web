import {Component, Input, OnInit} from '@angular/core';
import {Child} from "../../../../model/interfaces/child";

@Component({
  selector: 'app-children-table',
  templateUrl: './children-table.component.html',
  styleUrls: ['./children-table.component.css']
})
export class ChildrenTableComponent implements OnInit {
  @Input() children?: Child[];

  constructor() { }

  ngOnInit(): void {
  }

}
