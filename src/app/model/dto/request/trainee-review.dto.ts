export class TraineeReviewDTO{
    traineesAttendanceReviewId: number;
    active: number;
    reason:string;
    constructor(traineesAttendanceReviewId:number, acitve:number, reason:string){
        this.traineesAttendanceReviewId = traineesAttendanceReviewId;
        this.active = acitve;
        this.reason = reason;
    }
}