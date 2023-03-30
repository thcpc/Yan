import { ThisReceiver } from "@angular/compiler";
import { TraineesDto } from "../../dto/response/tranees/trainees.dto";

export interface TraineeDef{
    traineeId: number ;
    name: string ;
    nickName: string ;
    latestAttendanceDate: Date ;
}