import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'signStatus'})
export class SignStatusPipe implements PipeTransform {
  transform(isReviewed: number): string {
    if(isReviewed == 2) { return "等待确认";}
    else if(isReviewed == 1) {return "有效";}
    return "无效";
  }
}