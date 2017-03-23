import { Component, OnInit, Injectable } from '@angular/core';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-video-header',
  templateUrl: './video-header.component.html',
  styleUrls: ['./video-header.component.css']
})

export class VideoHeaderComponent implements OnInit {

  constructor(private videoheaderrouter: Router) { }

  ngOnInit() {
  }

  playontv() {

    this.videoheaderrouter.navigate(['/blank']);
    setTimeout( () => {
        this.videoheaderrouter.navigate(['/video', {category: 'playontv', start: 0}]);
    }, 1);


  }

}
