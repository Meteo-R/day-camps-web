import { Component, OnInit } from '@angular/core';
import {ChildrenService} from "../../../services/children.service";
import {Child} from "../../../model/interfaces/child";

@Component({
  selector: 'app-my-children',
  templateUrl: './my-children.component.html',
  styleUrls: ['./my-children.component.css']
})
export class MyChildrenComponent implements OnInit {
  public children!: Child[];

  constructor(private childrenService: ChildrenService) {
  }

  ngOnInit(): void {
    this.childrenService.getChildren().subscribe({
      next: value => {
        this.children = value.children;
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
