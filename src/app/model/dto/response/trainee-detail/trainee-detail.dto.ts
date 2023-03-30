import { TraineeInfoDef } from "src/app/model/defs/trainee-detail/trainee-info.def";
import { ResponseBase } from "../response.base";

export interface TraineeDetailDto extends ResponseBase{
    payLoad:TraineeInfoDef;
}