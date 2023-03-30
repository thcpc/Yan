import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs';
import { AlertErrorComponent } from '../alert-error/alert-error.component';
import { AlertSuccessComponent } from '../alert-success/alert-success.component';
import { AttendanceReviewDef } from '../model/defs/tranees/Attendance.review.def';
import { TraineeService } from '../services/trainee.service';

@Component({
  selector: 'app-trainee-review',
  templateUrl: './trainee-review.component.html',
  styleUrls: ['./trainee-review.component.css']
})
export class TraineeReviewComponent implements OnInit {

  traineesAttendance: AttendanceReviewDef[] = []

  isClick = false;

  constructor(private traineeService: TraineeService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.init();
  }

  active(traineesAttendanceReviewId:number):void {
    this.traineeService.traineeReview(traineesAttendanceReviewId,1,"").pipe(
      catchError(this.traineeService.handleHttpError),
      this.traineeService.handleRespError).subscribe({
        next: () => {
          let record = this.traineesAttendance.filter((x)=> x.id ===traineesAttendanceReviewId)[0];    
          record.isReviewed = 1;
          this.openSuccess("有效签到");
        },
        error: (e) => this.openErr(e)
      })
  }

  inactive(traineesAttendanceReviewId:number, reason:string):void {
    this.traineeService.traineeReview(traineesAttendanceReviewId,0,reason).pipe(
      catchError(this.traineeService.handleHttpError),
      this.traineeService.handleRespError).subscribe({
        next: () => {
          let record = this.traineesAttendance.filter((x)=>x.id ===traineesAttendanceReviewId)[0];    
          record.isReviewed = 0;
          record.reason = reason;
        },
        error: (e) => this.openErr(e)
      })
  }


  init(){
    this.traineeService.getAllAttendanceUnReview().pipe(
      catchError(this.traineeService.handleHttpError),
      this.traineeService.handleRespError)
    .subscribe({ 
        next: (traineesAttendanceDto) => {
          this.traineesAttendance = traineesAttendanceDto.payLoad          
          
        },
        error: (e) => this.openErr(e)
      }
    );;
    
  }

  open(content: any, attendance_id: number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((reason) => {
      if(reason ===""){ 
        this.openErr("请输入签到无效的原因");
        return 
      }
      this.inactive(attendance_id,reason)
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openErr(e:any) {
		const modalRef = this.modalService.open(AlertErrorComponent,{ centered: true });
		modalRef.componentInstance.err = e;
	}

  openSuccess(msg: string){
    const modalRef = this.modalService.open(AlertSuccessComponent,{ centered: true });
		modalRef.componentInstance.msg = msg;
  }

}
