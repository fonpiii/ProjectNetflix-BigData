import { Component, OnInit } from '@angular/core';
import { RecommenderService } from '../Recommender/recommender.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recommender',
  templateUrl: './recommender.component.html',
  styleUrls: ['./recommender.component.css'],
})
export class RecommenderComponent implements OnInit {
  public moviesRecommender: any = {};

  constructor(
    private recommenderService: RecommenderService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit() {
    this.spinner.show();
    await this.recommenderService
      .getMoviesByCollaborativeFiltering()
      .then((data) => {
        this.moviesRecommender = data;
        this.spinner.hide();
      });
  }

  clickToLink(movie: string) {
    let link = '';
    switch (movie) {
      case `BLUMHOUSE'S FANTASY ISLAND`:
        link = '';
        break;
      case `VAN HELSING`:
        link =
          'https://www.youtube.com/watch?v=mxBHoLHQ-0c&t=39s&ab_channel=UniversalPictures';
        break;
      case `DARK SHADOWS`:
        link =
          'https://www.youtube.com/watch?v=N6tVdffCr_M&ab_channel=MovieclipsTrailers';
        break;
      case `HOMESTAY`:
        link = 'https://www.youtube.com/watch?v=M5b3VGe4QsA&ab_channel=GDH';
        break;
      case `9 Satra (2018)`:
        link =
          'https://www.youtube.com/watch?v=nqw_N4H0dJI&ab_channel=9satramovie';
        break;
      case `SEVEN`:
        link =
          'https://www.youtube.com/watch?v=znmZoVkCjpI&ab_channel=MovieclipsClassicTrailers';
        break;
      case `THE RED SEA DIVING RESORT`:
        link = 'https://www.youtube.com/watch?v=80WflPMzAcw&ab_channel=Netflix';
        break;
      case `SCARFACE`:
        link =
          'https://www.youtube.com/watch?v=a_z4IuxAqpE&ab_channel=Movieclips';
        break;
      case `SAVAGES`:
        link =
          'https://www.youtube.com/watch?v=xXNxKwAKGpw&ab_channel=MovieclipsTrailers';
        break;
      case `Bad Genius`:
        link = 'https://www.youtube.com/watch?v=CLdhN4oMxCQ&ab_channel=GDH';
        break;
      case `YOUR LIE IN APRIL`:
        link =
          'https://www.youtube.com/watch?v=3aL0gDZtFbE&ab_channel=AniplexUS';
        break;
      case `CAROLE & TUESDAY`:
        link =
          'https://www.youtube.com/watch?v=Q366dvZqGfc&ab_channel=DaikuMediaAnime';
        break;
      case `A Gift`:
        link = 'https://www.youtube.com/watch?v=gYVt3JB_bhA&ab_channel=GDH';
        break;
      case `Thai bann BNK`:
        link = 'https://www.youtube.com/watch?v=fOqdaqINocg&ab_channel=BNK48';
        break;
      case `CADAVER`:
        link = 'https://www.youtube.com/watch?v=Bc8sZbEEO8U&ab_channel=Netflix';
        break;
      case `Nobody Sleeps in the Woods Tonight`:
        link =
          'https://www.youtube.com/watch?v=sToeWY65OFs&ab_channel=PlayOnTrailer';
        break;
      case `THE SHINING`:
        link =
          'https://www.youtube.com/watch?v=5Cb3ik6zP2I&ab_channel=AndrewHenderson';
        break;
      case `IT`:
        link =
          'https://www.youtube.com/watch?v=FnCdOQsX5kc&ab_channel=WarnerBros.Pictures';
        break;
      case `TRAIN TO BUSAN`:
        link =
          'https://www.youtube.com/watch?v=pyWuHv2-Abk&ab_channel=ZeroMedia';
        break;
      case `Tom Yum Goong`:
        link =
          'https://www.youtube.com/watch?v=3NyT2AEyvvA&ab_channel=techakarapol';
        break;
      case `KUNG FU TOOTSIE`:
        link =
          'https://www.youtube.com/watch?v=LNyme3UwiUM&ab_channel=juddjames';
        break;
      case `ESCAPE PLAN THE EXTRACTORS`:
        link =
          'https://www.youtube.com/watch?v=YyL75IBXocE&ab_channel=LionsgateMovies';
        break;
      case `JOHN WICK`:
        link =
          'https://www.youtube.com/watch?v=C0BMx-qxsP4&ab_channel=MovieclipsTrailers';
        break;
      case `THE BOURNE IDENTITY`:
        link =
          'https://www.youtube.com/watch?v=FpKaB5dvQ4g&ab_channel=MovieclipsClassicTrailers';
        break;
      case `CAST AWAY`:
        link =
          'https://www.youtube.com/watch?v=ID_WOQRQrlU&ab_channel=TrueVisionsOfficial';
        break;
      case `THE MUMMY RETURNS`:
        link =
          'https://www.youtube.com/watch?v=3yXjs7BUKYc&ab_channel=MovieclipsClassicTrailers';
        break;
      case `THE OLD GUARD`:
        link = 'https://www.youtube.com/watch?v=aK-X2d0lJ_s&ab_channel=Netflix';
        break;
      case `THE PURGE - ANARCHY`:
        link =
          'https://www.youtube.com/watch?v=XzFCDqKE4yA&ab_channel=UniversalPictures';
        break;
      case `DOOMSDAY`:
        link =
          'https://www.youtube.com/watch?v=-M0fIbx-irk&ab_channel=kute0027';
        break;
      case `RAMPAGE`:
        link =
          'https://www.youtube.com/watch?v=coOKvrsmQiI&ab_channel=WarnerBros.Pictures';
        break;
      case `PACIFIC RIM`:
        link =
          'https://www.youtube.com/watch?v=5guMumPFBag&ab_channel=WarnerBros.Pictures';
        break;
      case `BIRD BOX`:
        link = 'https://www.youtube.com/watch?v=o2AsIXSh2xo&ab_channel=Netflix';
        break;
      case `HOLIDATE`:
        link = 'https://www.youtube.com/watch?v=hxaaAoI57fk&ab_channel=Netflix';
        break;
      case `LOW SEASON`:
        link =
          'https://www.youtube.com/watch?v=XNIHIZt4_6M&ab_channel=SahamongkolfilmInternationalCo.%2CLtd';
        break;
      case `TITANIC`:
        link =
          'https://www.youtube.com/watch?v=kVrqfYjkTdQ&ab_channel=MovieclipsTrailers';
        break;
      case `READY PLAYER ONE`:
        link =
          'https://www.youtube.com/watch?v=cSp1dM2Vj48&ab_channel=WarnerBros.Pictures';
        break;
      case `JURASSIC WORLD - FALLEN KINGDOM`:
        link =
          'https://www.youtube.com/watch?v=vn9mMeWcgoM&ab_channel=UniversalPictures';
        break;
      case `HIGH & LOW`:
        link =
          'https://www.youtube.com/watch?v=fQHStGrqXv0&ab_channel=HiGH%26LOW';
        break;
      case `HIGH & LOW The Movie`:
        link =
          'https://www.youtube.com/watch?v=5uwxJW_rm-0&ab_channel=HiGH%26LOW';
        break;
      case `THE DRUG KING`:
        link =
          'https://www.youtube.com/watch?v=Ad6CXptfkVA&ab_channel=What%27sonNetflix';
        break;
      case `ALONG WITH THE GODS - THE TWO WORLDS`:
        link =
          'https://www.youtube.com/watch?v=sD7dmu-IWNw&ab_channel=MovieclipsIndie';
        break;
      case `THE SECRET WORLD OF ARRIETTY`:
        link =
          'https://www.youtube.com/watch?v=VlMe7PavaRQ&ab_channel=WaltDisneyStudios';
        break;
      case `SPIRITED AWAY`:
        link =
          'https://www.youtube.com/watch?v=ByXuk9QqQkk&ab_channel=MadmanAnime';
        break;
      case `KIKI'S DELIVERY SERVICE`:
        link =
          'https://www.youtube.com/watch?v=4bG17OYs-GA&ab_channel=MadmanAnime';
        break;

      case `PONYO ON THE CLIFF BY THE SEA`:
        link =
          'https://www.youtube.com/watch?v=CsR3KVgBzSM&ab_channel=MadmanAnime';
        break;
      case `Jom-Kamang-Weth`:
        link =
          'https://www.youtube.com/watch?v=kxQmAEvlnhA&ab_channel=SahamongkolfilmInternationalCo.%2CLtd';
        break;
      case `LuangPeeJazz 5G`:
        link =
          'https://www.youtube.com/watch?v=N6mmrW4lFUY&ab_channel=FILMGURUOfficial';
        break;
      case `Mr. Ho`:
        link = 'https://www.youtube.com/watch?v=xnCrTWNcm7g&ab_channel=M39Club';
        break;
      case `CRAZY RICH ASIANS`:
        link =
          'https://www.youtube.com/watch?v=ZQ-YX-5bAs0&ab_channel=WarnerBros.Pictures';
        break;
      case `THE GREEN MILE`:
        link =
          'https://www.youtube.com/watch?v=Ki4haFrqSrw&ab_channel=MovieclipsClassicTrailers';
        break;
      case `NIGHT SCHOOL`:
        link =
          'https://www.youtube.com/watch?v=t9QtXGirWf0&ab_channel=UniversalPictures';
        break;
      case `12 STRONG`:
        link =
          'https://www.youtube.com/watch?v=-Denciie5oA&ab_channel=WarnerBros.Pictures';
        break;
      case `ABOUT TIME`:
        link =
          'https://www.youtube.com/watch?v=T7A810duHvw&ab_channel=MovieclipsTrailers';
        break;
      case `THE WOLF OF WALL STREET`:
        link =
          'https://www.youtube.com/watch?v=iszwuX1AK6A&ab_channel=ParamountPictures';
        break;
      case `A BABYSITTER'S GUIDE TO MONSTER HUNTING`:
        link = 'https://www.youtube.com/watch?v=MKR33fJ_yPw&ab_channel=Netflix';
        break;
      case `OVER THE MOON`:
        link = 'https://www.youtube.com/watch?v=26DIABx44Tw&ab_channel=Netflix';
        break;
      case `DESPICABLE ME`:
        link =
          'https://www.youtube.com/watch?v=sUkZFetWYY0&ab_channel=Movieclips';
        break;
    }
    window.open(link, '_blank');
  }
}
