import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-browser-navbar',
  templateUrl: './browser-navbar.component.html',
  styleUrls: ['./browser-navbar.component.css']
})
export class BrowserNavbarComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {

  }

  CallBrowser(event, categoryRef: string) {
    event.preventDefault();
    window.open(categoryRef, '_self', '', true);
    this.location.go('');
  }

}
