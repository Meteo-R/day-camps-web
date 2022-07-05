import {School} from "./school";
import {Child} from "./child";

export interface DayCamp {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  capacity: number;
  numberOfEnrolled: number;
  school: School;
  child: Child[];
}
