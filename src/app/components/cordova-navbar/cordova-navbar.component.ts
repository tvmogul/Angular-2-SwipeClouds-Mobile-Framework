import { Component, OnInit, Injectable } from '@angular/core';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Routes, RouterModule, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
@Component({
  selector: 'app-cordova-navbar',
  templateUrl: './cordova-navbar.component.html',
  styleUrls: ['./cordova-navbar.component.css']
})
export class CordovaNavbarComponent implements OnInit {

  // inject Location into class constructor
  constructor(private location: Location,
              private navbarCordovaRouter: Router) { }

  ngOnInit() {
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  CallBrowser(event, categoryRef: string) {
    event.preventDefault();
    // http:///android_asset/www/index.html/swipeclouds
    // this._router.navigateByUrl(prevInstruction.urlPath);
    // this.router.navigate(["/"]).then(result=>{window.location.href = 'http://www.cnn.com/';});
    window.open(categoryRef, '_self', '', true);
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
