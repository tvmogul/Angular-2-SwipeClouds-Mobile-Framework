// import { Component, OnInit, Injectable, ApplicationRef, ChangeDetectorRef, Input } from '@angular/core';
import { Component, OnInit, Injectable } from '@angular/core';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { DataObservableService } from 'app/services/data-observable.service';
import { Feed } from 'app/shared/interfaces';
import { Location } from '@angular/common';
// import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
// import { Directive, ElementRef } from '@angular/core';

@Injectable()
@Component({
  selector: 'app-rss-navbar',
  templateUrl: './rss-navbar.component.html',
  styleUrls: ['./rss-navbar.component.css'],
  providers: [DataObservableService]
})

export class RssNavbarComponent implements OnInit {

  // inject Location into class constructor
  constructor(private location: Location,
              private LocalStorage: LocalStorageService,
              private feedsObservableService: DataObservableService,
    // private cdr: ChangeDetectorRef,
    // private _elementRef: ElementRef,
    private rssnavbarrouter: Router) { 
  }

  ngOnInit() {
  }

  prev(event, pageRef: string) {
    event.preventDefault();
    let s = this.LocalStorage.get('feeds_swipeclouds');
    if (s) {
        s.start = s.start - s.max;
        if (s.start < 0) { s.start = 0; }
        this.LocalStorage.set('feeds_swipeclouds', s);
        // this.videonavbarrouter.navigate(['/video?cat=' + s.category, s.category]);
        this.rssnavbarrouter.navigate(['/blank']);
        setTimeout( () => {
            this.rssnavbarrouter.navigate(['/rss', { start: s.start }]);
        }, 1);
    }
  }

  next(event, pageRef: string) { 
    event.preventDefault();
    let s = this.LocalStorage.get('feeds_swipeclouds');
    if (s) {
        s.start = s.start + s.max;
        this.LocalStorage.set('feeds_swipeclouds', s);
        this.rssnavbarrouter.navigate(['/blank']);
        setTimeout( () => {
          this.rssnavbarrouter.navigate(['/video', { start: s.start }]);
        }, 1);
    }
  }

  clouds(event, pageRef: string) {
    if (this.LocalStorage.isAvailable()) {
        let s = this.LocalStorage.get('feeds_swipeclouds');
        s.start = 0;
        this.LocalStorage.set('feeds_swipeclouds', s);
        this.rssnavbarrouter.navigate(['/swipeclouds']);
    }
  }

  CallBrowser(event, categoryRef: string) {
    event.preventDefault();
    window.open(categoryRef, '_self', '', true);
    this.location.go('');
  }

}
