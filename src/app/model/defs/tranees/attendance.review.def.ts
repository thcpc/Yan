import { ThisReceiver } from "@angular/compiler";
import { TraineesDto } from "../../dto/response/tranees/trainees.dto";

export interface AttendanceReviewDef{
    id:number;
    yanAttendanceId: number ;
    traineeName: string ;
    traineeNickName: string ;
    isReviewed: number ;
    createDt:Date;
    reason: string
}