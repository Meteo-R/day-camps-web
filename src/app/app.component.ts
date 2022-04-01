import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'day-camps-web';
  private roles!: string[];
  isLoggedIn: boolean = false;
  showParentBoard: boolean = false;
  showSchoolBoard: boolean = false;
  username: string = "test_username";

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showParentBoard = this.roles.includes('ROLE_PARENT');
      this.showSchoolBoard = this.roles.includes('ROLE_SCHOOL');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
