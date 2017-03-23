import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browser-header',
  templateUrl: './browser-header.component.html',
  styleUrls: ['./browser-header.component.css']
})
export class BrowserHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // document.getElementById('browserheader').style.backgroundColor = '#000000';
    // document.getElementById('browserheader').style.backgroundImage = 'url(./assets/img/bg_clouds.gif)';
    // document.getElementById('browserheader').style.backgroundSize = 'cover';
  }

}
