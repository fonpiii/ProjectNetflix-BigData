import { AngularFireDatabase } from 'angularfire2/database';
import Swal from 'sweetalert2';
import { HomeService } from './home.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Const,
  InterestType,
  Anime,
  Category,
  Criminal,
  Action,
  Baby,
  Sport,
  Romance,
  Horror,
  ScienceAndNature,
  Drama,
  Fantacy,
  Classic,
  Thriller,
  Indy,
  Variety,
  Music,
  Win,
  Comedy,
  Asia,
  Sifi,
  History,
  Documentary,
  Movies,
} from './../../shared/const';
import { Component, OnInit } from '@angular/core';

export interface Chart {
  name: string;
  value: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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

  // options chart
  gradient = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: [
      '#FF3333',
      '#FF9933',
      '#FFFF33',
      '#99FF33',
      '#33FF33',
      '#33FF99',
      '#33FFFF',
      '#3399FF',
      '#3333FF',
      '#9933FF',
      '#FF33FF',
      '#FF3399',
      '#A0A0A0',
    ],
  };

  constructor(
    private homeService: HomeService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // Show spinner on load page
    this.spinner.show();

    // Get all
    this.homeService.GetMasterData().subscribe((data) => {
      data.forEach((element) => {
        this.datas.push(element.payload.val());
      });
    });

    // Get sex
    this.sexs = this.homeService.GetSexAll();

    // Get category
    this.homeService.GetCategoryAll().subscribe((data) => {
      data.forEach((element) => {
        this.category.push(element.payload.val());
      });

      // Hide spinner on load page success
      this.spinner.hide();
    });
  }

  // On click image student
  imageStudentOnClick(studentType: string) {
    this.setDefaults();
    this.studentType = studentType;
    this.getDataBySex(studentType);
  }

  // On select type chart by type
  onSelect(data): void {
    if (this.currentStepBreadcrumb === 'Sex') {
      this.getDataByCategory(data);
    } else if (this.currentStepBreadcrumb === 'Category') {
      this.getDataByInterest(data);
    }
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  // Get data type = sex and show chart
  getDataBySex(studentType: string) {
    const tempResult = [];
    this.currentStepBreadcrumb = 'Sex';
    this.setBreadcrumbDefault();

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

  // Get data type = category and show chart
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

  // Get data type = interest(Like) and show chart
  getDataByInterest(data) {
    if (data.name) {
      this.breadcrumbLevel.Level2 = data.name;
      this.currentStepBreadcrumb = 'Interest';
      let category = null;
      this.tempDatas = this.tempDatas.filter((x) => x.Category === data.name);
      switch (data.name) {
        case Category.Anime:
          category = Anime;
          break;
        case Category.Criminal:
          category = Criminal;
          break;
        case Category.Action:
          category = Action;
          break;
        case Category.Baby:
          category = Baby;
          break;
        case Category.Sport:
          category = Sport;
          break;
        case Category.Romance:
          category = Romance;
          break;
        case Category.Horror:
          category = Horror;
          break;
        case Category.ScienceAndNature:
          category = ScienceAndNature;
          break;
        case Category.Drama:
          category = Drama;
          break;
        case Category.Fantacy:
          category = Fantacy;
          break;
        case Category.Sifi:
          category = Sifi;
          break;
        case Category.Asia:
          category = Asia;
          break;
        case Category.Comedy:
          category = Comedy;
          break;
        case Category.Win:
          category = Win;
          break;
        case Category.Music:
          category = Music;
          break;
        case Category.Variety:
          category = Variety;
          break;
        case Category.Indy:
          category = Indy;
          break;
        case Category.Thriller:
          category = Thriller;
          break;
        case Category.Classic:
          category = Classic;
          break;
        case Category.History:
          category = History;
          break;
        case Category.Documentary:
          category = Documentary;
          break;
      }

      if (category !== null) {
        this.setMoviesByCategory(category);
      }
    }
  }

  // Set movie on show chart
  setMoviesByCategory(category: any) {
    const tempResult = [];
    category.forEach((currentValue, index) => {
      tempResult.push({
        name: category[index].Name,
        value: this.tempDatas.filter(
          (x) => x[category[index].Name] === InterestType[0].Type
        ).length,
      });
    });
    this.results = tempResult;
  }

  // Set data to default and clear data
  setDefaults() {
    this.results = [];
    this.tempDatas = [];
    this.currentStepBreadcrumb = '';
    this.setBreadcrumbDefault();
  }

  setBreadcrumbDefault() {
    this.breadcrumbLevel.Level1 = '';
    this.breadcrumbLevel.Level2 = '';
    this.breadcrumbLevel.Level3 = '';
    this.breadcrumbLevel.Level4 = '';
  }
}
