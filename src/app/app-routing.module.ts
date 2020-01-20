import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RatingListComponent } from './rating/rating-list/rating-list.component';
import { ArrangementListComponent } from './arrangement/arrangement-list/arrangement-list.component';
import { EnclosureListComponent } from './enclosure/enclosure-list/enclosure-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RatingCreateComponent } from './rating/rating-create/rating-create.component';



const routes: Routes = [
  { path: 'rating', component: RatingListComponent },
  { path: 'rating/:id', component: RatingListComponent },
  { path: 'rating/:id/new', component: RatingCreateComponent },
  
  { path: 'arrangement', component: ArrangementListComponent },
  { path: 'arrangement/:id', component: ArrangementListComponent },
  
  { path: 'enclosure', component: EnclosureListComponent },
  { path: 'enclosure/:id', component: EnclosureListComponent },

  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
