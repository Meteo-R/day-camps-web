import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit { // TODO delete this component
  content!: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getSchoolBoard().subscribe({
      next: value => {
        this.content = value;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    })
  }
}
