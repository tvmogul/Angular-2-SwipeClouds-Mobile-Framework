import { Component, OnInit, Injectable } from '@angular/core';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-rss-header',
  templateUrl: './rss-header.component.html',
  styleUrls: ['./rss-header.component.css']
})

export class RssHeaderComponent implements OnInit {

  constructor(private rssheaderrouter: Router) { }

  ngOnInit() {
  }

  playontv() {

    this.rssheaderrouter.navigate(['/blank']);
    setTimeout( () => {
        this.rssheaderrouter.navigate(['/rss', {category: 'playontv', start: 0}]);
    }, 1);


  }

}
