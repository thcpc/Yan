import { TraineeSignDetailsDef } from "src/app/model/defs/trainee-detail/trainee-signdetails.def";
import { ResponseBase } from "../response.base";

export interface TraineeSignDetailsDto extends ResponseBase{
    payLoad:TraineeSignDetailsDef[];     
}