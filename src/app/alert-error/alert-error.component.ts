import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-err-msg',
  standalone: true, //独立组件
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css'],
  imports: [NgbAlertModule]
})
export class AlertErrorComponent {
	// @Input() name: any;
  @Input() err: any;

	constructor(public activeModal: NgbActiveModal) {}
}
