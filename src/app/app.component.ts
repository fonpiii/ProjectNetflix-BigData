import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import Swal from 'sweetalert2';
import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  Const,
  InterestType,
  Anime,
  Category,
  Criminal,
  Action,
} from './../shared/const';

export interface Chart {
  name: string;
  value: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public results: Chart[] = [];
  public datas: any[] = [];
  public tempDatas: any[] = [];
  public sexs: any[] = [];
  public category: any[] = [];
  public breadcrumbs: any[] = [];
  public view: any[] = [700, 400];
  public studentType = '';
  public currentStepBreadcrumb = '';
  public breadcrumbLevel = {
    Level1: '',
    Level2: '',
    Level3: '',
    Level4: '',
  };
  // options
  gradient = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(
    private db: AngularFireDatabase,
    private appService: AppService
  ) {}

  ngOnInit() {
    // Get all
    this.appService.GetMasterData().subscribe((data) => {
      data.forEach((element) => {
        this.datas.push(element.payload.val());
      });
    });

    // Get sex
    this.sexs = this.appService.GetSexAll();

    // Get category
    this.category = this.appService.GetCategoryAll();
  }

  imageStudentOnClick(studentType: string) {
    this.studentType = studentType;
    this.getDataBySex(studentType);
  }

  onSelect(data): void {
    if (this.currentStepBreadcrumb === 'Sex') {
      this.getDataByCategory(data);
    } else if (this.currentStepBreadcrumb === 'Category') {
      this.getDataByInterest(data);
    }
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getDataBySex(studentType: string) {
    this.currentStepBreadcrumb = 'Sex';
    this.breadcrumbLevel.Level1 = '';
    this.breadcrumbLevel.Level2 = '';
    this.breadcrumbLevel.Level3 = '';
    this.breadcrumbLevel.Level4 = '';
    const tempResult = [];
    this.sexs.forEach((element) => {
      tempResult.push({
        name: element,
        value: this.datas.filter(
          (x) =>
            x.Sex === element &&
            x.StudentType === studentType &&
            x.Netflix === 'ใช้บริการ'
        ).length,
      });
    });
    this.results = tempResult;
  }

  getDataByCategory(data) {
    if (data.name) {
      this.breadcrumbLevel.Level1 = data.name;
    } else {
      this.breadcrumbLevel.Level1 = data;
    }
    this.breadcrumbLevel.Level2 = '';
    this.breadcrumbLevel.Level3 = '';
    this.breadcrumbLevel.Level4 = '';

    this.currentStepBreadcrumb = 'Category';
    let tempResult = [];
    this.tempDatas = [];
    // Male
    if (this.breadcrumbLevel.Level1 === Const.male) {
      this.tempDatas = this.datas.filter(
        (x) =>
          x.Sex === Const.male &&
          x.StudentType === this.studentType &&
          x.Netflix === 'ใช้บริการ'
      );
      // Female
    } else if (this.breadcrumbLevel.Level1 === Const.female) {
      this.tempDatas = this.datas.filter(
        (x) =>
          x.Sex === Const.female &&
          x.StudentType === this.studentType &&
          x.Netflix === 'ใช้บริการ'
      );
      // LBGTQ
    } else if (this.breadcrumbLevel.Level1 === Const.lbgtq) {
      this.tempDatas = this.datas.filter(
        (x) =>
          x.Sex === Const.lbgtq &&
          x.StudentType === this.studentType &&
          x.Netflix === 'ใช้บริการ'
      );
    } else if (this.breadcrumbLevel.Level1 === Const.none) {
      this.tempDatas = this.datas.filter(
        (x) =>
          x.Sex === Const.none &&
          x.StudentType === this.studentType &&
          x.Netflix === 'ใช้บริการ'
      );
    }

    if (this.tempDatas.length > 0) {
      tempResult = [];
      this.category.forEach((element) => {
        tempResult.push({
          name: element,
          value: this.tempDatas.filter((x) => x.Category === element).length,
        });
      });
      this.results = tempResult;
    }
  }

  getDataByInterest(data) {
    if (data.name) {
      this.breadcrumbLevel.Level2 = data.name;
      this.currentStepBreadcrumb = 'Interest';
      const tempResult = [];
      this.tempDatas = this.tempDatas.filter((x) => x.Category === data.name);
      switch (data.name) {
        case Category.Anime:
          Anime.forEach((currentValue, index) => {
            tempResult.push({
              name: Anime[index].Name,
              value: this.tempDatas.filter(
                (x) => x[Anime[index].Name] === InterestType[0].Type
              ).length,
            });
          });
          break;
        case Category.Criminal:
          Criminal.forEach((currentValue, index) => {
            tempResult.push({
              name: Criminal[index].Name,
              value: this.tempDatas.filter(
                (x) => x[Criminal[index].Name] === InterestType[0].Type
              ).length,
            });
          });
          break;
        case Category.Action:
          Action.forEach((currentValue, index) => {
            tempResult.push({
              name: Action[index].Name,
              value: this.tempDatas.filter(
                (x) => x[Action[index].Name] === InterestType[0].Type
              ).length,
            });
          });
          break;
      }
      this.results = tempResult;
    }
  }
}
