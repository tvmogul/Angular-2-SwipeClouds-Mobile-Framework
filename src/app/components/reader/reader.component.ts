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
import {Pipe, PipeTransform} from '@angular/core';
import { Directive, HostListener, Renderer } from '@angular/core';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
  providers: [WindowService]
})
export class ReaderComponent implements OnInit {

  public htmlText: any;
  public zebra: any;
  public sub: any; // -> Subscriber
  public _name: any;

  constructor(private route: ActivatedRoute,
              private videorouter: Router,
              private windowService: WindowService,
              private LocalStorage: LocalStorageService,
              private sanitizer: DomSanitizer,
              private el: ElementRef, 
              private renderer: Renderer) {

    $(window).on('orientationchange', function(event) {
      // this.updateVideoLayout();
    });

    // subscribe to the window resize event
    windowService.size$.subscribe((value:any) => {
      // alert('VIDEO - windowService:\r\n' + 'width: ' + window.innerWidth + 'height: ' + window.innerHeight);
      // this.updateVideoLayout();
    });

    // get URL parameters
    this.sub = this.route
      .params
      .subscribe(params => {
        this._name = params['name'];
        // alert(this._name);
    });


  }

  ngOnInit() {
    this.zebra = this.LocalStorage.get('feeds_item');
    $('#warnings').html(this.zebra.warnings);
    $('#sideeffects').html(this.zebra.sideeffects);
    $('#description').html(this.zebra.description);
  }

}

