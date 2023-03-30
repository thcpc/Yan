import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap, throwError } from 'rxjs';
import { TraineeDetailDto } from '../model/dto/response/trainee-detail/trainee-detail.dto';
import { TraineeSignDto } from '../model/dto/request/trainee-sign.dto';
import { TraineeDto } from '../model/dto/response/tranees/trainee.dto';
import { TraineesDto } from '../model/dto/response/tranees/trainees.dto';
import { ResponseBase } from '../model/dto/response/response.base'
import { BaseService } from './base.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TraineeMonthDto } from '../model/dto/response/trainee-detail/trainee-month.dto';
import { newTraineeDto } from '../model/dto/request/new-trainee.dto';
import { environment } from 'src/environments/environment';
import { TraineeSignDetailsDto } from '../model/dto/response/trainee-detail/trainee-signdetails.dto';
import { AttendanceReviewDto } from '../model/dto/response/tranees/attendance.review.dto';
import { TraineeReviewDTO } from '../model/dto/request/trainee-review.dto';

@Injectable({
  providedIn: 'root'
})
export class TraineeService extends BaseService {

  // 获取所有的训练者
  private traineesUrl = `${environment.url}/yan/trainee/all`;  
  // 签到
  private traineeSignUrl = `${environment.url}/yan/trainee/sign`;

  // 获取训练的年数
  private traineeYearUrl = `${environment.url}/yan/trainee/years`;
  // 获取每月的次数
  private traineeMonthUrl = `${environment.url}/yan/trainee/month`;

  private traineeMonthRangeUrl = `${environment.url}/yan/trainee/traineeMonthDay`;

  private traineeCreateUrl = `${environment.url}/yan/trainee/create`;

  private trainSignDetailsUrl = `${environment.url}/yan/trainee/signDetails`;

  private attendaceUnReviewUrl = `${environment.url}/yan/unReview`;

  private traineeReviewUrl = `${environment.url}/yan/review`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    super();
  }

  getTrainees(): Observable<TraineesDto>{
    return this.http.get<TraineesDto>(this.traineesUrl);
  }

  getTraineeYear(traineeId:number):Observable<TraineeDetailDto>{
    const url = `${this.traineeYearUrl}`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams().set('traineeId', traineeId)
    }
    return this.http.get<TraineeDetailDto>(this.traineeYearUrl,options);
  }

  getTraineeYearMonth(traineeId:number,year:string):Observable<TraineeDetailDto>{
    const url = `${this.traineeMonthUrl}`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams().set('traineeId', traineeId).set('year',year)
    }
    return this.http.get<TraineeDetailDto>(url,options);
  }

  getTraineeMonthRangeDay(traineeId:number,year:number,month:number):Observable<TraineeMonthDto>{
    const url = `${this.traineeMonthRangeUrl}`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams().set('traineeId', traineeId).set('year',year).set('month',month)
    }
    return this.http.get<TraineeMonthDto>(url,options);
  }

  getTraineeSignDetails(traineeId:number,year:number,month:number):Observable<TraineeSignDetailsDto>{
    const url = `${this.trainSignDetailsUrl}`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams().set('traineeId', traineeId).set('year',year).set('month',month)
    }
    return this.http.get<TraineeSignDetailsDto>(url,options);
  }



  sign(user_id:number):Observable<TraineeDto>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.post<TraineeDto>(this.traineeSignUrl,new TraineeSignDto(user_id),options);
  }

  create(name: string, nickName:string, level:number):Observable<TraineeDto>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.post<TraineeDto>(this.traineeCreateUrl, new newTraineeDto(name,nickName,level),options);
  }

  traineeReview(traineesAttendanceReviewId:number,active:number,reason:string):Observable<TraineeDto>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.post<TraineeDto>(this.traineeReviewUrl, new TraineeReviewDTO(traineesAttendanceReviewId,active,reason),options);
  }

  getAllAttendanceUnReview():Observable<AttendanceReviewDto>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<AttendanceReviewDto>(this.attendaceUnReviewUrl,options);
  }

  
}




