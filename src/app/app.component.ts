import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day-camps-web';
  isLoggedIn: boolean = false;
  showParentBoard: boolean = false;
  showSchoolBoard: boolean = false;
  username: string = "test_username";


  logout(): void {
    console.log("Logout functionality");
  }
}
