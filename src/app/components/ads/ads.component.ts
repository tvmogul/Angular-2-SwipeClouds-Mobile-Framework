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
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css'],
  providers: [WindowService]
})
export class AdsComponent implements OnInit {

  public _zwidth: any;
  public _zheight: any;
  public randNum: number;

  public adBanners = [
    'acartpro.jpg',
    'antigravity.jpg',
    'max2pay.jpg',
    'wildworkout.jpg',
    'contracts.jpg',
    'tvcourse.jpg',
    'internetcourse.jpg'
  ];

  public bannerLinks = [
    'http://www.sergioapps.com/storefront.html',
    'http://www.sergioapps.com/storefront.html',
    'http://www.sergioapps.com/storefront.html',
    'http://www.sergioapps.com/storefront.html',
    'http://www.sergioapps.com/storefront.html',
    'http://www.sergioapps.com/storefront.html',
    'http://www.sergioapps.com/storefront.html'
  ];

  constructor(private location: Location,
              private LocalStorage: LocalStorageService,
              public sanitizer: DomSanitizer,
              private windowService: WindowService,
              private browserrouter: Router,
              private route: ActivatedRoute) { 

    // this.page = this.sanitizer.bypassSecurityTrustResourceUrl('');

    // subscribe to the window resize event
    windowService.size$.subscribe((value: any) => {
      // alert('width: ' + value.width + '\rheight: ' + value.height);
      // $('#iframe_browser').width(100 + value.width + 'px');
      // $('#iframe_browser').height(100 + value.height + 'px');
      this._zwidth = value.width;
      this._zheight = window.innerHeight - 60;
    });

    // get URL parameters
    // this.sub = this.route
    //   .params
    //   .subscribe(params => {
    //     // by passing the name we can customize for certain web pages
    //     // this.name = params['name'];
    //     this._zwidth = window.innerWidth;
    //     this.zurl = params['url'];
    // });
  }

  ngOnInit() {
    const imgPrefix = './assets/img_ads/';
    this.randNum = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    const newBannerImg = imgPrefix + this.adBanners[this.randNum];
    // update new img src and link HREF value
    $('#adimage').attr('src', newBannerImg);
  }

  CallBrowser(event, categoryRef: string) {
    event.preventDefault();

    const newBannerLink = this.bannerLinks[this.randNum];
    window.open(newBannerLink, '_self', '', true);

    // This location call allows back button on mobile devices to work correctly!
    this.location.go('');
  }

}

