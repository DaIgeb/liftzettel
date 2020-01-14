import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RatingListComponent } from './rating/rating-list/rating-list.component';
import { ArrangementListComponent } from './arrangement/arrangement-list/arrangement-list.component';
import { EnclosureListComponent } from './enclosure/enclosure-list/enclosure-list.component';



const routes: Routes = [
  { path: 'rating', component: RatingListComponent },
  { path: 'rating/:id', component: RatingListComponent },
  
  { path: 'arrangement', component: ArrangementListComponent },
  { path: 'arrangement/:id', component: ArrangementListComponent },
  
  { path: 'enclosure', component: EnclosureListComponent },
  { path: 'enclosure/:id', component: EnclosureListComponent },

  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
