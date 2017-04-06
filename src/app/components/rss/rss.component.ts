import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { NgZone, Renderer, ViewChild } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routingComponents } from '../../app.routing';
import { WindowService } from '../../services/window-service';
import { Config } from '../../services/config.service';
import { DomSanitizer, SafeResourceUrl, SafeHtml, SafeUrl, SafeStyle} from '@angular/platform-browser';
import { LocalStorageService } from '../../services/local-storage.service';
import { DataObservableService } from '../../services/data-observable.service';
import { Feed } from '../../shared/interfaces';
import { Location } from '@angular/common';
import { GetPageService } from '../../services/get-page.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css'],
  providers: [WindowService, DataObservableService]
})

export class RssComponent implements OnInit, AfterViewInit, OnDestroy {

  elementRef: ElementRef;
  _category = 'movies';
  _mcat = '';
  _start = 0;
  _max = 200;
  _pc = '';
  _rad = '';

  public _rss_width: number;
  public _rss_height: number;

  public setClickedRow: any;
  public doc: Array<any>;
  public id: any;
  public url: any;

  public selectedIdx: any = 0;
  public selectedLink: any = 'about:blank';
  public sub: any; // -> Subscriber

  page: any;
  feeds: Object[];

  private height: String = '0';
  // @ViewChild('li') bodyEl: ElementRef;

  // public _hrss: number;

  // constructor(private appRef: ApplicationRef) { }
  //   let viewRef: ViewContainerRef = appRef['_rootComponents'][0]['_hostElement'].vcRef;
  // @HostBinding('attr.id') zebra: string;

  // inject Location into class constructor
  constructor(private location: Location,
              private zone: NgZone,
              private feedsObservableService: DataObservableService,
              private route: ActivatedRoute,
              private rssrouter: Router,
              private windowService: WindowService,
              private LocalStorage: LocalStorageService,
              private renderer: Renderer,
              private sanitizer: DomSanitizer) {

    this.page = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    this.page = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedLink);

    this.setClickedRow = function(index){
        this.selectedRow = index;
    }

    $(window).on('orientationchange', function(event) {
      this.updateRssLayout();
    });

    // subscribe to the window resize event
    windowService.size$.subscribe((value:any) => {
      // alert('VIDEO - windowService:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
      this.updateRssLayout();
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


  }

  ngOnInit() {

    // this method is preferred but reuires you to run a jsonp server
    if (Config.DATA_SOURCE === 'remotejsonp') {
      this.getFeeds();
    }

    if (Config.DATA_SOURCE === 'localjson') {
      this.getFeedsLocal();
    }

    // this.setClickedRow(0);

    // this.updateRssLayout();
  }

  ngAfterViewInit() { }

  updateRssLayout() {
    if (window.innerHeight > window.innerWidth) {
      let h1 = 30; // (window.innerHeight / 3) + 5;
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
    $('[data-role=panel]').panel('close');

    let arFeeds = this.generateArray(this.feeds);

    this.LocalStorage.set('feeds_item', {
      'title': arFeeds[zindex].title,
      'category': arFeeds[zindex].category,
      'image': arFeeds[zindex].image,
      'shortDescription': arFeeds[zindex].shortDescription,
      'description': arFeeds[zindex].description,
      'warnings': arFeeds[zindex].warnings,
      'sideeffects': arFeeds[zindex].sideeffects,
      'dosage': arFeeds[zindex].dosage,
      'anticoagulant': arFeeds[zindex].anticoagulant,
      'carcinogenic': arFeeds[zindex].carcinogenic,
      'hypoglycemic': arFeeds[zindex].hypoglycemic,
      'liverdamage': arFeeds[zindex].liverdamage,
      'kidneydamage': arFeeds[zindex].kidneydamage,
    });
    this.setClickedRow(zindex);
    this.rssrouter.navigate(['/reader', {name: 'solutions'}]);


    // const z1 = $('#divrss').find('li').eq(zindex).find('.spread-item-body')[0].innerHTML;
    // const z2 = '<!DOCTYPE><html><head><title>Iframe</title></head><body>' + z1 + '!</body></html>';
    // $('#panel_rss').html('<!DOCTYPE><html><head><title>Iframe</title></head><body>' + z1 + '!</body></html>');
    // $('#panel_rss').animate({width: 'toggle'}, 500);

  }

  ngOnDestroy(): void {
    if (this.sub != null) {
        this.sub.unsubscribe();
    }
  }

}



