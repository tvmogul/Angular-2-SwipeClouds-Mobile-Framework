import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { VideoComponent } from './components/video/video.component';
import { SwipeCloudComponent } from './components/swipe-cloud/swipe-cloud.component';
import { SwipecloudHeaderComponent } from './components/swipecloud-header/swipecloud-header.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { Routes, RouterModule, Router } from '@angular/router';
import 'rxjs/add/operator/pairwise';
import { LocalStorageService } from './services/local-storage.service';
import { Config } from './services/config.service';
import { WindowService } from './services/window-service';

declare var _stylepath: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WindowService]
})

export class AppComponent implements OnInit {
  elementRef: ElementRef;
  slideValue: number;
  curPage = 'swipeclouds';
  title = 'Eureka!';

  public show_swipecloud: Boolean = true;
  public show_video: Boolean = false;
  public show_cordova: Boolean = false;
  public show_browser: Boolean = false;
  public show_rss: Boolean = false;
  public show_reader: Boolean = false;
  public show_ads: Boolean = false;

  clicked(event, pageRef: string) {
    event.preventDefault();
  }

  constructor(private approuter: Router,
    @Inject(ElementRef) elementRef: ElementRef,
    private windowService: WindowService,
    private appWindowService: WindowService,
    private LocalStorage: LocalStorageService) {

    // subscribe to the window resize event
    windowService.size$.subscribe((value:any) => {
      // alert('APP - windowService:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
      this.updateAppLayout();
    });

    $(window).on('orientationchange', function(event) {
      // alert('APP - orientationchange:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
      this.updateAppLayout();
    });

    approuter.events.subscribe(event => {
      this.show_swipecloud = true;
      this.show_video = false;
      this. show_cordova = false;
      this.show_browser = false;
      this.show_rss = false;
      this.show_reader = false;
      this.show_ads = false;
      if (event.url.indexOf('/swipeclouds') > -1) {
          this.show_swipecloud = true;
          this.show_video = false;
          this. show_cordova = false;
          this.show_browser = false;
          this.show_rss = false;
          this.show_reader = false;
          this.show_ads = false;
      }
      if (event.url.indexOf('/video') > -1) {
        this.show_swipecloud = false;
        this.show_video = true;
        this. show_cordova = false;
        this.show_browser = false;
        this.show_rss = false;
        this.show_reader = false;
        this.show_ads = false;
      }
      if (event.url.indexOf('/cordova') > -1) {
        this.show_swipecloud = false;
        this.show_video = false;
        this. show_cordova = true;
        this.show_browser = false;
        this.show_rss = false;
        this.show_reader = false;
        this.show_ads = false;
      }
      if (event.url.indexOf('/browser') > -1) {
        this.show_swipecloud = false;
        this.show_video = false;
        this. show_cordova = false;
        this.show_browser = true;
        this.show_rss = false;
        this.show_reader = false;
        this.show_ads = false;
      }
      if (event.url.indexOf('/rss') > -1) {
        this.show_swipecloud = false;
        this.show_video = false;
        this. show_cordova = false;
        this.show_browser = false;
        this.show_rss = true;
        this.show_reader = false;
        this.show_ads = false;
      }
      if (event.url.indexOf('/reader') > -1) {
        this.show_swipecloud = false;
        this.show_video = false;
        this. show_cordova = false;
        this.show_browser = false;
        this.show_rss = false;
        this.show_reader = true;
        this.show_ads = false;
      }
      if (event.url.indexOf('/ads') > -1) {
        this.show_swipecloud = false;
        this.show_video = false;
        this. show_cordova = false;
        this.show_browser = false;
        this.show_rss = false;
        this.show_reader = false;
        this.show_ads = true;
      }
    });

    this.elementRef = elementRef;

    if (!LocalStorage.get('feeds_swipeclouds')) {
        LocalStorage.set('feeds_swipeclouds', {
          'category': 'movies',
          'mcat': '',
          'start': 0,
          'max': 50,
          'pc': '',
          'rad': ''
        });
    }

    if (LocalStorage.isAvailable()) {
      if (!LocalStorage.get('feeds_swipeclouds')) {
          LocalStorage.set('feeds_swipeclouds', {
            'category': 'movies',
            'mcat': '',
            'start': 0,
            'max': 250,
            'pc': '',
            'rad': ''
          });
      }
      if (!this.LocalStorage.get('settings_swipeclouds')) {
          this.LocalStorage.set('settings_swipeclouds', {
            'app_name': 'swipeclouds',
            'themeid': 'ios7light',
            'bgimage': 0,
            'cloudid': 0,   // this._cloudid
            'shape': 'sphere',  // this._shape
            'zoom': 1.0,   // this._zoom zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
            'maxSpeed': .04,  // this._maxSpeed minSpeed	0.0 maxSpeed	0.05
            'drag': 'on'  // this._drag
          });
      }
      if (!this.LocalStorage.get('selected_video_swipeclouds')) {
          this.LocalStorage.set('selected_video_swipeclouds', {
            'linkType': '',
            'linkValue': ''
          });
      }
      if (!this.LocalStorage.get('page_swipeclouds')) {
          this.LocalStorage.set('page_swipeclouds', {
            'page': 'swipeclouds'
          });
      }
      if (!this.LocalStorage.get('orientation_swipeclouds')) {
          this.LocalStorage.set('orientation_swipeclouds', {
            'orientation': 'portrait'
          });
      }
      if (!this.LocalStorage.get('browser_page_swipeclouds')) {
          this.LocalStorage.set('browser_page_swipeclouds', {
            'browserpage': 'about:blank'
          });
      }
    }
  }

  // ngOnInit is called directly after constructor and before ngOnChange
  // is triggered for the first time. Perfect place for initialisation.
  ngOnInit() {
    let _path = './assets/styles/themes/light.css';
    const s = this.LocalStorage.get('settings_swipeclouds');
    if (s) {
      _path = './assets/styles/themes/' + s.themeid + '.css';
    } else {
      s.themeid = 'light';
      this.LocalStorage.set('settings_swipeclouds', s);
    }
    $('#link_swipeclouds').attr('href', _path);

    this.updateAppLayout();
  }

  updateAppLayout() {
    if (window.innerHeight > window.innerWidth) {
        $('header').removeClass('ui-header-landscape').addClass('ui-header-portrait');
        $('footer').removeClass('hideit').addClass('showit');
    }
    if (window.innerHeight < window.innerWidth) {
        // We will REMOVE the header & Footer if the page is in laandscape position
        $('header').removeClass('ui-header-portrait').addClass('ui-header-landscape');
        $('footer').removeClass('showit').addClass('hideit');
    }
    // $('.ui-header').trigger('updatelayout');
    // $('.ui-footer').trigger('updatelayout');
  }
  
  nextBackground(event) {
    event.preventDefault();
    // $('[data-role=panel]').panel('close');
    // $('.ui-grid-a').css({ 'cursor': 'pointer' });
    // 'app_name': 'swipeclouds',
    // 'themeid': 'ios7light',
    // 'bgimage': 0,
    // 'cloudid': 0,   // this._cloudid
    // 'shape': 'sphere',  // this._shape
    // 'zoom': 1.0,   // this._zoom zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
    // 'maxSpeed': .04,  // this._maxSpeed minSpeed	0.0 maxSpeed	0.05
    // 'drag': 'on'  // this._drag
    const s = this.LocalStorage.get('settings_swipeclouds');
    if (s) {
        if (s.bgimage + 1 < Config.DATA_BACKGROUNDS.length) { s.bgimage = s.bgimage + 1; } else { s.bgimage = 0; }
        this.LocalStorage.set('settings_swipeclouds', s);
    }
    this.approuter.navigate(['/blank']);
    setTimeout( () => {
        this.approuter.navigate(['/swipeclouds', {action: 'nextbackground', actionid: s.bgimage }]);
    }, 1);
  }

  // (click)="changeTheme($event, 'ios7light')"
  changeTheme(event, themeRef: string) {
    event.preventDefault();
    // $(".ui-grid-a").css({ "cursor": "pointer" });
    // 'app_name': 'swipeclouds',
    // 'themeid': 'ios7light',
    // 'bgimage': 0,
    // 'cloudid': 0,   // this._cloudid
    // 'shape': 'sphere',  // this._shape
    // 'zoom': 1.0,   // this._zoom zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
    // 'maxSpeed': .04,  // this._maxSpeed minSpeed	0.0 maxSpeed	0.05
    // 'drag': 'on'  // this._drag

    let s = this.LocalStorage.get('settings_swipeclouds');
    if (s) {
        s.themeid = themeRef;
        this.LocalStorage.set('settings_swipeclouds', s);
    }
    const _path = './assets/styles/themes/' + themeRef + '.css';
    $('#link_swipeclouds').attr('href', _path);

  }

  changeDrag(event, dragRef: string) {
    event.preventDefault();
    $('[data-role=panel]').panel('close');
    // 'app_name': 'swipeclouds',
    // 'themeid': 'ios7light',
    // 'bgimage': 0,
    // 'cloudid': 0,   // this._cloudid
    // 'shape': 'sphere',  // this._shape
    // 'zoom': 1.0,   // this._zoom zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
    // 'maxSpeed': .04,  // this._maxSpeed minSpeed	0.0 maxSpeed	0.05
    // 'drag': 'on'  // this._drag
    let s = this.LocalStorage.get('settings_swipeclouds');
    if (s) {
        s.drag = dragRef;
        this.LocalStorage.set('settings_swipeclouds', s);
    }
    this.approuter.navigate(['/blank']);
    setTimeout( () => {
        this.approuter.navigate(['/swipeclouds', {action: 'drag', actionid: dragRef }]);
    }, 1);

  }

  loadBrowser(event, browserRef: string) {
    event.preventDefault();
    $('[data-role=panel]').panel('close');
    // this.approuter.navigate(['/blank']);
    // setTimeout( () => {
        this.approuter.navigate(['/browser', {name: 'legal', url: './assets/data/lic.html'}]);
    // }, 1);
  }

  closePanel(event, closeRef: string) {
    event.preventDefault();
    $('[data-role=panel]').panel('close');
  }

  changeShape(event, shapeRef: string) {
    event.preventDefault();

    $('[data-role=panel]').panel('close');
    // 'app_name': 'swipeclouds',
    // 'themeid': 'ios7light',
    // 'bgimage': 0,
    // 'cloudid': 0,   // this._cloudid
    // 'shape': 'sphere',  // this._shape
    // 'zoom': 1.0,   // this._zoom zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
    // 'maxSpeed': .04,  // this._maxSpeed minSpeed	0.0 maxSpeed	0.05
    // 'drag': 'on'  // this._drag

    const s = this.LocalStorage.get('settings_swipeclouds');
    if (s) {
        s.shape = shapeRef;
        this.LocalStorage.set('settings_swipeclouds', s);
    }
    this.approuter.navigate(['/blank']);
    setTimeout( () => {
        this.approuter.navigate(['/swipeclouds', {action: 'shape', actionid: s.shape }]);
    }, 1);
  }

  zoomChange(event, valueRef: any) {
    event.preventDefault();
    // $("[data-role=panel]").panel("close");

    alert(valueRef);
  }

  onSpeedChange(event, valueRef: number) {
    event.preventDefault();
    // $("[data-role=panel]").panel("close");

    alert(valueRef);
  }


  // TagCanvas.Start('exampleCanvas', 'extags', { centreFunc: RSquare });
  // $('#tagcanvas').tagcanvas(oopts, cloudID);

  // var amt = parseFloat(cloudZoom * 100);
  // $("#zoomslider").slider().val(amt.toFixed(0));

  // var amt2 = parseFloat(cloudSpeed * 100);
  // $("#speedSlider").slider().val(amt2.toFixed(0));

  // $("#zoomslider").on('slidestop', function (event) {
  //     var slider_value = $("#zoomslider").slider().val() / 100;
  //     //zCentreFunc = 0;
  //     loadCloud(cloudID, cloudShape, slider_value, cloudSpeed);
  // });

  // $("#speedSlider").on('slidestop', function (event) {
  //     var speed_value = $("#speedSlider").slider().val() / 100;
  //     loadCloud(cloudID, cloudShape, cloudZoom, speed_value);
  //     //$('#tagcanvas').tagcanvas("setspeed", [0.5, -0.25]);
  // });

}


