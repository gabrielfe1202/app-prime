import { GoalController } from "./goal.controller";
import { KidController } from "./kid.controller";
import { ScheduleController } from "./schedule.controller";
import { TitleController } from "./title.controller";
import { ConclusionController } from "./conclusion.controller";
import { IntroductionController } from "./introduction.controller";

export const DI = {
  goal: new GoalController(),
  kid: new KidController(),
  titles: new TitleController(),
  schedule: new ScheduleController(),
  Conclusion: new ConclusionController(),
  Introduction: new IntroductionController()
}