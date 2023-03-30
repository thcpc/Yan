import { TraineeYearDef } from "src/app/model/defs/trainee-detail/trainee-year.def";
import { ResponseBase } from "../response.base";

export interface TraineeYearsDto extends ResponseBase{
    payLoad:TraineeYearDef[];
}