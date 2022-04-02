import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleMapperService {

  constructor() { }

  public mapToReadableRoles(roles: string[]): string[] {
    let readableRoles: string[] = [];
    for (let role of roles) {
      readableRoles.push(this.mapToReadableRole(role));
    }
    return readableRoles;
  }

  public mapToReadableRole(role: string): string {
    switch(role) {
      case "ROLE_PARENT": {
        return "Parent";
      }
      case "ROLE_SCHOOL": {
        return "School";
      }
      default: {
        return "Unknown";
      }
    }
  }
}
