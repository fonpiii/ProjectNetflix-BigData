import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private itemsRef = this.db.list('MasterData');

  constructor(private db: AngularFireDatabase) {}

  GetMovieByCategory(category: string): Observable<any> {
    return this.db.list('/' + category).snapshotChanges();
  }

  UpdateMoviesByCategory(category: string, data: any, index: any) {
    const itemsRef = this.db.list('/' + category + '/Movies');
    itemsRef.update(index.toString(), data);
  }
}
