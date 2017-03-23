import { Component, OnInit, Injectable } from '@angular/core';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-cordova-header',
  templateUrl: './cordova-header.component.html',
  styleUrls: ['./cordova-header.component.css']
})
export class CordovaHeaderComponent implements OnInit {

  constructor(private LocalStorage: LocalStorageService) { }

  ngOnInit() {
    const _page = this.LocalStorage.get('page_swipeclouds');
    // <div [hidden]='!show_legal'><app-browser-header></app-browser-header></div> 
    // this.show_swipecloud = true;
    // this.show_video = false;
    // this. show_cordova = false;
    // this.show_browser = false;
    if (_page === 'swipeclouds') {
      // this.visible = true;
    }

  }

}
