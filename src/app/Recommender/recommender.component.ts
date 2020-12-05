import { Component, OnInit } from '@angular/core';
import { RecommenderService } from '../Recommender/recommender.service';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.css']
})
export class RecommenderComponent implements OnInit {
  public moviesRecommender: any = {};

  constructor(private recommenderService: RecommenderService) { }

  async ngOnInit() {
    // Get movies model
    console.log(await this.recommenderService.getMoviesByCollaborativeFiltering());
    this.moviesRecommender = await this.recommenderService.getMoviesByCollaborativeFiltering();
  }

  getImage(fileName: any): string {
    console.log(fileName);
    let result = null;
    if (fileName === 'THE PURGE: ANARCHY') {
      result = 'assets/movies/THE PURGE ANARCHY.jpg';
    } else {
      result = 'assets/movies/' + fileName + '.jpg';
    }
    return result;
  }

}
