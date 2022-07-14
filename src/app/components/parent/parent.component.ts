import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit { // TODO delete this component
  content!: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getParentBoard().subscribe({
      next: value => {
        this.content = value;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    })
  }
}
