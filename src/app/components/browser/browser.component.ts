import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml, SafeUrl, SafeStyle} from '@angular/platform-browser';
import { ViewChild } from '@angular/core';
import { WindowService } from '../../services/window-service';
import { Http } from '@angular/http';
import { GetPageService } from '../../services/get-page.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Routes, RouterModule, Router, ActivatedRoute, NavigationExtras } from '@angular/router';

declare var jQuery: any;
declare var $: any;
declare var chess: any;

@Component({
  moduleId: module.id,
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css'],
  providers: [WindowService, GetPageService]
})

export class BrowserComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('chess') chess: ElementRef;
  // this.approuter.navigate(['/browser', {name: 'legal', url: './assets/data/lic.html'}]);
  // this.cloudsrouter.navigate(['/browser', {name: 'chess', url: './assets/chess/chess.html'}]);

  page: any;
  zurl: any;
  public _zwidth: any;
  public _zheight: any;
  public sub: any; // -> Subscriber
  name: any;

  constructor( public sanitizer: DomSanitizer, 
        private windowService: WindowService,
        public _gps: GetPageService,
        private browserrouter: Router,
        private route: ActivatedRoute,
        private LocalStorage: LocalStorageService) {

    // this.zurl = './assets/data/lic.html';
    // this.zurl = './assets/chess/chess.html';

    this.page = this.sanitizer.bypassSecurityTrustResourceUrl('');

    // subscribe to the window resize event
    windowService.size$.subscribe((value: any) => {
      // alert('width: ' + value.width + '\rheight: ' + value.height);
      // $('#iframe_browser').width(100 + value.width + 'px');
      // $('#iframe_browser').height(100 + value.height + 'px');
      this._zwidth = value.width;
      this._zheight = value.height;
    });

    // get URL parameters
    this.sub = this.route
      .params
      .subscribe(params => {
        // by passing the name we can customize for certain web pages
        // this.name = params['name'];
        this._zwidth = window.innerWidth;
        this.zurl = params['url'];
    });

  }

  ngOnInit() {
    this._gps.getPage(this.zurl).subscribe(
        (data) => {
          this.page = this.sanitizer.bypassSecurityTrustResourceUrl(data);
        }
    )
  }

  ngAfterViewInit() {
    // const content = '<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    // <button id="button" class="button" >My button </button>';
    // const doc =  this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    // doc.open();
    // doc.write(content);
    // doc.close();
    // this.iframe.nativeElement.src = './assets/chess/chess.html';

    // this._gps.getPage(this.zurl).subscribe(
    //     (data) => {
    //       this.page = this.sanitizer.bypassSecurityTrustResourceUrl(data);
    //       // this.iframe.nativeElement.initChess();
    //     }
    // )
    // if (this.name === 'chess') {
    //   // this.initChess();
    // }
  }



  ngOnDestroy(): void {
    if (this._gps != null) {
        // this._gps.unsubscribe();
    }
  }
}
