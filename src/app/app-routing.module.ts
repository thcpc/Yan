import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraineeDetailComponent } from './trainee-detail/trainee-detail.component';
import { TraineeReviewComponent } from './trainee-review/trainee-review.component';
import { TraineesComponent } from './trainees/trainees.component';

const routes: Routes = [
  {path:'trainees', component:TraineesComponent},
  {path:'', redirectTo:'/trainees', pathMatch:'full'},
  {path:'detail/:id', component:TraineeDetailComponent},
  {path:'trainees/review', component:TraineeReviewComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
