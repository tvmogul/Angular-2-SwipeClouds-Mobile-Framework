import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

import { JsonpModule } from '@angular/http';


import { SwipeCloudComponent } from './components/swipe-cloud/swipe-cloud.component';
import { VideoComponent } from './components/video/video.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { VideoNavbarComponent } from './components/video-navbar/video-navbar.component';
import { SwipecloudNavbarComponent } from './components/swipecloud-navbar/swipecloud-navbar.component';
import { SwipecloudHeaderComponent } from './components/swipecloud-header/swipecloud-header.component';
import { VideoHeaderComponent } from './components/video-header/video-header.component';

import { DataObservableService } from './services/data-observable.service';
import { LocalStorageService } from './services/local-storage.service';
import { BlankComponent } from './components/blank/blank.component';
import { DialogAnchorDirective } from './shared/dialog/dialog-anchor.directive';
import { DialogComponent } from './shared/dialog/dialog.component';
import { CordovaComponent } from './components/cordova/cordova.component';
import { CordovaHeaderComponent } from './components/cordova-header/cordova-header.component';
import { CordovaNavbarComponent } from './components/cordova-navbar/cordova-navbar.component';
import { BrowserComponent } from './components/browser/browser.component';
import { BrowserHeaderComponent } from './components/browser-header/browser-header.component';
import { BrowserNavbarComponent } from './components/browser-navbar/browser-navbar.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { ScannerHeaderComponent } from './components/scanner-header/scanner-header.component';
import { ScannerNavbarComponent } from './components/scanner-navbar/scanner-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SwipeCloudComponent,
    VideoComponent,
    VideoNavbarComponent,
    SwipecloudNavbarComponent,
    SwipecloudHeaderComponent,
    VideoHeaderComponent,
    BlankComponent,
    DialogAnchorDirective,
    DialogComponent,
    CordovaComponent,
    CordovaHeaderComponent,
    CordovaNavbarComponent,
    BrowserComponent,
    BrowserHeaderComponent,
    BrowserNavbarComponent,
    ScannerComponent,
    ScannerHeaderComponent,
    ScannerNavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})

export class AppModule {


  
  // onClick(button: string) {
  //   alert(button);
  // }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   alert(event.target.innerWidth); 
  // }

}

