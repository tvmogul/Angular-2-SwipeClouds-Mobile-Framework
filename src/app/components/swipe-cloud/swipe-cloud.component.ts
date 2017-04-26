import { Component, ElementRef, Inject, OnInit, AfterViewInit, OnDestroy, Input, ViewChild, Injectable } from '@angular/core';
import { WindowService } from '../../services/window-service';
import { Routes, RouterModule, Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import 'rxjs/add/operator/pairwise';
import { LocalStorageService } from '../../services/local-storage.service';
import { Config } from '../../services/config.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { DialogAnchorDirective } from '../../shared/dialog/dialog-anchor.directive';

declare var TagCanvas: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-swipe-cloud',
  templateUrl: './swipe-cloud.component.html',
  styleUrls: ['./swipe-cloud.component.css'],
  providers: [WindowService, DialogComponent],
  entryComponents: [DialogComponent]
})

export class SwipeCloudComponent implements OnInit, AfterViewInit, OnDestroy {
  elementRef: ElementRef;
  public _wcloud: number;
  public _hcloud: number;

  public canvas: any;

  @ViewChild('swipeCanvas') swipeCanvas: ElementRef;

  cloudID = 0;
  cloudShape = 'sphere';  //     this._shape = 'dblhelix';
  cloudZoom = 1.0;   // zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
  cloudSpeed = .04;  // minSpeed	0.0 maxSpeed	0.05
  lock: any = null;
  // _maxSpeed: any = .04;  // minSpeed	0.0 maxSpeed	0.05
  _app_name = 'swipeclouds';
  _themeid = 'ios7light';
  _bgimage = 0;
  _drag = 'on';
  private sub: any; // -> Subscriber
  public _scale = .1;
  public zCentreFunc = 0;

  oopts = {
    shape: 'sphere',
    zoom: 1.0,
    maxSpeed: .04,
    lock: null,
    dragControl: true,
    dragThreshold: 4,
    initial: [0.1, -0.1],
    textFont: '"Arial Narrow",sans-serif',   // '"Century Gothic", sans-serif',
    textColour: '#ffffff',
    bgColour: null,
    clickToFront: true,
    freezeActive: false,
    outlineIncrease: 0,
    txtScale: 2,
    weightMode: 'both',
    weightFrom: 'data-weight',
    weightGradient: null,     // var gradient,
    weight: true,
    weightSize: 1.0,
    textHeight: 20,
    maxBrightness: 1.0,
    minBrightness: 0.0,
    decel: 0.95,
    depth: 0.9,
    outlineColour: '#000000',
    outlineThickness: 1,
    pulsateTo: 1.0,
    pulsateTime: 3,
    wheelZoom: true,
    zoomMin: 0.3,
    zoomMax: 3,
    zoomStep: 0.05,
    frontSelect: true,
    // tooltip: 'div',
    // tooltipDelay: 50,
    // tooltipClass: 'sc_menu_tooltip',
    imageScale: .6,
    radiusX: 2,
    radiusY: 2,
    radiusZ: 2,
    stretchX: 1,
    stretchY: 1,
    offsetX: 0,
    offsetY: 0,
    shuffleTags: false,
    noSelect: false,
    noMouse: false,
    paused: false,
    reverse: true,
    hideTags: false,
    shadow: '#000',
    shadowBlur: 1,
    shadowOffset: [1, 1],
    centreFunc: this.Nop, // this.Nop,  // this.RSquare,
    // centreImage: null, // './assets/js_fabric/tv1.png',
    splitWidth: 1,
    pinchZoom: true,
    outlineMethod: 'none'
  };

  @ViewChild(DialogAnchorDirective) dialogAnchor: DialogAnchorDirective;

  constructor(@Inject(ElementRef) elementRef: ElementRef, 
    private windowService: WindowService,
    private LocalStorage: LocalStorageService,
    private route: ActivatedRoute,
    private cloudsrouter: Router) {

    this.elementRef = elementRef;
    this._wcloud = $(window).innerWidth();
    this._hcloud = $(window).innerHeight() - 116;

    this.elementRef.nativeElement = '';

    // subscribe to the window resize event
    windowService.size$.subscribe((value:any) => {
      // alert('SWIPECLOUDS - windowService:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
      this.updateCloudLayout();
    });

    // Bind event to window.orientationchange that
    // provides orientation when device is turned.
    $(window).on('orientationchange', function(event) {
      // alert('SWIPECLOUDS - orientationchange:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
      this.updateCloudLayout();
    });

    // If you put the header & footer inside swipe-cloud.component.html
    // then you use subscription below but with the following to reload
    // constructor(private zone:NgZone) {
    // // enable to for time travel
    // this.appStore.subscribe((state) => {
    //     this.zone.run(() => {
    //         console.log('enabled time travel');
    //     });
    // });
    // running zone.run will force the component to re-render

    // get URL parameters
    this.sub = this.route
      .params
      .subscribe(params => {
          const _action: any = params['action'];
          const _actionid: any = params['actionid'];
          // alert('_action: '+_action);
          if ((_action === 'undefined') || (_actionid === 'undefined')) {
          } else if(_action === 'nextcloud') {
            try {
              this.cloudID = _actionid;
            } catch(e) { }
          } else if (_action === 'drag') {
            this._drag = _actionid;
            if(_actionid === 'on') {
              this.oopts.dragControl = true;
            } 
            if(_actionid === 'off') {
              this.oopts.dragControl = false;
            }
            try {
              TagCanvas.Start('swipeCanvas', Config.DATA_CLOUDS[this.cloudID], this.oopts);
            } catch (e) { }
          } else if(_action === 'shape') {
            const s = _actionid;
            this.changeshape(s)
            try {
              TagCanvas.Start('swipeCanvas', Config.DATA_CLOUDS[this.cloudID], this.oopts);
            } catch (e) { }
          }
          // else if(_action === 'zoom') {
          //   this.cloudZoom = _actionid;
          //   this.oopts.zoom = _actionid;
          // } else if(_action === 'maxspeed') {
          //   this.cloudSpeed = _actionid;
          //   this.oopts.maxSpeed = _actionid;
          // }
          // const _appid: any = params['appid'];
          // const _name: any = params['name'];
          // const _ph: any = params['ph'];
          // const _email: any = params['email'];
          // const _city: any = params['city'];
          // const _state: any = params['state'];
          // const _ctry: any = params['ctry'];
          // const _pc: any = params['pc'];
          // const _lat: any = params['lat'];
          // const _lng: any = params['lng'];
        },
      (err) => { 
        console.log('error!', err);
      });

  } // end constructor

  Nop() {}

  ngOnInit() {
    this.elementRef.nativeElement = '';

    let s = this.LocalStorage.get('settings_swipeclouds');
    if (s) {
      this.cloudID = s.cloudid;
    } else {
      this.LocalStorage.set('settings_swipeclouds', 0);
    }

    try {
      TagCanvas.Start('swipeCanvas', Config.DATA_CLOUDS[this.cloudID], this.oopts);
    } catch(e) {
      // something went wrong, hide the canvas container
      // document.getElementById('swipeCanvas').style.display = 'none';
    }

    this.updateCloudLayout();

    this.loadBackground();

  } // end ngOnInit

  ngAfterViewInit() { }


  updateCloudLayout() {
    if (window.innerHeight > window.innerWidth) {
      this._wcloud = window.innerWidth;
      this._hcloud = window.innerHeight - 116;
    }
    if (window.innerHeight < window.innerWidth) {
      this._wcloud = window.innerWidth;
      this._hcloud = window.innerHeight;
    }
    $('.ui-header').trigger('updatelayout');
    $('.ui-footer').trigger('updatelayout');
    // $('#event .iscroll-scroller').iscrollview('scrollTo', 0, 0, 0, false);
  }

  changeshape(s: string) {
      // $('#panel_controls').panel("close");
      this.oopts.lock = '';
      const locks = { hcylinder: 'x', vcylinder: 'y', hring: 'x', vring: 'y', sphere: '', dblhelix: 'x' };
      let lock = locks[s] || '';
      TagCanvas.initial = (lock === 'x' && [0, 0.2]) || (lock === 'y' && [0.2, 0]) || [0.2, 0.2];
      this.cloudShape = s;
      this.lock = lock;
      this.oopts.shape = s;
      this.oopts.lock = lock;
  }

  // wait for the view to init before using the element
  onAfterInit() { 
    // let context: CanvasRenderingContext2D = this.swipeCanvas.nativeElement.getContext('2d');
    // happy drawing from here on
    // context.fillStyle = 'blue';
    // context.fillRect(10, 10, 150, 150);
    // jQuery(document).ready(function ($) {
    // });
  }

  loadBackground() {
    let g = this.LocalStorage.get('settings_swipeclouds');

    const video_test = Config.DATA_BACKGROUNDS[g.bgimage];
    if(video_test === 'video1') {
      document.getElementById('swipeCanvas').style.backgroundColor = 'transparent';
      document.getElementById('swipeCanvas').style.backgroundSize = 'cover'; // 100% 100%;
      document.getElementById('swipeCanvas').style.cursor = 'pointer';
    } else {
      document.getElementById('swipeCanvas').style.backgroundColor = '#000000';
      document.getElementById('swipeCanvas').style.backgroundImage = 'url(./assets/img/' + Config.DATA_BACKGROUNDS[g.bgimage] + ')';
      document.getElementById('swipeCanvas').style.backgroundSize = 'cover'; // 100% 100%;
      document.getElementById('swipeCanvas').style.cursor = 'pointer';
      // $('swipeCanvas').css({ 'cursor': 'pointer' });
    }

  } // end loadBackground

  openDialogBox(textRef: string) { 
    const zdialogComponentRef = this.dialogAnchor.createDialog(DialogComponent)
    if(textRef === 'license') {
      zdialogComponentRef.instance.loadData('This is a <strong>dialog</strong> message!'); 
    } else {
      zdialogComponentRef.instance.loadData('This is a <strong>dialog</strong> message!'); 
    }
    zdialogComponentRef.instance.close.subscribe(() => {
      zdialogComponentRef.destroy();
    })
  }

  CallRoute(event, categoryRef: string) {
    event.preventDefault();
    let s = this.LocalStorage.get('feeds_swipeclouds');
    if (s) {
      s.category = categoryRef;
      s.start = 0;
      this.LocalStorage.set('feeds_swipeclouds', s);
    }

    if(categoryRef === 'cordova_tools') {
      // shows a list of Cordova Plugins
      this.cloudsrouter.navigate(['/cordova']);
    } else {
      this.cloudsrouter.navigate(['/video', {category: categoryRef, start: 0}]);
    }
  }

  CallRss(event, categoryRef: string) {
    event.preventDefault();
    let s = this.LocalStorage.get('feeds_swipeclouds');
    if (s) {
      s.category = categoryRef;
      s.start = 0;
      this.LocalStorage.set('feeds_swipeclouds', s);
    }

    if(categoryRef === 'cordova_tools') {
      // shows a list of Cordova Plugins
      this.cloudsrouter.navigate(['/cordova']);
    } else {
      this.cloudsrouter.navigate(['/rss', {category: categoryRef, start: 0}]);
    }
  }

  InAppBuy(event, skuRef: string, formidRef: string) {
    event.preventDefault();
    this.cloudsrouter.navigate(['/inappbuy', {sku: skuRef, formid: formidRef}]);
  }

  CallTest(event, categoryRef: string) {
    event.preventDefault();

    this.cloudsrouter.navigate(['/blank']);

  }

  ChessRoute(event, categoryRef: string) {
    event.preventDefault();
    // if(categoryRef === 'chess') {
    //   this.cloudsrouter.navigate(['/chess']);
    // }
  }

  // Used in popping up a webpage in mobile browser
  private processClickOnSpecialPageLink(pageRef: string): Boolean {
    let rc: Boolean = true;
    const refParts = pageRef.split('/');
    // Check this is actually an special page.
    if (refParts[1] === 'myInternalPage') {
      // this.navCtrl.push(MySpecialPage, { pageId:  refParts[2]});
      rc = false;
    }
    return rc;
  }

  loadBrowser(event, browserRef: string, pathRef: string) {
    event.preventDefault();
    $('[data-role=panel]').panel('close');
    // this.cloudsrouter.navigate(['/blank']);
    // setTimeout( () => {
        this.cloudsrouter.navigate(['/browser', {name: browserRef, url: pathRef}]);
    // }, 1);
  }

  ngOnDestroy(): void {
    if (this.sub != null) {
        this.sub.unsubscribe();
    }
  }

  RSquare(c, w, h, cx, cy) {
      let d = ((new Date).getTime() % 10000) * Math.PI / 2500;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.translate(cx, cy);
      c.rotate(d);
      c.globalAlpha = 1;
      c.fillStyle = '#000';
      c.fillRect(-50, -50, 100, 100);
      c.fillStyle = '#fff';
      c.fillRect(-40, -40, 80, 80);
      c.fillStyle = '#000';
      c.fillRect(-30, -30, 60, 60);
      c.fillStyle = '#ff0';
      c.fillRect(-20, -20, 40, 40);
      c.beginPath();
      c.moveTo(0, 0);
      c.arc(0, 0, 15, 0, Math.PI / 2, 0);
      c.lineTo(0, 0);
      c.arc(0, 0, 15, Math.PI, 3 * Math.PI / 2, 0);
      c.fillStyle = '#000';
      c.fill();
  }


  RCentreFunc(c, w, h, cx, cy) {

  }
}

// // this.cloudID = 0;
// // this.cloudShape = 'dblhelix';  //     this._shape = 'dblhelix';
// // this.cloudZoom = 1.0;   // zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
// // this.cloudSpeed = .04;  // minSpeed	0.0 maxSpeed	0.05
// this.loadCloud(this.cloudID,this.cloudShape,this.cloudZoom,this.cloudSpeed);
// 'app_name': 'swipeclouds',
// 'themeid': 'ios7light',
// 'bgimage': '../../img/bg_clouds.gif',
// 'cloudid': 0,   // this._cloudid
// 'shape': 'sphere',  // this._shape
// 'zoom': 1.0,   // this._zoom zoomMin: 0.3, zoomMax: 3, zoomStep: 0.05
// 'maxSpeed': .04,  // this._maxSpeed minSpeed	0.0 maxSpeed	0.05
// 'drag': 'on'  // this._drag

// http://stackoverflow.com/questions/38572300/how-to-reload-refresh-the-component-view-forcefully
// In this example I assume your Child Component is just one DOM object 
// in your Parent Component row. This leverages using the ViewChild object 
// and the HostListener object. The meat of the event function code is filtering 
// down to the event that you're looking for.
// export class ChildComponent {
//   private _exampeObject:IGeneric;
//   @ViewChild('childcomponent') component: ElementRef;
//   constructor(){
//     this._exampleObject = {
//       id:1,
//       name:"Cyrus"
//     };
//   }
//   @HostListener('document:click', ['$event.target']) onClick(obj) {
//     let incrementId = this._exampleObject.id + 1;
//     let adjustName = this._exampleObject.name + incrementId.toString();
//     if(this.component.nativeElement.parentNode.parentNode === obj){
//       this._exampleObject = {
//         id: incrementId,
//         name: adjustName
//       }
//     }
//   }
// }