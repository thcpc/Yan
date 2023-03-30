import { AttendanceReviewDef } from "src/app/model/defs/tranees/Attendance.review.def";
import { ResponseBase } from "../response.base";


export interface AttendanceReviewDto extends ResponseBase{
    payLoad:AttendanceReviewDef[];     
}