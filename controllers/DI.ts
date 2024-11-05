import { GoalController } from "./goal.controller";
import { KidController } from "./kid.controller";
import { TitleController } from "./title.controller";

export const DI = {
  goal: new GoalController(),
  kid: new KidController(),
  titles: new TitleController()
}