import {Child} from "./child";
import {DayCamp} from "./day-camp";

export interface Enrollment {
  child: Child;
  dayCamps: DayCamp[];
}
