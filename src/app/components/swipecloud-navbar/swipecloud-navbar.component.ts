import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Routes, RouterModule, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-swipecloud-navbar',
  templateUrl: './swipecloud-navbar.component.html',
  styleUrls: ['./swipecloud-navbar.component.css']
})
export class SwipecloudNavbarComponent implements OnInit {

  // inject Location into class constructor
  constructor(private location: Location,
              private LocalStorage: LocalStorageService,
              private navbarCloudsRouter: Router) { }

  ngOnInit() {
    if (this.LocalStorage.isAvailable()) {
        let s = this.LocalStorage.get('feeds_swipeclouds');
        s.start = 0;
        this.LocalStorage.set('feeds_swipeclouds', s);
    }
  }

  CallBrowser(event, categoryRef: string) {
    event.preventDefault();
    window.open(categoryRef, '_self', '', true);
    // This location call allows back button on mobile devices to work correctly!
    this.location.go('');
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
}
