import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class WindowService {
    // create more Observables as and when needed for various properties
    size$: Observable<Array<any>>;
    orientation$: Observable<any>;

    constructor() {
        // Track widow size changes
        const windowSize$ = new BehaviorSubject(getWindowSize());
        this.size$ = (windowSize$.pluck('size') as Observable<Array<any>>).distinctUntilChanged(); 
        new Observable<Array<any>>().distinctUntilChanged();
        Observable.fromEvent(window, 'resize')
            .map(getWindowSize)
            .subscribe(windowSize$);
    }
}

function getWindowSize() {
    return {
        size: { width: window.innerWidth,  height: window.innerHeight }
    };
};

