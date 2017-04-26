import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

declare var cordova: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-cordova',
  templateUrl: './cordova.component.html',
  styleUrls: ['./cordova.component.css']
})
export class CordovaComponent implements OnInit {
  public cordovatools: Array<any>;

  constructor(private cordovarouter: Router) {

    // To use this with *ngFor we must convert to an array
    this.cordovatools  = [
    {
      title: 'Cordova User Data Plugin Dialog',
      description: 'Displays Scrapped User Data in Java Dialog',
      linkValue: 'showUserDataListView',
      image: '1_infodialog.png',
      rank: 100
    },
    {
      title: 'Cordova User Data Plugin JSON',
      description: 'Returns Scrapped User Data in JSON Format',
      linkValue: 'getUserDataJson',
      image: '1_infojson.png',
      rank: 99
    },
    {
      title: 'Cordova Compass Plugin',
      description: 'Different Compasses',
      linkValue: 'compass',
      image: '1_compass.png',
      rank: 98
    },
    {
      title: 'Cordova Barcode Scanner Plugin',
      description: 'Barcode Scanner',
      linkValue: 'scanner',
      image: '1_scan.png',
      rank: 97
    }
    // {
    //   title: 'Cordova Float Compass Plugin',
    //   description: 'Tests Floating Compass',
    //   linkValue: 'floatcompass',
    //   image: '1_floatcompass.png',
    //   rank: 100
    // }
  ];

  }

  ngOnInit() {
    // this.bindEvents = function () {
    //     document.addEventListener('deviceready', function () {
    //     bootstrap(App);
    //   }, false);
    //     };
    //   //If cordova is present, wait for it to initialize, otherwise just try to
    //   //bootstrap the application.
    //   if (window.cordova !== undefined) {
    //     this.bindEvents();
    //   } else {
    //     console.log('no device');
    //     bootstrap(App);
    //   }
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => {
      return obj[key];
    });
  }

  CordovaPlugin(event, categoryRef: string) {
    event.preventDefault();
    let _param = 'User Data';
    if (categoryRef === 'showUserDataListView') {
      cordova.exec(this.showUserDataSuccess, this.showUserDataFailure, 'UserDataPlugin', 'showUserDataListView', [_param]);
    } else if (categoryRef === 'getUserDataJson') {
      cordova.exec(this.getUserDataJson, this.showUserDataFailure, 'UserDataPlugin', 'getUserDataJson', []);
    }else if (categoryRef === 'compass') {
      // alert('Plugin: CompassPlugin' + '\r\n' + 'Function: showCompass' + '\r\n' + 'Parameter: Compass');
      _param = 'Compass';
      cordova.exec(this.showCompassSuccess, this.showCompassFailure, 'CompassPlugin', 'showCompass', [_param]);
    } else if (categoryRef === 'floatcompass') {
      // alert('Plugin: CompassPlugin' + '\r\n' + 'Function: floatCompass' + '\r\n' + 'Parameter: float');
      _param = 'float';
      cordova.exec(this.showCompassSuccess, this.showCompassFailure, 'CompassPlugin', 'floatCompass', [_param]);
    } else if (categoryRef === 'scanner') {
      // this.cordovarouter.navigate(['/scanner']);
      // alert('Scanner Code Being Called!');
      cordova.exec(this.showScannerSuccess, this.showScannerFailure, 'BarcodeScanner', 'scan', []);
    }
  } // end CordovaPlugins

  getUserDataString(result) {
    alert('User Data: ' + result.text);
  }

  getUserDataJson(result) {
    const displaydata = 'appname: ' + result.appname
    + '\n\nappid: ' + result.uuid_appid
    + '\n\niphoneid: ' + result.iphoneid
    + '\n\nandroidid: ' + result.androidid
    + '\n\ndeviceid: ' + result.deviceid
    + '\n\nsubscriberid: ' + result.subscriberid
    + '\n\nsimcardsn: ' + result.simcardsn
    + '\n\nipaddress: ' + result.ipaddress
    + '\n\nipaddress2: ' + result.ipaddress2
    + '\n\nmacaddress: ' + result.macaddress
    + '\n\ndevicename: ' + result.devicename
    + '\n\nappversion: ' + result.appversion
    + '\n\nsdk: ' + result.sdk
    + '\n\nname: ' + result.name
    + '\n\nph: ' + result.ph
    + '\n\nemail: ' + result.email
    + '\n\ncity: ' + result.city
    + '\n\nstate: ' + result.state
    + '\n\nctry: ' + result.ctry
    + '\n\npc: ' + result.pc
    + '\n\nlat: ' + result.lat
    + '\n\nlng: ' + result.lng
    + '\n\n';
    alert(displaydata);
  }
  showUserDataSuccess() {
    alert('success!');
  }
  showUserDataFailure() {
    alert('failure!');
  }

  showCompassSuccess() {
    alert('success!');
  }
  showCompassFailure() {
    alert('failure!');
  }

  showScannerSuccess(result) {
    alert('scan results: ' + result.text + '\r\nformat: ' + result.format + '\r\ncancelled: ' + result.cancelled);
  }
  showScannerFailure() {
    alert('scanner failure!');
  }

}

