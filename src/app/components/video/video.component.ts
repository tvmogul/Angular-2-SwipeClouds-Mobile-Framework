import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { NgZone } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routingComponents } from '../../app.routing';
import { WindowService } from '../../services/window-service';
import { Config } from '../../services/config.service';
import { DomSanitizer, SafeResourceUrl, SafeHtml, SafeUrl, SafeStyle} from '@angular/platform-browser';
import { LocalStorageService } from '../../services/local-storage.service';
import { DataObservableService } from '../../services/data-observable.service';
import { Feed } from '../../shared/interfaces';
import { Location } from '@angular/common';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [WindowService, DataObservableService]
})

export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {

  elementRef: ElementRef;
  _category = 'movies';
  _mcat = '';
  _start = 0;
  _max = 200;
  _pc = '';
  _rad = '';

  private _video_width: number;
  private _video_height: number;

  public setClickedRow: any = 0;
  public doc: Array<any>;
  public id: any;
  public url: any;

  public selectedIdx: any = 0;
  public selectedLink: any = 'about:blank';
  public sub: any; // -> Subscriber

  page: any;
  feeds: Object[];

  // constructor(private appRef: ApplicationRef) { }
  //   let viewRef: ViewContainerRef = appRef['_rootComponents'][0]['_hostElement'].vcRef;
  // @HostBinding('attr.id') zebra: string;

  // inject Location into class constructor
  constructor(private location: Location,
              private zone: NgZone,
              private feedsObservableService: DataObservableService,
              private route: ActivatedRoute,
              private videorouter: Router,
              private windowService: WindowService,
              private LocalStorage: LocalStorageService,
              private sanitizer: DomSanitizer) {

    this.page = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    this.page = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedLink);

    this.setClickedRow = function(index){
        this.selectedRow = index;
    }

    $(window).on('orientationchange', function(event) {
      // alert('VIDEO - orientationchange:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
      this.updateVideoLayout();
      // $('.ui-header').trigger('updatelayout');
      // $('.ui-footer').trigger('updatelayout');
      // $('.ui-grid-a').css({ 'cursor': 'pointer' });
      // let viewRef: ViewContainerRef = appRef['_rootComponents'][0]['_hostElement'].vcRef;
      // $('#event .iscroll-scroller').iscrollview('scrollTo', 0, 0, 0, false);      
    });

    // subscribe to the window resize event
    windowService.size$.subscribe((value:any) => {
      // alert('VIDEO - windowService:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
      this.updateVideoLayout();
    });

    // get URL parameters
    this.sub = this.route
      .params
      .subscribe(params => {
        this._category = params['category'];
        this._start = params['start'];

        if (this._category === 'playontv') {
          let z = this.LocalStorage.get('selected_video_swipeclouds');
          if (z) {
            if (z.linkType === 'embed_youtube') {
                window.open('https://www.youtube.com/watch?v=' + z.linkValue, '_self', '', true);
                this.location.go('');
            } else if (z.linkType === 'channel_youtube') {
                window.open('https://www.youtube.com/results?search_query=' + z.linkValue, '_self', '', true);
                this.location.go('');
            }
          }
        }
        // this method is preferred but reuires you to run a jsonp server
        if (Config.DATA_SOURCE === 'remotejsonp') {
          this.getFeeds();
        } 
        if (Config.DATA_SOURCE === 'localjson') {
          this.getFeedsLocal();
        }
    });

    this.doc  = [
      {
        FeedId: '0000-0000-0000',
        category: 'movies',
        title: 'title',
        author: 'author',
        shortDescription: 'shortDescription',
        description: 'description',
        link: 'link',
        linkType: 'linkType',
        linkValue: 'linkValue',
        image: 'string',
        rank: 100,
        showvideo: true,
        moviecategory: 'moviecategory',
        duration: '00:00:00'
      },
      {
        FeedId: '0000-0000-0000',
        category: 'movies',
        title: 'title',
        author: 'author',
        shortDescription: 'shortDescription',
        description: 'description',
        link: 'link',
        linkType: 'linkType',
        linkValue: 'linkValue',
        image: 'string',
        rank: 100,
        showvideo: true,
        moviecategory: 'moviecategory',
        duration: '00:00:00'
      }
    ];

  }

  ngOnInit() {

    // this method is preferred but reuires you to run a jsonp server
    if (Config.DATA_SOURCE === 'remotejsonp') {
      this.getFeeds();
    }

    if (Config.DATA_SOURCE === 'localjson') {
      this.getFeedsLocal();
    }

    // this.feedsObservableService
    //     .getServiceWithDynamicQueryTerm('api/Feeds/TestGetParam', 'query', 'hello')
    //     .subscribe(
    //         result => console.log('2. getServiceWithDynamicQueryTerm: ' + result),
    //         error => console.log(error)
    //     );

    // this.feedsObservableService
    //     .getServiceWithFixedQueryString('api/Feeds/TestGetParam', this.searchFeedsModel.name)
    //     .subscribe(
    //         result => console.log('3. getServiceWithFixedQueryString: ' + result),
    //         error => console.log(error)
    //     );

    // this.feedsObservableService
    //     .getServiceWithComplexObjectAsQueryString('api/Feeds/TestGet', this.searchFeedsModel)
    //     .subscribe(
    //         result => console.log('4. getServiceWithComplexObjectAsQueryString: ' + result),
    //         error => console.log(error)
    //     );

    // this.feedsObservableService
    //     .createService('api/Feeds/TestPost', this.searchFeedsModel)
    //     .subscribe(
    //         result => console.log('5. createService: ' + result),
    //         error => console.log(error)
    //     );

    // this.feedsObservableService
    //     .updateService('api/Feeds/TestPut', this.searchFeedsModel)
    //     .subscribe(
    //         result => console.log('6. updateService: ' + result),
    //         error => console.log(error)
    //     );

    // this.feedsObservableService
    //     .patchService('api/Feeds/TestPatch', this.searchFeedsModel)
    //     .subscribe(
    //         result => console.log('7. patchService: ' + result),
    //         error => console.log(error)
    //     );

    // this.feedsObservableService
    //     .deleteService('api/Feeds/TestDelete', this.searchFeedsModel)
    //     .subscribe(
    //         result => console.log('8. deleteService: ' + result),
    //         error => console.log(error)
    //     );

    // this.feedsObservableService
    //     .deleteServiceWithId('api/Feeds/TestDeleteWithId', 'id', '8631')
    //     .subscribe(
    //         result => console.log('9. deleteServiceWithId: ' + result),
    //         error => console.log(error)
    //     );
    // }

    this.setClickedRow(0);

    // this.feeds[0].
    // this.page = this.sanitizer.bypassSecurityTrustResourceUrl(this.feeds[0].link);
    // $('#yt_player').attr('src', this.page);

    this.updateVideoLayout();

  }

  ngAfterViewInit() { }

  updateVideoLayout() {
    if (window.innerHeight > window.innerWidth) {
      let h1 = (window.innerHeight / 3) + 5;
      $('#zebra').width('100%');
      $('#zebra').height(h1 + 'px');
      $('#yt_player').width('100%');
      $('#yt_player').height(h1 + 'px');
    }
    if (window.innerHeight < window.innerWidth) {
      let h2 = window.innerHeight;
      $('#zvideowrapper').attr('display', 'none');
      $('#zebra').width('100%');
      $('#zebra').height(h2 + 'px');
      $('#yt_player').width('100%');
      $('#yt_player').height(h2 + 'px');
    }
    $('.ui-header').trigger('updatelayout');
    $('.ui-footer').trigger('updatelayout');
  }


  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  generateArray(obj){
    return Object.keys(obj).map((key) => {
      return obj[key];
    });
  }

  getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getFeeds() {

      // this._category, this._mcat, this._start, this._max, this._pc, this._rad
      this.feedsObservableService
        .getServiceFeedsJsonp()
        .subscribe(
          (res) => {
            this.zone.run(() => {
              // console.log('enabled time travel');
            });
            this.feeds = res;  // feeds: Object[];
            const atabs = res;
            if ( atabs[0].link ) {
              this.selectedLink = atabs[0].link;
              this.page = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedLink);
              $('#yt_player').attr('src', this.page);
            }
          },
          (err) => {console.log('error!', err)},
      );
      this.selectedIdx = 0;
  }

  getFeedsLocal() {
    this.feedsObservableService
      .getJsonLocal()
      .subscribe(
        (res) => {
          this.zone.run(() => {
            // console.log('enabled time travel');
          });
          this.feeds = res;  // feeds: Object[];
          let atabs = res;
          if ( atabs[0].link ) {
            this.selectedLink = atabs[0].link;
            this.page = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedLink);
            $('#yt_player').attr('src', this.page);
          }
        },
        (err) => {console.log('error!', err)},
    );
    this.selectedIdx = 0;
  }

  // feeds: Object[];
  clicked(event, pageRef: any,  zindex: any) {
    event.preventDefault();
    this.setClickedRow(zindex);
    // clicked($event, feed, i)
    // this._selectedIndex = zindex;
    // alert(event.target);
    // var refParts = pageRef.split('/');
    // alert(pageRef);
    this.page = this.sanitizer.bypassSecurityTrustResourceUrl(pageRef.link);
    $('#yt_player').attr('src', this.page);
    // $('#videotext').html(_videodesc);
    // $('#videotext').html(_videocat);
    let z = this.LocalStorage.get('selected_video_swipeclouds');
    if (z) {
        z.linkType = pageRef.linkType;
        z.linkValue = pageRef.linkValue;
        this.LocalStorage.set('selected_video_swipeclouds', z);
    }
  }

  cleanHTMLEntities(str) {
    // block creating object more than once
    const rssItem = document.createElement('div');
    if (str && typeof str === 'string') {
        // remove script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        rssItem.innerHTML = str;
        // 'textContent' isn't avaiable in IE8
        if (rssItem.textContent === undefined) {
          str = rssItem.innerText;
          rssItem.innerText = '';
        } else {
          str = rssItem.textContent;
          rssItem.textContent = '';
        }
    }
    return str;
  };

  getDate = function (date, objDate) {
    // Create object whoose properties are feed values
    const day = date.getUTCDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    objDate.year = (year.toString().length === 1 ? '0' : '') + year;
    objDate.month = (month.toString().length === 1 ? '0' : '') + month;
    objDate.day = (day.toString().length === 1 ? '0' : '') + day;
    objDate.hours = (hours.toString().length === 1 ? '0' : '') + hours;
    objDate.minutes = (minutes.toString().length === 1 ? '0' : '') + minutes;
    objDate.seconds = (seconds.toString().length === 1 ? '0' : '') + seconds;
  };

  getVideoEmbed(tube, videoidVal) {
    // <!--template: '<div class='video'><iframe src='{{url}}' frameborder='0' 
    // webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>',-->
    let embedUrl = '';
    if ((tube === 'category') || (tube === 'music') || (tube === 'web')) {
      embedUrl = videoidVal;
    } else if ((tube === 'yt_channel') || (tube === 'channel_youtube')) {
      embedUrl = 'http://www.youtube.com/embed?listType=search&amp;list=' + videoidVal + '&format=5';
    } else if ((tube === 'youtube') || (tube === 'embed_youtube')) {
      embedUrl = 'http://www.youtube.com/embed/' + videoidVal;
    } else if ((tube === 'youku') || (tube === 'embed_youku')) {
      embedUrl = 'http://player.youku.com/embed/' + videoidVal;
    } else if ((tube === 'vimeo') || (tube === 'embed_vimeo')) {
      embedUrl = 'http://player.vimeo.com/video/' + videoidVal;
    } else if ((tube === 'ustreamtv') || (tube === 'embed_ustreamtv')) {
      embedUrl = 'http://www.ustream.tv/embed/' + videoidVal;
    } else if ((tube === 'animalplanet') || (tube === 'embed_animalplanet')) {
      embedUrl = 'http://www.animalplanet.com/embed?page=' + videoidVal;
    } else if ((tube === 'dailymotion') || (tube === 'embed_dailymotion')) {
      embedUrl = 'http://www.dailymotion.com/embed/video/' + videoidVal;
    } else if ((tube === '5min') || (tube === 'embed_5min')) {
      embedUrl = 'http://embed.5min.com/' + videoidVal;
    } else if ((tube === 'cc') || (tube === 'embed_cc')) {
      embedUrl = 'http://media.mtvnservices.com/embed/' + videoidVal;
    } else if ((tube === 'meta_ua') || (tube === 'embed_meta_ua')) {
      embedUrl = 'http://video.meta.ua/iframe/' + videoidVal;
    } else if ((tube === 'tune_pk') || (tube === 'embed_tune_pk')) {
      embedUrl = 'http://tune.pk/player/embed_player.php?vid=' + videoidVal + '&autoplay=no';
    } else if ((tube === 'metacafe') || (tube === 'embed_metacafe')) {
      embedUrl = 'http://www.metacafe.com/embed/' + videoidVal;
    } else if ((tube === 'liveleak') || (tube === 'embed_liveleak')) {
      embedUrl = 'http://www.liveleak.com/ll_embed?f=' + videoidVal;
    } else if ((tube === 'ebaumsworld') || (tube === 'embed_ebaumsworld')) {
      embedUrl = 'http://www.ebaumsworld.com/media/embed/' + videoidVal;
    } else if ((tube === 'bliptv') || (tube === 'embed_blip')) {
      embedUrl = 'http://blip.tv/play/' + videoidVal;
    } else if ((tube === 'funnyordie') || (tube === 'embed_funnyordie')) {
      embedUrl = 'http://www.funnyordie.com/embed/' + videoidVal;
    } else if ((tube === 'stupidvideos') || (tube === 'embed_stupidvideos')) {
      embedUrl = 'http://www.stupidvideos.com/embed/?video=' + videoidVal;
    }
    return embedUrl;
  };

  ngOnDestroy(): void {
    if (this.sub != null) {
        this.sub.unsubscribe();
    }
  }

}


