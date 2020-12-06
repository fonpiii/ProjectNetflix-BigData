import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VoteService } from './vote.service';
import Swal from 'sweetalert2';
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

export interface BarChart {
  name: string;
  series: [
    {
      name: string;
      value: number;
    },
    {
      name: string;
      value: number;
    }
  ];
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  public categorys: any[] = [];
  public listMovie: any[] = [];
  public category = '';
  public dpSelected = '';
  isActive = false;
  barChart: any[] = [];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Movie';
  showYAxisLabel = true;
  yAxisLabel = 'Vote';
  legendTitle = 'Like/Dislike';

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
    private homService: HomeService,
    private spinner: NgxSpinnerService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.homService.GetCategoryAll().subscribe((data) => {
      data.forEach((element) => {
        this.categorys.push(element.payload.val());
      });
      this.dpSelected = this.categorys[0];
      this.setBarChart(this.dpSelected, 'init');
    });
  }

  setBarChart(currentCategory: string, state: string) {
    let category = '';
    const listMovie = [];
    if (state === 'init') {
      category = this.getTypeCategoryEnglish(currentCategory);
    } else {
      category = currentCategory;
    }
    // console.log(category);
    if (category !== null || category !== '') {
      this.voteService.GetMovieByCategory(category).subscribe((data) => {
        data.forEach((element) => {
          listMovie.push(element.payload.val());
        });
        if (listMovie.length > 0) {
          const tempMovie = [];
          listMovie[0].forEach((element, index) => {
            const objMovie: BarChart = {
              name: element.Name,
              series: [
                {
                  name: 'Like',
                  value: Number(element.Like),
                },
                {
                  name: 'Dislike',
                  value: Number(element.DisLike),
                },
              ],
            };
            tempMovie.push(objMovie);
          });
          this.barChart = tempMovie;
          if (state === 'init') {
            this.dpSelected = currentCategory;
          } else {
            this.dpSelected = this.getTypeCategoryThai(currentCategory);
          }
        }
        this.spinner.hide();
      });
    }
  }

  onClickVote(type: string) {
    this.category = '';
    this.listMovie = [];
    this.category = this.getTypeCategoryEnglish(type);
    this.listMovie = this.setMovieByCategory(this.category);
  }

  getTypeCategoryEnglish(type: string): any {
    let category = '';
    switch (type) {
      case 'กีฬา':
        category = 'Sport';
        break;
      case 'คลาสสิก':
        category = 'Classic';
        break;
      case 'ความบันเทิงของไทย':
        category = 'Variety';
        break;
      case 'คอมเมดี้':
        category = 'Comedy';
        break;
      case 'จากเอเซีย':
        category = 'Asia';
        break;
      case 'ชนะรางวัล':
        category = 'Win';
        break;
      case 'ไซไฟ':
        category = 'Sifi';
        break;
      case 'ดราม่า':
        category = 'Drama';
        break;
      case 'เด็กและครอบครัว':
        category = 'Baby';
        break;
      case 'ประวัติศาสตร์':
        category = 'History';
        break;
      case 'ผลงานอินดี้':
        category = 'Indy';
        break;
      case 'เพลงและดนตรี':
        category = 'Music';
        break;
      case 'แฟนตาซี':
        category = 'Fantacy';
        break;
      case 'ระทึกขวัญ':
        category = 'Thriller';
        break;
      case 'โรแมนซ์':
        category = 'Romance';
        break;
      case 'วิทยาศาสตร์และธรรมชาติ':
        category = 'ScienceAndNature';
        break;
      case 'สยองขวัญ':
        category = 'Horror';
        break;
      case 'สารคดี':
        category = 'Documentary';
        break;
      case 'อนิเมะ':
        category = 'Anime';
        break;
      case 'อาชญากรรม':
        category = 'Criminal';
        break;
      case 'แอ็คชั่น':
        category = 'Action';
        break;
    }
    return category;
  }

  getTypeCategoryThai(type: string): any {
    let category = '';
    switch (type) {
      case 'Sport':
        category = 'กีฬา';
        break;
      case 'Classic':
        category = 'คลาสสิก';
        break;
      case 'Variety':
        category = 'ความบันเทิงของไทย';
        break;
      case 'Comedy':
        category = 'คอมเมดี้';
        break;
      case 'Asia':
        category = 'จากเอเซีย';
        break;
      case 'Win':
        category = 'ชนะรางวัล';
        break;
      case 'Sifi':
        category = 'ไซไฟ';
        break;
      case 'Drama':
        category = 'ดราม่า';
        break;
      case 'Baby':
        category = 'เด็กและครอบครัว';
        break;
      case 'History':
        category = 'ประวัติศาสตร์';
        break;
      case 'Indy':
        category = 'ผลงานอินดี้';
        break;
      case 'Music':
        category = 'เพลงและดนตรี';
        break;
      case 'Fantacy':
        category = 'แฟนตาซี';
        break;
      case 'Thriller':
        category = 'ระทึกขวัญ';
        break;
      case 'Romance':
        category = 'โรแมนซ์';
        break;
      case 'ScienceAndNature':
        category = 'วิทยาศาสตร์และธรรมชาติ';
        break;
      case 'Horror':
        category = 'สยองขวัญ';
        break;
      case 'Documentary':
        category = 'สารคดี';
        break;
      case 'Anime':
        category = 'อนิเมะ';
        break;
      case 'Criminal':
        category = 'อาชญากรรม';
        break;
      case 'Action':
        category = 'แอ็คชั่น';
        break;
    }
    return category;
  }

  setMovieByCategory(type: string): any {
    const results = [];
    if (type !== null || type !== '') {
      this.voteService.GetMovieByCategory(type).subscribe((data) => {
        data.forEach((element) => {
          results.push(element.payload.val());
        });
        // this.setBarChart();
      });
    }
    return results;
  }

  onClick() {
    this.isActive = !this.isActive;
  }

  onClickLike(movie: any) {
    if (movie.Status === 'None' || movie.Status === 'DisLike') {
      movie.Status = 'Like';
    } else {
      movie.Status = 'None';
    }
  }

  onClickDisLike(movie: any) {
    if (movie.Status === 'None' || movie.Status === 'Like') {
      movie.Status = 'DisLike';
    } else {
      movie.Status = 'None';
    }
  }

  onSubmit() {
    this.listMovie[0].forEach((element, index) => {
      if (element.Status === 'Like') {
        element.Like++;
      } else if (element.Status === 'DisLike') {
        element.DisLike++;
      }
      element.Status = 'None';
      this.voteService.UpdateMoviesByCategory(this.category, element, index);
      this.setBarChart(this.category, 'vote');
      console.log(this.listMovie[0]);
    });
    Swal.fire('ทำการโหวต', 'บันทึกการโหวตของท่านเรียบร้อยแล้ว', 'success');
  }

  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
