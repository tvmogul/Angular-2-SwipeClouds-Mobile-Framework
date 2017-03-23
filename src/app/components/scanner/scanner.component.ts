import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

declare var cordova: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})

export class ScannerComponent implements OnInit {

  constructor(private LocalStorage: LocalStorageService) { }

  ngOnInit() {
  }

  loadScan(event, browserRef: string) {
    event.preventDefault();
    // $('[data-role=panel]').panel('close');
    this.startScan();
  }

  loadLookupScan(event, browserRef: string) {
    event.preventDefault();
    // $('[data-role=panel]').panel('close');
    this.LookupScan();
  }

  startScan() {
    // // // event.preventDefault();
    // // let scanObject = { 'scanresults': '', 'format': '', 'cancelled': true };
    // // localStorage.setItem('scanObject', JSON.stringify(scanObject));
    // // let retrievedObject = this.LocalStorage.get('scanObject');
    // // let x = JSON.parse(retrievedObject);
    // // alert(x.scanresults + '\n' + x.format + '\n' + x.cancelled);

    // cordova.plugins.barcodeScanner.scan (
    //   function (result) {
    //     let scanObject = { 'scanresults': result.text, 'format': result.format, 'cancelled': result.cancelled };
    //     this.LocalStorage.set('scanObject', JSON.stringify(scanObject));
    //     // $.mobile.changePage("#displayScan");
    //     // window.location = "./qrurl.html#displayScan";
    //     // e.preventDefault();
    //     // scanObject = { 'scanresults': '', 'format': '', 'cancelled': true };
    //     // this.LocalStorage.set('scanObject', JSON.stringify(scanObject));
    //     // scanObject = this.LocalStorage.get('scanObject');
    //     // var x = JSON.parse(scanObject);
    //     // alert(x.scanresults + '\n' + x.format + '\n' + x.cancelled);

    //     $('#scan_result').text(result.text);
    //     $('#scan_format').text(result.format);
    //     // let urlManager = UrlManager.getInstance();
    //     if ((!result.cancelled) && (result.format.length > 0) && (result.text.length > 0)) {
    //       try {
    //         // var _time = (new Date()).getDate() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getFullYear();
    //         // var _title = 'Scan ' + scanObject.format + ' ' + _time;
    //         // var urlItem = new UrlItem(_title || '',
    //         //                           result.text || '',
    //         //                           result.format || '',
    //         //                           _time || '',
    //         //                           'Url_' + (new Date()).getTime() || '');
    //         // urlManager = UrlManager.getInstance();
    //         // urlManager.saveUrl(urlItem);
    //       } catch(e) { alert('Failed: ' + e); }
    //     } else {
    //         $('#scan_result').text('');
    //         $('#scan_format').text('');
    //     }
    //   },
    //   function (error) {
    //       alert('Scanning failed: ' + error);
    //       // $('#scan_result').text('');
    //       // $('#scan_format').text('');
    //       // scanObject = { 'scanresults': '', 'format': '', 'cancelled': true };
    //       // this.LocalStorage.set('scanObject', JSON.stringify(scanObject));
    //       // $.mobile.changePage("#mainPage");
    //       // window.location = "./qrurl.html#mainPage";
    //   }
    // );
  }

  LookupScan() {
    event.preventDefault();
    // $('[data-role=panel]').panel('close');
    let scanObject = localStorage.getItem('scanObject');
    let x = JSON.parse(scanObject);
    // alert(x.scanresults + '\n' + x.format + '\n' + x.cancelled);
    if (x.format === 'QR_CODE') {
        // window.open(zurl, '_blank');
    } else if (x.scanresults.length > 0) {
        window.open('https:www.google.com/search?q=' + x.scanresults + '&gws_rd=ssl', '_blank');
    } else {
        alert('No Scan Results to lookup!');
    }
    return false;
  }

}


	// var refreshIntervalId;
	// function refreshListView() {
	//     refreshIntervalId = setTimeout("refreshListViewDelayed()", 100);
	// }
	// function refreshListViewDelayed() {
	//     clearInterval(refreshIntervalId);
	//     $('#youtube-videogallery').listview('refresh');
	//     $(".videowrapper").find(".iscroll-content").resizeWrapper();
	// }