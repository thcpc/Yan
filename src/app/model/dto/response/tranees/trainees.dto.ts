import { TraineeDef } from "../../../defs/tranees/trainee.def";
import { ResponseBase } from "../response.base";


export interface TraineesDto extends ResponseBase{
    payLoad:TraineeDef[];     
}