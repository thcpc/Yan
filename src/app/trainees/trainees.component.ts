import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, debounceTime, map } from 'rxjs';
import { AlertErrorComponent } from '../alert-error/alert-error.component';
import { AlertSuccessComponent } from '../alert-success/alert-success.component';
import { TraineeDef } from '../model/defs/tranees/trainee.def';
import { TraineeDto } from '../model/dto/response/tranees/trainee.dto';
import { TraineesDto } from '../model/dto/response/tranees/trainees.dto';
import { TraineeService } from '../services/trainee.service';

@Component({
  selector: 'app-trainees',
  templateUrl: './trainees.component.html',
  styleUrls: ['./trainees.component.css']
})
export class TraineesComponent implements OnInit {
  trainees:TraineeDef[] = [];
 
  constructor(private traineeService: TraineeService,private modalService: NgbModal) { }
  
  isSigning:boolean = false;

  ngOnInit(): void {
    this.getTrainess();    
  }


  
  
 


  signIn(traineId:number):void{
    this.isSigning = true;
    const resp = this.traineeService.sign(traineId);
    const r = resp.pipe(
      catchError(this.traineeService.handleHttpError),
      this.traineeService.handleRespError
    )

    r.subscribe( {next: (trainDto) => this.updateTraineesSign(trainDto),
        error: (e) => this.openErr(e)})
  }

  updateTraineesSign(trainDto:TraineeDto){
      this.trainees
      .filter(tDef=>tDef.traineeId == trainDto.payLoad.traineeId)
      .flatMap(tDef=>tDef.latestAttendanceDate = trainDto.payLoad.latestAttendanceDate)
      this.isSigning = false
      this.openSuccess("签到成功")
      
    }

  getTrainess():void{
      this.traineeService.getTrainees().subscribe(dto=>
        dto.payLoad.map((trainee)=>this.trainees.push(trainee))
      //  tranees.map((trainee)=>this.trainees.push(new TraineeDef(trainee)))
      );
  
  }

  openErr(e:any) {
		const modalRef = this.modalService.open(AlertErrorComponent,{ centered: true });
		modalRef.componentInstance.err = e;
	}

  openSuccess(msg: string){
    const modalRef = this.modalService.open(AlertSuccessComponent,{ centered: true });
		modalRef.componentInstance.msg = msg;
  }

  appendNew(e: TraineeDto){
    this.trainees.push(e.payLoad);
  }

}
