import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml, SafeUrl, SafeStyle} from '@angular/platform-browser';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Config } from 'app/services/config.service';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Feed } from 'app/shared/interfaces';


@Injectable()
export class DataObservableService {
    headers: Headers;
    options: RequestOptions;
    // feeds: Feed[];
    // component state is now member variables, no more $scope
    items: Array<Feed>;

    feeds: any;
    rawfeeds: any;
    private retryCount = 2;

    _category = 'movies';
    _mcat = ''; // movie category
    _start = 1; // rss_ads.start_index;
    _max = 200;
    _pc = '';   // Postal Code of store placing ads
    _rad = '';  // Radius around Postal Code to retrieve ads based on zip code radius


    // constructors do dependency injection in Angular2
    constructor(private http: Http,
        private _jsonp: Jsonp,
        private sanitizer: DomSanitizer,
        private LocalStorage: LocalStorageService) {
        this.headers = new Headers(
            {
                'Content-Type': 'application/json',
                'Accept': 'q=0.8;application/json;q=0.9',
                'async': true,
                'dataType': 'jsonp'
            });
        this.options = new RequestOptions({ headers: this.headers });
    }

    getServiceFeedsJsonp(): Observable<any> {

        let s = this.LocalStorage.get('feeds_swipeclouds');
        if (s) {
            let s = this.LocalStorage.get('feeds_swipeclouds');
            this._category = s.category; // feed category
            this._mcat = s.mcat;         // movie or video subcategory
            this._start = s.start;       // number of ad to start with
            this._max = s.max;           // maximum number of feeds to retrieve
            this._pc = s.pc;             // postal code for ads
            this._rad = s.rad;           // postal code radius
            // this.LocalStorage.set('feeds_swipeclouds', s);
        }

        const jsonp_base = Config.JSONP_DOMAIN1;
        // let jsonp_param = 'cat=dtv_new&mcat=&start=1&max=25&pc=&rad=&methodName=Feeds&jsonp=JSONP_CALLBACK';
        // let jsonp_param = 'cat=' + this._category +  '&mcat=&start=1&max=25&pc=&rad=&methodName=Feeds&jsonp=JSONP_CALLBACK';
        let jsonp_param = 'cat=' + this._category +  '&mcat=' + this._mcat + '&start=' + this._start + '&max=';
        jsonp_param = jsonp_param + this._max + '&pc=' + this._pc + '&rad=' + this._rad + '&methodName=Feeds&jsonp=JSONP_CALLBACK';
        // we add a random vaule to prevent caching - this trick works nicely!

        // Editor says use const but these aren't so I used 'let' instead of 'const'
        let jsonp_rnd = '&rnd=' + this.getRandomInt(1, 500);
        let jsonp_url = jsonp_base + jsonp_param + jsonp_rnd;

        return this._jsonp
            .get(jsonp_url, this.options)
            .retry(this.retryCount)
            .map( (res) => {
                const feeds = res.json();
                this.checkFeeds(feeds);
                return feeds;
            })
            // // next transform - each element in the
            // // array to a Feed class instance
            // .map((items: Array<any>) => {
            //     let result: Array<Feed>;
            //     if (items) {
            //         items.forEach((item) => {
            //             alert(item.duration);
            //         });
            //     }
            //     return result;
            // })
            .catch(this.handleError);
    }

    getJsonLocal() {
        let s = this.LocalStorage.get('feeds_swipeclouds');
        if (s) {
            this._category = s.category;
            this._mcat = s.mcat;
            this._start = s.start;
            this._max = s.max;
            this._pc = s.pc;
            this._rad = s.rad;
            // this.LocalStorage.set('feeds_swipeclouds', s);
        }

        let local_base = './assets/data/' + this._category + '.json?';  // ./assets/data/movies.json
        // we add a random vaule to prevent caching - this trick works nicely!
        let local_rnd = 'rnd=' + this.getRandomInt(1, 500);
        let local_url = local_base + local_rnd;

       return this.http.request(local_url, { method: 'Get' })
        .map( (res) => {
            let feeds = res.json();
            this.checkFeeds(feeds);
            return feeds;
        })
        .catch(this.handleError);
    }

    test() {
        // ttest
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getService(url: string): Observable<any> {
        this.headers = new Headers(
            {
                'Content-Type': 'application/json',
                'Accept': 'q=0.8;application/json;q=0.9',
                'async': true,
                'dataType': 'json'
            });
        this.options = new RequestOptions({ headers: this.headers });

        return this.http
            .get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getServiceWithDynamicQueryTerm(url: string, key: string, val: string): Observable<any> {
        return this.http
            .get(url + '/?' + key + '=' + val, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getServiceWithFixedQueryString(url: string, param: any): Observable<any> {
        this.options = new RequestOptions({ headers: this.headers, search: 'query=' + param });
        return this.http
            .get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getServiceWithComplexObjectAsQueryString(url: string, param: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (let key in param) {
            if (param.hasOwnProperty(key)) {
                let val = param[key];
                params.set(key, val);
            }
        }
        this.options = new RequestOptions({ headers: this.headers, search: params });
        return this.http
            .get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createService(url: string, param: any): Observable<any> {
        let body = JSON.stringify(param);
        return this.http
            .post(url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateService(url: string, param: any): Observable<any> {
        let body = JSON.stringify(param);
        return this.http
            .put(url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    patchService(url: string, param: any): Observable<any> {
        let body = JSON.stringify(param);
        return this.http
            .patch(url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteService(url: string, param: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (let key in param) {
            if (param.hasOwnProperty(key)) {
                let val = param[key];
                params.set(key, val);
            }
        }
        this.options = new RequestOptions({ headers: this.headers, search: params });
        return this.http
            .delete(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteServiceWithId(url: string, key: string, val: string): Observable<any> {
        return this.http
            .delete(url + '/?' + key + '=' + val, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    checkFeeds(feeds: Feed[]) {
        let total = 0;
        let bFirstVideo = false;
        // let feeds: Feed[];
        // let date = new Date(data.publishedDate);

        if (feeds) {
            feeds.forEach((data) => {
                data.title = this.cleanHTMLEntities(data.title);
                data.shortDescription = this.cleanHTMLEntities(data.shortDescription);
                data.description = this.cleanHTMLEntities(data.description);
                // Get embed format for given tube servers like youtube, vimeo, youku, etc.
                data.link  = this.getVideoEmbed(data.linkType, data.linkValue);
                // let objDate = { year: '', month: '', day: '', hours: '', minutes: '', seconds: '' };
                // this.getDate(date, objDate);
                total++;
            });
        };
    }

  cleanHTMLEntities(str) {
    // block creating object more than once
    const rssItem = document.createElement('div');
    if (str && typeof str === 'string') {
        // remove script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        rssItem.innerHTML = str;
        // 'textContent' isn't avaiable in IE8
        if (rssItem.textContent === undefined) {
          str = rssItem.innerText;
          rssItem.innerText = '';
        } else {
          str = rssItem.textContent;
          rssItem.textContent = '';
        }
    }
    return str;
  };


  getDate = function (date, objDate) {
    // Create object whoose properties are feed values
    let day = date.getUTCDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    objDate.year = (year.toString().length === 1 ? '0' : '') + year;
    objDate.month = (month.toString().length === 1 ? '0' : '') + month;
    objDate.day = (day.toString().length === 1 ? '0' : '') + day;
    objDate.hours = (hours.toString().length === 1 ? '0' : '') + hours;
    objDate.minutes = (minutes.toString().length === 1 ? '0' : '') + minutes;
    objDate.seconds = (seconds.toString().length === 1 ? '0' : '') + seconds;
  };

  getVideoEmbed(tube, videoidVal) {
    let embedUrl = '';
    // if ( (tube.length < 1) || (videoidVal.length < 1) ||
    //     (tube.length === 'undefined') ||  (tube.length === 'undefined')
    // ) {
    //     embedUrl = 'http://www.youtube.com/embed?listType=search&amp;list=HppJHKwCGCo&format=5';
    // }
    if ((tube === 'category') || (tube === 'music') || (tube === 'web')) {
      embedUrl = videoidVal;
    } else if ((tube === 'yt_channel') || (tube === 'channel_youtube')) {
      embedUrl = 'http://www.youtube.com/embed?listType=search&amp;list=' + videoidVal + '&format=5';
    } else if ((tube === 'youtube') || (tube === 'embed_youtube')) {
      embedUrl = 'http://www.youtube.com/embed/' + videoidVal;
    } else if ((tube === 'youku') || (tube === 'embed_youku')) {
      embedUrl = 'http://player.youku.com/embed/' + videoidVal;
    } else if ((tube === 'vimeo') || (tube === 'embed_vimeo')) {
      embedUrl = 'http://player.vimeo.com/video/' + videoidVal;
    } else if ((tube === 'ustreamtv') || (tube === 'embed_ustreamtv')) {
      embedUrl = 'http://www.ustream.tv/embed/' + videoidVal;
    } else if ((tube === 'animalplanet') || (tube === 'embed_animalplanet')) {
      embedUrl = 'http://www.animalplanet.com/embed?page=' + videoidVal;
    } else if ((tube === 'dailymotion') || (tube === 'embed_dailymotion')) {
      embedUrl = 'http://www.dailymotion.com/embed/video/' + videoidVal;
    } else if ((tube === '5min') || (tube === 'embed_5min')) {
      embedUrl = 'http://embed.5min.com/' + videoidVal;
    } else if ((tube === 'cc') || (tube === 'embed_cc')) {
      embedUrl = 'http://media.mtvnservices.com/embed/' + videoidVal;
    } else if ((tube === 'meta_ua') || (tube === 'embed_meta_ua')) {
      embedUrl = 'http://video.meta.ua/iframe/' + videoidVal;
    } else if ((tube === 'tune_pk') || (tube === 'embed_tune_pk')) {
      embedUrl = 'http://tune.pk/player/embed_player.php?vid=' + videoidVal + '&autoplay=no';
    } else if ((tube === 'metacafe') || (tube === 'embed_metacafe')) {
      embedUrl = 'http://www.metacafe.com/embed/' + videoidVal;
    } else if ((tube === 'liveleak') || (tube === 'embed_liveleak')) {
      embedUrl = 'http://www.liveleak.com/ll_embed?f=' + videoidVal;
    } else if ((tube === 'ebaumsworld') || (tube === 'embed_ebaumsworld')) {
      embedUrl = 'http://www.ebaumsworld.com/media/embed/' + videoidVal;
    } else if ((tube === 'bliptv') || (tube === 'embed_blip')) {
      embedUrl = 'http://blip.tv/play/' + videoidVal;
    } else if ((tube === 'funnyordie') || (tube === 'embed_funnyordie')) {
      embedUrl = 'http://www.funnyordie.com/embed/' + videoidVal;
    } else if ((tube === 'stupidvideos') || (tube === 'embed_stupidvideos')) {
      embedUrl = 'http://www.stupidvideos.com/embed/?video=' + videoidVal;
    }
    return embedUrl;
  };


}


// getServiceFeedsJsonp(url: string): Observable<any> {
//     return this._jsonp
//         .get(url, this.options)
//         // initial transform - result to json
//         .map( (res) => {
//             // alert(JSON.stringify(responseData.json()));
//             return res.json();
//         })
//         // next transform - each element in the 
//         // array to a Feed class instance
//         // .map((items: Array<any>) => {
//         //     let result: Array<Feed>;
//         //     if (items) {
//         //        items.forEach((item) => {
//         //             result.push(new Feed(item.FeedId, item.category, item.title, item.author, item.shortDescription,
//         //                                     item.description, item.link, item.linkType, item.linkValue, item.image,
//         //                                     item.rank, item.showvideo, item.moviecategory, item.duration));
//         //         });
//         //     }
//         //     return result;
//         // })
//         .catch(this.handleError);
// }
// let s = 'FeedId: ' + item.FeedId + '\r' +
// 'category: ' + item.category + '\r' +
// 'title: ' + item.title + '\r' +
// 'author: ' + item.author + '\r' +
// 'shortDescription: ' + item.shortDescription + '\r' +
// 'description: ' + item.description + '\r' +
// 'link: ' + item.link + '\r' +
// 'linkType: ' + item.linkType + '\r' +
// 'linkValue: ' + item.linkValue + '\r' +
// 'image: ' + item.image + '\r' +
// 'rank: ' + item.rank + '\r' +
// 'showvideo: ' + item.showvideo + '\r' +
// 'moviecategory: ' + item.moviecategory + '\r' +
// 'duration: ' + item.duration;
// alert(s);
