import { TraineeMonthDef } from "src/app/model/defs/trainee-detail/trainee-month.def";
import { ResponseBase } from "../response.base";

export interface TraineeMonthDto extends ResponseBase{
    payLoad:TraineeMonthDef;
}