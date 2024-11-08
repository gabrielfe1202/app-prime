import { Conclusion } from "@/entities/conclusion";
import { GoalController } from "./goal.controller";
import { KidController } from "./kid.controller";
import { ScheduleController } from "./schedule.controller";
import { TitleController } from "./title.controller";
import { UserController } from "./user.controller";
import { ConclusionController } from "./conclusion.controller";

export const DI = {
  goal: new GoalController(),
  kid: new KidController(),
  titles: new TitleController(),
  user: new UserController(),
  schedule: new ScheduleController(),
  Conclusion: new ConclusionController(),
}