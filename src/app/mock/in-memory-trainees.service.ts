import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TraineesDto } from '../model/dto/response/tranees/trainees.dto'


@Injectable({
  providedIn: 'root'
})
export class InMemoryTraineesService implements InMemoryDbService{

  createDb() {
    const trainees = [
      {id:1, name:"jia",latestTrainDate: new Date("2022-01-01"),nickName:"hh"},
      {id:2, name:"yi",latestTrainDate: new Date("2022-01-02"),nickName:"jjj"}
    ];
    const traineeYears = [
      {user_id:1, year: '2022', count:[8, 4, 3, 6, 5, 6, 6,8, 5, 6, 6, 6]},
      {user_id:2, year: '2021', count:[8, 4, 3, 7, 5, 6, 6,8, 5, 7, 6, 6]}
    ];
    return {trainees,traineeYears};
  }

  // genId(trainees: TraineeDto[]): number {
  //   return trainees.length > 0 ? Math.max(...trainees.map(tranee => tranee.id)) + 1 : 11;
  // }
}
