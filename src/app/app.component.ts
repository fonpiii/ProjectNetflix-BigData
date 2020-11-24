import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import Swal from 'sweetalert2';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public text = null;
  public datas: any[] = [];

  constructor(
    private db: AngularFireDatabase,
    private appService: AppService
  ) {}

  ngOnInit() {}

  async submit() {
    // this.db.list('/MasterData').push(this.googleFormJson);
    // for (const item of this.googleFormJson) {
    //   this.appService.pushMasterData(item);
    // }

    // Get all
    this.appService.GetMasterData().subscribe((data) => {
      // this.datas = data;
      // console.log(this.datas);
    });

    // Get by value
    this.appService
      .GetMasterDataByType('Category', 'ระทึกขวัญ')
      .subscribe((data) => {
        data.forEach((element) => {
          this.datas.push(element.payload.val());
          // console.log(this.datas);
        });
      });
  }
}
