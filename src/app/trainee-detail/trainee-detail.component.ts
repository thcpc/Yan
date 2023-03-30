import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {NgbDateStruct, NgbCalendar, NgbDate, NgbDatepickerI18n, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from '../i18n/custom-datepicker-i18n';
import { TraineeService } from '../services/trainee.service';
import { catchError, map } from 'rxjs';
import { AlertErrorComponent } from '../alert-error/alert-error.component';
import { TraineeDetailDto } from '../model/dto/response/trainee-detail/trainee-detail.dto';
import { TraineeYearsDto } from '../model/dto/response/trainee-detail/trainee-years.dto';
import { TraineeYearDef } from '../model/defs/trainee-detail/trainee-year.def';
import { TraineeInfoDef } from '../model/defs/trainee-detail/trainee-info.def';
import { TraineeSignDetailsDef } from '../model/defs/trainee-detail/trainee-signdetails.def';


@Component({
  selector: 'app-trainee-detail',
  templateUrl: './trainee-detail.component.html',
  styleUrls: ['./trainee-detail.component.css'],
  providers:
      [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] 
})
export class TraineeDetailComponent implements OnInit {

  model!: NgbDateStruct;
  barOption:any;
  disabled = true;
  displayMonth?:boolean;
  traineesYears: TraineeYearDef[] = [];
  traineeId:number = -1 ;
  selectedYear:string = "";
  // trainInfodef!: TraineeInfoDef;
  rangeDate:NgbDate[] = []; 

  startDate!:NgbDate

  traineeSignDetails: TraineeSignDetailsDef[] = [];
  

  constructor(private location: Location, 
              private traineeService:TraineeService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private el:ElementRef) { }

  ngOnInit(): void {
    this.traineeId = this.route.snapshot.params['id']
    this.initTraineeYear(this.traineeId);
  }

  initTraineeYear(traineeId: number):void{
    this.traineeService.getTraineeYear(traineeId)
    .pipe(
      catchError(this.traineeService.handleHttpError),
      this.traineeService.handleRespError)
    .subscribe({ 
        next: (trainDetailDto) => {
          this.initYears(trainDetailDto)
          this.selectedYear = this.traineesYears[0].year;
          this.initBar(traineeId,this.traineesYears[0].year)
        },
        error: (e) => this.openErr(e)
      }
    );
  }

  initBar(traineeId:number, year:string):void{
    this.traineeService.getTraineeYearMonth(traineeId, year).pipe(
      catchError(this.traineeService.handleHttpError),
      this.traineeService.handleRespError)
    .subscribe({ 
        next: (trainDetailDto) => {
      // this.trainInfodef = trainDetailDto.payLoad;
      this.barOption = {
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月',
                 '7月', '8月', '9月', '10月','11月','12月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: trainDetailDto.payLoad.monthCount,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
        },
        error: (e) => this.openErr(e)
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  switchYear(year:string):void{
    console.log(year);
    this.selectedYear = year;
    this.initBar(this.traineeId,this.selectedYear);

  }

  initYears(trainYearsDto: TraineeYearsDto){
    this.traineesYears = trainYearsDto.payLoad
  }

  // onChartEvent(event: any, type: string) {
    
  //   this.displayMonth = true
    
  //   this.startDate = new NgbDate(Number(this.selectedYear),event.dataIndex+1,1);
  //   this.traineeService.getTraineeMonthRangeDay(this.traineeId, this.startDate.year,this.startDate.month).pipe(
  //     catchError(this.traineeService.handleHttpError),
  //     this.traineeService.handleRespError)
  //   .subscribe({ 
  //       next: (traineeMonthDto) => {          
  //         this.rangeDate = traineeMonthDto.payLoad.days.map(function(day:any){ 
  //           return new NgbDate(traineeMonthDto.payLoad.year,traineeMonthDto.payLoad.month,day)
  //         })
  //       },
  //       error: (e) => this.openErr(e)
  //     }
  //   );;
    
  // }

  onChartEvent(event: any, type: string) {
    
    this.displayMonth = true
    
    this.startDate = new NgbDate(Number(this.selectedYear),event.dataIndex+1,1);
    this.traineeService.getTraineeSignDetails(this.traineeId, this.startDate.year,this.startDate.month).pipe(
      catchError(this.traineeService.handleHttpError),
      this.traineeService.handleRespError)
    .subscribe({ 
        next: (traineeSignDetailsDto) => {
          this.traineeSignDetails = traineeSignDetailsDto.payLoad          
          // this.rangeDate = traineeSignDetailsDto.payLoad.days.map(function(day:any){ 
          //   return new NgbDate(traineeMonthDto.payLoad.year,traineeMonthDto.payLoad.month,day)
          // })
        },
        error: (e) => this.openErr(e)
      }
    );;
    
  }
  

  isRange(date: NgbDate) {
    return this.rangeDate.findIndex(e=>e.equals(date))!=-1;
    // return true;
  }

  openErr(e:any) {
		const modalRef = this.modalService.open(AlertErrorComponent,{ centered: true });
		modalRef.componentInstance.err = e;
	}

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      // this.closeResult = `Closed with: ${this.trainee.name} ${this.trainee.nickName}`;
      
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
