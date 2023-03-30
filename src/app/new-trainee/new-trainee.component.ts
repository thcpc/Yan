import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs';
import { AlertErrorComponent } from '../alert-error/alert-error.component';
import { newTraineeDto } from '../model/dto/request/new-trainee.dto';
import { TraineeService } from '../services/trainee.service';

@Component({
  selector: 'app-new-trainee',
  templateUrl: './new-trainee.component.html',
  styleUrls: ['./new-trainee.component.css']
})
export class NewTraineeComponent implements OnInit {

  @Output() outer = new EventEmitter();
  
  constructor(private modalService: NgbModal,
    private traineeService:TraineeService) { }
  ngOnInit(): void {
    // this.trainee = {name:"w w w",nickName:"发发发"};
  }

  setNewTrainee(name:string, nickName:string){
    // this.trainee.name = name;
    // this.trainee.nickName = nickName;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${this.trainee.name} ${this.trainee.nickName}`;
      let newTraineeInfo = result.split(";");
      if(newTraineeInfo[0] ==="" || newTraineeInfo[1] ===""){ 
        this.openErr("请输入用户姓名和昵称");
        return 
      }else if(newTraineeInfo[2]=== "-1"){ 
        this.openErr("请输入级别")
        return 
      }
      this.traineeService.create(newTraineeInfo[0],newTraineeInfo[1],newTraineeInfo[2]).pipe(
        catchError(this.traineeService.handleHttpError),
        this.traineeService.handleRespError)
      .subscribe({ 
          next: (traineeDto) => {          
            // console.log(traineeDto);
            this.outer.emit(traineeDto);
          },
          error: (e) => this.openErr(e)
        }
      );;
      
    }, (reason) => {this.getDismissReason(reason)});
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  openErr(e:any) {
		const modalRef = this.modalService.open(AlertErrorComponent,{ centered: true });
		modalRef.componentInstance.err = e;
	}

}
