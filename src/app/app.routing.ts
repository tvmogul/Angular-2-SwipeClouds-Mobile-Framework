import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwipeCloudComponent } from './components/swipe-cloud/swipe-cloud.component';
import { VideoComponent } from './components/video/video.component';
import { CordovaComponent } from './components/cordova/cordova.component';
import { BrowserComponent } from './components/browser/browser.component';
import { RssComponent } from './components/rss/rss.component';
import { BlankComponent } from './components/blank/blank.component';
import { ReaderComponent } from './components/reader/reader.component';
import { AdsComponent } from './components/ads/ads.component';
import { AppComponent } from './app.component';

// let NavigationExtras: Array<any>;

const routes: Routes = [
    {path: '', pathMatch: 'prefix', redirectTo: 'swipeclouds'},
    {path: 'swipeclouds', component: SwipeCloudComponent},
    {path: 'video', component: VideoComponent},
    {path: 'cordova', component: CordovaComponent},
    {path: 'browser', component: BrowserComponent},
    {path: 'rss', component: RssComponent},
    {path: 'reader', component: ReaderComponent},
    {path: 'ads', component: AdsComponent},
    {path: 'blank', component: BlankComponent},
    {path: '**', pathMatch: 'prefix', redirectTo: ''}
];

// <a [routerLink]="['product-list']" [queryParams]="{ page: 99 }">Go to Page 99</a>
// goToPage(pageNum) {
//     this.router.navigate(['/product-list'], { queryParams: { page: pageNum } });
// }

// @RouteConfig([
// { path: "/", name: "First" , component: FirstPage, useAsDefault:true },
// { path: "/xyz", name: "XYZ" , component: XYZComponent }
// ])
// export interface Route {
//     path?: string;
//     pathMatch?: 'full' | 'prefix';
//     component?: Type | string;
//     redirectTo?: string;
//     outlet?: string;
//     canActivate?: any[];
//     canDeactivate?: any[];
//     data?: Data;
//     resolve?: ResolveData;
//     children?: Route[];
// }

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

export const routingComponents = [SwipeCloudComponent, VideoComponent, CordovaComponent, BrowserComponent, RssComponent, BlankComponent, ReaderComponent, AdsComponent];