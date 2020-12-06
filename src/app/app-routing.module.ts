import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RecommenderComponent } from './Recommender/recommender.component';
import { HomeComponent } from './home/home.component';
import { VoteComponent } from './vote/vote.component';


const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'Recommender', component: RecommenderComponent },
  { path: 'Home', component: HomeComponent},
  { path: 'Vote', component: VoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
