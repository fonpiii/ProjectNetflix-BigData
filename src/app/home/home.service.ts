import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  items: Observable<any[]>;
  private itemsRef = this.db.list('MasterData');
  private datas: Observable<any>;
  private readonly URL = 'https://cnn-api.herokuapp.com/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) {}

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

  pushMasterData(obj: any) {
    this.itemsRef.push(obj);
  }

  updateMasterData(obj: any, key: string) {
    this.itemsRef.set(key, obj);
  }

  GetMasterData(): Observable<any> {
    const citiesRef = this.itemsRef.query.orderByChild('Category').equalTo('ระทึกขวัญ');
    return this.itemsRef.snapshotChanges();
    // return datas;
    // console.log(this.datas);
  }

  GetMasterDataByType(type: string, key: string): Observable<any> {
    return this.db
      .list('/MasterData', (ref) =>
        ref.orderByChild(type).equalTo(key)
      )
      .snapshotChanges();
  }

  GetSexAll(): any {
    const sexs = [];
    this.db.list('/Sex').snapshotChanges().subscribe((data) => {
      data.forEach((element) => {
        sexs.push(element.payload.val());
      });
    });
    return sexs;
  }

  GetCategoryAll(): Observable<any> {
    const categorys = [];
    return this.db.list('/Category').snapshotChanges();
  }

  GetMovieByCategory(type: string): any {
    const movies = [];
    this.db.list('/' + type).snapshotChanges().subscribe((data) => {
      data.forEach((element) => {
        movies.push(element.payload.val());
      });
    });
    return movies;
  }
}
