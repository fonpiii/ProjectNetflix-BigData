import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private itemsRef = this.db.list('MasterData');
  private datas: Observable<any>;

  constructor(private db: AngularFireDatabase) {}

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
}
