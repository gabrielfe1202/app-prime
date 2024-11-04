import { GoalController } from "./goal.controller";
import { KidController } from "./kid.controller";

export const DI = {
  goal: new GoalController(),
  kid: new KidController(),
}