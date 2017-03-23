import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GetPageService {

    private retryCount = 3;

    constructor(private _http: Http) {
    }

    getPage(url: any) {
      return this._http.get(url)
        .retry(this.retryCount)
        .map((res) => {
            return res.url;
        })
        .catch((err) => {
        const errMsg = (err.error) ? err.errmsg : err;
            console.error(errMsg);
            return Observable.throw(errMsg);
        });
    }
}
