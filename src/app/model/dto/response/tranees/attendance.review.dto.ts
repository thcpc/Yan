
import { AttendanceReviewDef } from "../../../defs/tranees/attendance.review.def";
import { ResponseBase } from "../response.base";


export interface AttendanceReviewDto extends ResponseBase{
    payLoad:AttendanceReviewDef[];     
}