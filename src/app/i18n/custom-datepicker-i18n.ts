import { Injectable } from "@angular/core";
import { NgbDatepickerI18n, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

const I18N_VALUES = {
    'zh': {
      weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      weekLabel: '月'
    }
    // other languages you would support
  };
  
  // Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
  // use the Angular LOCALE_ID value
  @Injectable()
  export class I18n {
    language = 'zh';
  }
  
  // Define custom service providing the months and weekdays translations
  @Injectable()
  export class CustomDatepickerI18n extends NgbDatepickerI18n {
    constructor(private _i18n: I18n) { super(); }
  
    getWeekdayLabel(weekday: number): string { 
        return I18N_VALUES.zh.weekdays[weekday-1];
        // return I18N_VALUES[this._i18n.language].weekdays[weekday - 1]; 
    }
    override getWeekLabel(): string {
        return I18N_VALUES.zh.weekLabel; 
        // return I18N_VALUES[this._i18n.language].weekLabel; 
    }
    getMonthShortName(month: number): string { 
        return I18N_VALUES.zh.months[month - 1]; 
    }
    getMonthFullName(month: number): string { return this.getMonthShortName(month); }
    getDayAriaLabel(date: NgbDateStruct): string { return `${date.day}-${date.month}-${date.year}`; }
  }