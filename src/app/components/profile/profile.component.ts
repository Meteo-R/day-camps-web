import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {RoleMapperService} from "../../services/mappers/role-mapper.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  readableRole: string[] = [];

  constructor(private tokenStorageService: TokenStorageService, private roleMapperService: RoleMapperService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    if (this.currentUser) {
      this.readableRole = this.roleMapperService.mapToReadableRoles(this.currentUser.roles);
    }
  }

}
