import { Component, Injectable, ElementRef, ViewChild } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
// import 'rxjs/add/operator/pairwise';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Config } from 'app/services/config.service';

declare var TagCanvas: any;
declare var jQuery: any;
declare var $: any;


@Component({
selector: 'app-swipecloud-header',
templateUrl: './swipecloud-header.component.html',
styleUrls: ['./swipecloud-header.component.css']
})
export class SwipecloudHeaderComponent {
  elementRef: ElementRef;
  @ViewChild('swipeCanvas') swipeCanvas: ElementRef;


    constructor(private LocalStorage: LocalStorageService,
        private cloudsheaderrouter: Router) {

    }

    cloudRoutes(event, categoryRef: string) {
        event.preventDefault();
        // if (categoryRef === 'cloud') {
        //     this.nextCloud();
        // } 
        // if (categoryRef === 'bgimage') {
        //     this.nextBackground();
        // } 
    }

    nextCloud(event) {
        event.preventDefault();
        $('[data-role=panel]').panel('close');

        let s = this.LocalStorage.get('settings_swipeclouds');
        if (s) {
            if (s.cloudid + 1 < Config.DATA_CLOUDS.length) { 
                s.cloudid = s.cloudid + 1; 
            } else { 
                s.cloudid = 0; 
            }
            this.LocalStorage.set('settings_swipeclouds', s);
        } 
        this.cloudsheaderrouter.navigate(['/blank']);
        setTimeout( () => {
            // this.cloudsheaderrouter.navigate(['/swipeclouds', {cloudid: s.cloudid }]);
            this.cloudsheaderrouter.navigate(['/swipeclouds', {action: 'nextcloud', actionid: s.cloudid }]);
            // this.cloudsheaderrouter.navigate(['/swipeclouds'] );
        }, 1);
    }

    nextBackground(event) {
        event.preventDefault();
        // $('#panel_controls').panel('close');
        let g = this.LocalStorage.get('settings_swipeclouds');
        if (g) {
            if (g.bgimage + 1 < Config.DATA_BACKGROUNDS.length) { g.bgimage = g.bgimage + 1; } else { g.bgimage = 0; }
            this.LocalStorage.set('settings_swipeclouds', g);
            document.getElementById('swipeCanvas').style.backgroundColor = '#000000';
            document.getElementById('swipeCanvas').style.backgroundImage = 'url(./assets/img/' 
            + Config.DATA_BACKGROUNDS[g.bgimage] + ')';
            document.getElementById('swipeCanvas').style.backgroundSize = 'cover';
        }
        // this.cloudsheaderrouter.navigate(['/blank']);
        // setTimeout( () => {
        //     this.cloudsheaderrouter.navigate(['/swipeclouds', {action: 'nextbackground', actionid: g.bgimage }]);
        // }, 1);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
