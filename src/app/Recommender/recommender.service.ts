import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommenderService {
  private readonly URL = 'https://cnn-api.herokuapp.com/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  async getMoviesByCollaborativeFiltering(): Promise<any> {
    let response: any = null;

    try{
      const url = this.URL + 'get_movies/';
      response = await this.http.get<any>(url, this.httpOptions).toPromise();
    } catch (eror) {
      console.log('Eror', eror);
    }
    return response;
  }
}
