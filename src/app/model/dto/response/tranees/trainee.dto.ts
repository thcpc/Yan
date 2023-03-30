import { TraineeDef } from "../../../defs/tranees/trainee.def";
import { ResponseBase } from "../response.base";


export interface TraineeDto extends ResponseBase{
    payLoad:TraineeDef;     
}