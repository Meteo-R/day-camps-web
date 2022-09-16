import {Parent} from "./parent";

export interface Child {
  id: number;
  firstName: string;
  lastName: string;
  parent?: Parent;
}
