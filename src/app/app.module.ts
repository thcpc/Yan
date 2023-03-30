import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TraineesComponent } from './trainees/trainees.component';
import { TraineeDetailComponent } from './trainee-detail/trainee-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewTraineeComponent } from './new-trainee/new-trainee.component';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTraineesService } from './mock/in-memory-trainees.service';
import { SignStatusPipe } from './pipes/sign-status.pipe';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { TraineeReviewComponent } from './trainee-review/trainee-review.component';
// import { ErrMsgComponent } from './err-msg/err-msg.component'


@NgModule({
  declarations: [
    AppComponent,
    TraineesComponent,
    TraineeDetailComponent,
    NewTraineeComponent,
    SignStatusPipe,
    TraineeReviewComponent,
    // AlertSuccessComponent
    // ErrMsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryTraineesService, { dataEncapsulation: false })
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryTraineeYearService, { dataEncapsulation: false }
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
