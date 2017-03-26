<!-- Start Article -->
<span id="ArticleContent">

# SwipeClouds® Angular2 Mobile App Framework #
## by Bill SerGio ##

<ul class="download">
	<li><a href="http://www.swipeclouds.com/down/src.zip">Download src - 4.5 MB</a></li>
	<li><a href="http://www.swipeclouds.com/down/android_src.zip">Download android - 946.2 KB</a></li>
	<li><a href="http://www.swipeclouds.com/down/www.zip">Download www - 4.7 MB</a></li>
</ul>

# Angular 2 &amp; JQuery Mobile #
- <span style="color: #FF0000">**NO**</span> **Ionic**	
- <span style="color: #FF0000">**NO**</span> **Onsen UI**	
- <span style="color: #FF0000">**NO**</span> **TopCoat**	
- <span style="color: #FF0000">**NO**</span> **ng2-Bootstrap**
- <span style="color: #FF0000">**NO**</span> **Sencha Touch**
- <span style="color: #FF0000">**NO**</span> **NativeScript**
- <span style="color: #FF0000">**NO**</span> **Trigger.IO**
- <span style="color: #FF0000">**NO**</span> **Angular UI**
- <span style="color: #FF0000">**NO**</span> **Framework 7**
- <span style="color: #FF0000">**NO**</span> **Intel XDK**

<img height="520px" src="http://www.swipeclouds.com/img/swipeclouds.gif" width="264px" />
# A Few Features Included #

## 
- **How to Use JQuery Plugins in Angular2**
- **Cool Animated Canvas Backgrounds**
- **JSONP & Observables for Remote Data**
- **Pinch Clouds to Expand & Contract**
- **Angular2 Component Plays Embedded Videos**
- **Delivers Targeted Ads Based on Zip Code Radius**
- **Allows Use of Full-Featured SASS**
- **Angular2 ListView, Toolbar & NavBar**
- **iOS7 Frosted Panels & HTML Games Like Chess**
- **Angular2 Dialog Popup Component**
- **BarCode Scanner, UnserData & Compass Plugins**
- **Angular2 LocalStorage Component**
- **How to Load External Website Using Angular2**
- **Angular2 Back Button for External Sites**
- **Ability to Stream Video to Smart TV Sets** ##

## Introduction ##

<p>I have always liked the look and feel of JQuery Mobile and wanted to see how JQuery Mobile's styling would look in an Angular2 Mobile App where we let Angular2 control the DOM but take advantage of JQuery Mobile's cool Plugins and styling. You can easily ass Cordova or PhoneGap to this project. All the frameworks listed above like Ionic, etc. <strong>are all great frameworks </strong>that I have used for our clients BUT they are <strong>NOT </strong>needed to build a really cool, fully-functioning Angular2 Mobile App.. This article demonstrates how to use JQuery Plugins in an Angular2 Mobile App. For the main GUI in our Angular2 Mobile App I decided to use an amazing JavaScript canvas plugin by Graham Breach which I made some changes to for this project. &nbsp;For scrolling I used the JQuery plugin iScroll v4.2 by Matteo Spinelli. If you are tired of the same, boring look and feel of most mobile apps, then checkout my approach, which doesn't have any Ionic, or any of the third-party components listed above.</p>

<p>To run the compiled code to see what the Angular2 Mobile App looks like just open the www.zip folder in Visual Studio as a website and you can see what the app looks like. Later, after you have created the project you can run it from Node.js. If you just want to see the working app I posted the compiled .apk file for Android on my website and you can just scan the QR Cod below to load swipeclouds.apk on your Android mobile phone.</p>

<p><img height="100px" src="http://www.swipeclouds.com/img/dn_android.png" width="186px"></p>

<p>I believe that a first app in Angular 2 should have all the basics and so this sample project includes in this app:</p>

<ul>
	<li>SwipeClouds Interface</li>
	<li>Videos &amp; Movies from Hundreds of Tube Servers</li>
	<li>Super Good <strong>Chess</strong> Game</li>
	<li>Internal Browser for loading Local &amp; Remote html</li>
	<li>iOS7 Frosted Panels, Toolbars &amp; Navbars</li>
	<li><strong>Cordova Barcode Scanner</strong> (Full JavaScript &amp; Java Code)</li>
	<li><strong>Cordova Compass</strong> (5 Compasses &amp; Full JavaScript &amp; Java Code)</li>
	<li><strong>Cordova User Data Scrapper</strong>&nbsp;(Full JavaScript &amp; Java Code)</li>
</ul>

<p>Creating powerful Angular 2 Mobile Apps is fast and easy. You just run Angular CLI and then unzip the src.zip file above and copy the contents into the "src" directory created by the CLI and you have all the features above ready to go with full source code---WOW! If you would like to download the compiled Android apk file you can find that on my SwipeClouds website at: <a href="http://www.swipeclouds.com/" target="_blank">http://www.swipeclouds.com</a></p>

## Main GUI - Pinch to Size Cloud ##

<p>The main GUI is a SwipeCloud of floating images and you can swirl this cloud by swiping any of the images with your finger. Pinching the SwipeCloud with your fingers will increase and decrease the size of the SwipeCloud. This SwipeCloud is the main means of navigation for the Angular2 Mobile App and clicking on any of the images in the SwipeCloud will load a different view, which, in most cases will load the VideoComponent View for that particular group of video feeds from any tube server that allows embedding.</p>

<img height="384px" src="http://www.swipeclouds.com/img/pinch.gif" width="200px" />


Angular 2 Mobile App with a Very Different Look &amp; Feel<br>
with A Novel Approach to Navigation. JQuery has a lot of<br>
really cool, already-built CANVAS plugins like SwipeClouds<br>

**We set pinchZoom = true**

    function TouchDown(e) {
    var tg = EventToCanvasId(e), 
    tc = (tg &amp;&amp; TagCanvas.tc[tg]), p;
    if(tc &amp;&amp; e.changedTouches) {
    if(e.touches.length == 1 &amp;&amp; tc.touchState == 0) {
    tc.touchState = 1;
    tc.BeginDrag(e);
    if(p = EventXY(e, tc.canvas)) {
    tc.mx = p.x;
    tc.my = p.y; 
    tc.drawn = 0;
    }
    } else if(e.targetTouches.length == 2 &amp;&amp; 
    tc.<strong>pinchZoom</strong>) {
    tc.touchState = 3;
    tc.EndDrag();
    tc.BeginPinch(e);
    } else {&nbsp;tc.EndDrag();
    tc.EndPinch();
    tc.touchState = 0; }
    }}


## Layouts for Portrait vs. Landscape ##

<p>I decided that the best layout for video and the other views was to retain the Toolbar and Navbar in the Portrait Orientation and to Hide them in the Landscape Orientation. You can see this below. I added a button and code to stream the selected video from your mobile phone to any smart TV set using pairing from the tube server's site.</p>

<img height="320px" src="http://www.swipeclouds.com/img/orientation.jpg" width="628px" />

<p>I also used this approach for the SwipeClouds view. It made sense that if the user needs access to the Toolbar or Navbar from the Landscape Orientation the user just rotates the phone to the portrait and the controls appear.</p>

## Install Node.js ##

<p>Let's get started to building this Angular2 Mobile App by downloading Node.js which includes npm at <a href="https://nodejs.org/en/" target="_blank">https://nodejs.org/en/</a></p>

<p>At this point if you tried using npm it will most likely give you the dreaded and now famous error:<br>
<br>
<code><strong>npm ERR! Windows_NT 6.1.7601</strong></code><br>
<br>
There are numerous working fixes for this error if you are behind a proxy but if you are not  behind a proxy then trying to fix this error can make you crazy. Run the the commands below in a CMD window launched as <b>ADMINISTRATOR</b>:</p>

<pre lang="C++">npm config delete http-proxy
npm config delete https-proxy
npm config delete proxy -g
npm config delete http-proxy -g

<strong>THE REAL MAGIC TO FIXING THIS ERROR IS:</strong>
npm config set registry "http://registry.npmjs.org"
npm config set strict-ssl false
</pre>

<h2><strong>Angular2 CLI</strong></h2>

<p>I like the speed of development with Angular2 CLI but I dislike how buggy it is to work with at this time. I really dislike companies like Google telling me what my app should look like or what IDE I should use. The purpose of this article is to walk beginners through creating an Angular 2 App using CLI so let's start.</p>

<p>Install Angular CLI which will also install Angular's "ng" command globally on your system:</p>

<p>Directions for installing Angular-CLI are at: <a href="https://github.com/angular/angular-cli#updating-angular-cli">https://github.com/angular/angular-cli#updating-angular-cli</a></p>

    npm uninstall -g @angular/cli
    npm cache clean
    npm install -g @angular/cli@latest</b>
    
    To verify whether your installation
    completed successfully, you can run:
    
    ng version
    
    @angular/cli: 1.0.0-beta.32.3
    node: 7.4.0
    os: win32 x64

## Create Our Angular2 Mobile App ##

<p>Now that you have Angular CLI installed, you can generate an Angular2 Mobile App: Then create a directory for your Angular2 projects. On my computer I have a directory called "Angular2." From inside that directory using the <b>CMD prompt in administrator mod</b>e create your "first-app" as follows:</p>

    Select a folder - I used C:\Angular2
    C:\Angular2&gt;ng new first-app --routing--style=scss

## Installing &amp; Using Visual Studio Code IDE ##

<p>I used Microsoft's Visual Studio Code IDE which you can easily download and install from: <a href="http://code.visualstudio.com/" target="_blank">http://code.visualstudio.com/</a></p>

<p>Open <i><b>Visual Studio Code</b></i> and select the project folder "first-app" and open the Integrated Terminal Window as shown below. In the <i><b>Integrated Terminal Window</b></i> in <i><b>Visual Studio Code </b></i>run the command below which will create your "dist" directory for your finished project.</p>

<p><img height="319px" src="http://www.swipeclouds.com/img/ngbuild.jpg" width="474px"></p>

<p>Then run the default app installed by Angular2-CLI as follows:</p>

    C:\Angular2&gt;first-app&gt;ng serve

<p>This will start our Node.js server running on port 4200 so if you open your Chrome Web Browser to http://localhost:4200 you will see the application running. This will run the default Angular2 app that comes with Angular2 CLI.</p>

## What Can Wrong When You Run The App? ##

<p>In the sample project I left the includes for Cordova. If you leave these Cordova includes in the "index.html" then you will get the message below -<strong> DO NOT HIT THE "OK" BUTTON</strong> or the app will not load. Just hit the "<strong>CANCEL</strong>" button and the app will run in the browser.</p>

<p><img height="444px" src="http://www.swipeclouds.com/img/run_cordova.jpg" width="469px"></p>

## How to Compile Angular2 Apps as Mobile Apps Using Ahead-oF-Time Compilation (aot) ##

<p>Next we will add the source code for the source code for our mobile app to this default project. Download the zipped <strong>src.zip</strong> file posted above and empty the contents of the zipped "src" folder&nbsp;into the src folder of the project. &nbsp;And again run the command:</p>

    C:\Angular2&gt;first-app&gt;ng serve

<p>I will jump ahead here to explain how to build your "www" folder for mobile. The BIG SECRET to compiling an Angular 2 App for Mobile that isn't obvious. To build an Angular 2 App so it will work as a Mobile App in XCODE or Android Studio is setting up the pathways correctly. Look at the index.html from the "src" folder you added to the project and notice the following:</p>

    &lt;script&gt;document.write('&lt;base href="' + document.location + '" /&gt;');&lt;script&gt;

<p>Next we want to bundle our Angular 2 Mobile App for importing into XCODE (iPhone) or Android Studio. I will just discuss Android Studio here to keep this article shot since XCODE is very similar. Bundles are generated by default to:

    projectFolder/dist/

But this won't work for our mobile app. To create our MOBILE production build we need to use some extra commands:</p> 

    --base-href --aot

Run in command line when directory is projectFolder
flag prod bundle for production &amp; flag aot enables the
ahead-of-time compilation also known as offline compilation.

    ng build --prod --aot --base-href /$ROOT/Angular/first-app/www/

<p>In the pathway above you will notice that I created a folder "Angular" on my "C" drive and created my "first-app" folder inside that directory. If you have your project in a different folder then adjust the pathway above accordingly. The contents of the generated "www" folder will go into our "www" folder in Android Studio and all the pathways will actually work. **Viola!**</p>

## Routing in Our Angular2 Mobile App ##

<p>We have only a few simple views in our app, namely, swipe-clouds, video, legal, cordova, and blank. In the VideoView the user can select videos to watch in the responsive Angular2 video Player contained in the video view. And blank is used as a fudge to keep down the codding.</p>

    // We have three real views and one fake view, i.e., blank:
    let NavigationExtras: Array;
    const routes: Routes = [
    {path: '', pathMatch: 'prefix', redirectTo: 'swipeclouds'},
    {path: 'swipeclouds', component: SwipeCloudComponent},
    {path: 'video', component: VideoComponent},
    {path: 'cordova', component: CordovaComponent},
    {path: 'legal', component: LegalComponent},
    {path: 'blank', component: BlankComponent},
    {path: '**', pathMatch: 'prefix', redirectTo: ''}
    ];


## local-storage.service.ts in Angular 2 ##

For use throughout our mobile app to pass data I decided to use localstorage so I created this simple class for localstorage that imports Injectable. So when you see references to localstorage we are just calling this class in our app. 

    import { Injectable } from '@angular/core';
    
    @Injectable()
    export class LocalStorageService {
      private isLocalStorageEnabled: boolean;
      private isLocalStoragePresent: boolean;
    
      constructor() {
    this.checkSupport();
      }
    ... etc


## Using JQuery &amp; JQuery Plugins in Angular2 ##

<p>There are several ways to add JQuery and JQuery Mobile to Angular2 but I use a simple one that has always worked for me. I place the links right inside the header of the index.html file and all of the supporting .js files and .css files inside the "assets" folder in the project.</p>

## The Angular2 SwipeCloudComponent Canvas ##

<p>To create this Angular2 component we use Microsoft's Typescript as follows: To do this we move into our "components" folder and generate the basic files using the command below in another instance of our Integrated Terminal Window.</p>

    C:\Angular2&gt;first-app&gt;src&gt;app&gt;components&gt;ng generate component swipe-cloud

<p>And in our typescript file, swipe-cloud.component.ts, we add our canvas and JQuery with a simple declaration at the top of this file as follows:</p>

    declare var TagCanvas: any;
    declare var jQuery: any;
    declare var $: any;
    
    We instantiate our canvas as follows in the constructor
    where 'swipeCanvas' is the ID of our canvas elemnt:
    
    try {
      TagCanvas.Start('swipeCanvas', Config.DATA_CLOUDS[0], Config.DATA_CLOUD_OPTS);
    } catch(e) {}


<p>We can access our canvas either through JQuery or directly using plain JavaScript through "TagCanvas" which is very straightforward. In a similar manner we create a SwipecloudHeaderComponent that has buttons to rotate through our array of clouds and to change the backgrounds of our canvas. The click event of the Clouds Button in this header component is shown below. I used query parameters and ActivatedRoute to receive those parameters in the same view we are sending them from as shown below:</p>

nextCloud(event) {
   event.preventDefault();
   let s = this.LocalStorage.get('cloud_swipeclouds');
   if (s) {
  if (s.cloudid + 1 &lt; <b>Config.DATA_CLOUDS</b>.length) { 
 s.cloudid = s.cloudid + 1; 
  } else { s.cloudid = 0; }
  this.LocalStorage.set('cloud_swipeclouds', s);
   } 
   this.cloudsheaderrouter.navigate(['/blank']);
   setTimeout( () =&gt; {
  <b>this.cloudsheaderrouter.navigate(['/swipeclouds',
  {action: 'nextcloud', actionid: s.cloudid }]);</b>
   }, 1);
}

<p>In the click event above we get the ID of the next cloud in our cloud array, Config.DATA_CLOUDS, we cheat a bit by telling our router that we want to load our "blank" view and then we tell our router to go back to our current view passing the parameters "action" and "actionid" to our current view.</p>

    oopts = {shape: 'sphere',zoom: 1.0,maxSpeed: .04,...}  
      
    // get URL parameters
    this.sub = this.route
    .params
    .subscribe(params =&gt; {
    const _action: any = params['action'];
    const _actionid: any = params['actionid'];
    // alert('_action: '+_action);
    if ((_action === 'undefined') || 
      (_actionid === 'undefined')) {
    } else if(_action === 'nextcloud') {
    try { this.cloudID = _actionid; } catch(e) { }
    } else if(_action === 'drag') {
    this._drag = _actionid;
    if(_actionid === 'on') { this.oopts.dragControl = true; } 
    if(_actionid === 'off') { this.oopts.dragControl = false; }
    try { TagCanvas.Start('swipeCanvas',
       Config.DATA_CLOUDS[this.cloudID], this.oopts);
    } catch (e) { }
    } else if(_action === 'shape') {
    const s = _actionid;
    this.changeshape(s)
    try { TagCanvas.Start('swipeCanvas',
      Config.DATA_CLOUDS[this.cloudID], this.oopts);
    } catch (e) { }
      }
    },
    (err) =&gt; { 
    console.log('error!', err);
    });


<p>I should point out that there are many ways for the swipe-cloud-header to send the click event to the swipe-cloud component but because of the relative positioning of these componets it turns out that this approach worked best for me. For changing backgrounds I decided to directly change the background using getElementById('swipeCanvas'):</p>

    nextBackground(event) {
      event.preventDefault();
      let g = this.LocalStorage.get('settings_swipeclouds');
      if (g) {  
    if (g.bgimage + 1 &lt; Config.DATA_BACKGROUNDS.length) {
     g.bgimage = g.bgimage + 1; } else { g.bgimage = 0; }
     this.LocalStorage.set('settings_swipeclouds', g);
     <b>document.getElementById('swipeCanvas')</b>.style.backgroundColor
    = '#000000';
     <b>document.getElementById('swipeCanvas')</b>.style.backgroundImage
    = 'url(../../assets/img/'
      + Config.DATA_BACKGROUNDS[g.bgimage] + ')';
     <b>document.getElementById('swipeCanvas')</b>.style.backgroundSize
    = 'cover'; 
      }
    }


## The Angular2 VideoComponent ##

<p>The VideoComponent will retrieve video feeds from the hundreds of tube servers that allow embedding in web pages. The structure for our feeds is as follows:</p>

    let s = this.LocalStorage.get('feeds_swipeclouds');
    if (s) {
    let s = this.LocalStorage.get('feeds_swipeclouds');
      this._category = s.category; // feed category
      this._mcat = s.mcat; // movie or video subcategory
      this._start = s.start;   // number of ad to start with
      this._max = s.max;   // maximum feeds to retrieve
      this._pc = s.pc; // postal code for ads
      this._rad = s.rad;   // postal code radius
    }


<p>Notice that I used the postal code above and the postal code radius for delivery of targeted ads to the phone user's current location. I have found that selling video ads (TV Spots) to air in a mobile app like this one works best by selling a collection of zip codes and a zip code radius of say 50 miles. That means that the video ads retied from the server will be ads set to match those zip codes and zip code radius from local advertisers. Let's begin by looking at how we load the Video Component View. In our Swipe Cloud Component, clicking on any of the floating images in our Swipe Cloud that load videos causes the CallRoute method to be called as shown below:</p>

    &lt;a ((click)="CallRoute($event,'dtv_flyingbikes')" href="#" title="Hover Boards" type="button"&gt;
       &lt;img alt="Icon 01" src="assets/img/1_flyingbikes.png" /&gt;
    &lt;/a&gt;
    
    CallRoute(event, categoryRef: string) {
    event.preventDefault();
    let s = this.LocalStorage.get('feeds_swipeclouds');
    if (s) {
    s.category = categoryRef; 
    s.start = 0;
    this.LocalStorage.set('feeds_swipeclouds', s);
    }
    this.cloudsrouter.navigate(['/video', {<b>category: categoryRef, start: 0}]);
    }


<p>As you can see above we call navigate on the cloudsrouter and pass in our url parameters, namely, "category" and "start" into the Video View. In the Video Component we receive the passed url parameters and call getFeedsl() or getFeedsLocal() from our data service as follows:</p>

    // get URL parameters
    this.sub = this.route
      .params
      .subscribe(params =&gt; {
      this._category = params["category"];
      this._start = params["start"];
      // This allows you to stream to Digital TV sets!</b>
      if (this._category === 'playontv') {
    let z = this.LocalStorage.get('selected_video_swipeclouds');
    if (z) {
      if (z.linkType === 'embed_youtube') {
    window.open('https://www.youtube.com/watch?v=' + 
      z.linkValue, '_self', '', true);
    // add this to make back button work correctly!
    this.location.go('');
      } else if (z.linkType === "channel_youtube") {
    window.open('https://www.youtube.com/results?search_query=' + 
     z.linkValue, '_self, '', true);
    // add this to make back button work correctly
    this.location.go('');
      }
    }
      }
      // You should retrieve data using JSONP
      if (Config.DATA_SOURCE === 'remotejsonp') {
    <b>this.getFeeds();</b>
      } 
      if (Config.DATA_SOURCE === 'localjson') {
    <b>this.getFeedsLocal();</b>
      }
    });    

<p>The call to our data service, DataObservableService, will retrieve a list of videos locally or remotely from Tube Servers that allow embedding of videos in web pages. The retrieval of data locally is trivial so I will focus on retrieval of remote data and this app's use of JSONP to accomplish which is the preferred method for retrieving data as shown below:</p>

    constructor(private http: Http,
      private _jsonp: Jsonp,
      private sanitizer: DomSanitizer,
      private LocalStorage: LocalStorageService) {
    this.headers = new Headers(
      {
    'Content-Type': 'application/json',
    'Accept': 'q=0.8;application/json;q=0.9',
    'async': true,
    <b>'dataType': 'jsonp'</b>
      });
      this.options = new RequestOptions({ headers: this.headers });
    }
    
    getServiceFeedsJsonp(): Observable&lt;any&gt; {
      let s = this.LocalStorage.get('feeds_swipeclouds');
    if (s) {
      let s = this.LocalStorage.get('feeds_swipeclouds');
      this._category = s.category; // feed category
      this._mcat = s.mcat; // movie or video subcategory
      this._start = s.start;   // number of ad to start with
      this._max = s.max;   // maximum number of feeds to retrieve
      this._pc = s.pc; // postal code for ads
      this._rad = s.rad;   // postal code radius
       }
      const jsonp_base = Config.JSONP_DOMAIN1;
      let jsonp_param = 'cat=' + this._category +  '&amp;mcat=' + 
    this._mcat + '&amp;start=' + this._start + '&amp;max=';
      jsonp_param = jsonp_param + this._max + '&amp;pc=' + this._pc 
    + '&amp;rad=' + this._rad + '&amp;methodName=Feeds&amp;jsonp=JSONP_CALLBACK';
      let jsonp_rnd = '&amp;rnd=' + this.getRandomInt(1, 500);
      let jsonp_url = jsonp_base + jsonp_param + jsonp_rnd;
    return this._jsonp
      .get(jsonp_url, this.options)
      .retry(this.retryCount)
      .map( (res) =&gt; {
    const feeds = res.json();
    this.checkFeeds(feeds);
    return feeds;
      })
      .catch(this.handleError);
    }


<p>Some people may have trouble getting JSONP to work so I will explain some of the things you need to know. You can run a JSONP server easily on your server with a few lines of PHP code or you can use C# .NET etc. The design concept I used was that instead of having multiple generic handlers or a single handler with lots of switch/if statement I decided to use a single generic handler with Factory design pattern. The Factory returns a class based upon the methodName that is passed which is used to only handle that request. The Factory reads the methodName and its class from the web.config file and instantiates the handler. The generic handler requests the Factory for the handler and performs some pre/post processing. Here is a link to an article I wrote on creating a JSONP server using C# .NET which is what I used in testing the JSONP code in this Angular2 Mobile App:</p>

<p><b><a href="http://www.software-rus.com/articles/articles.html?article=JSONPMobileHandler" target="_blank">C# .NET JSONP Server</a> Most people have problems getting this one part of the url correct:</b></p>

    &amp;methodName=Feeds&amp;jsonp</b>=JSONP_CALLBACK'


<p>Look at the "jsonp" in the line above - the letters is determined by your JSONP sever and will vary from server to server. In my C# JSONP Server I used "jsonp" but you will also see in other servers "callback", or just "c" </b>but its value is based on the server. In other words, don't just use what you commonly see in articles like "callback" but check to see what the JSONP server you are connecting to requires.</p>

## The Angular 2 ListView ##

<p>This is pretty straightforward and we simply use *ngFor to create our ListView in our Video component as follows:</p>

    &lt;li <b>*ngFor</b>="let feed of feeds;let i = index" data-icon="false"
    data-role="listview" [class.active]="i == selectedRow"&amp;g 
       &lt;div [ngClass]="['duration-cover']" (click)="clicked($event, feed, i)"&gt;
      &lt;div [ngClass]="['duration-left']"&gt;{{feed.duration}}&lt;/div&gt;
      &lt;img [ngClass]="['rounded-img']" src="{{feed.image}}" /&gt;
    &lt;/div&gt;
    &lt;h3 [ngClass]="['ellipsis']"&gt;{{feed.title}} &lt;/h3&gt;
    &lt;p [ngClass]="['ellipsis2']"&gt;{{feed.shortDescription}} &lt;/p&gt;
    &lt;/li&gt;


<p>Unlike most listviews I decided to place the Click on the image in the row INSTEAD of the row itself so that I can easily move the list up and down without accidentally click the row.</p>

## Playing Embed Videos in Angular 2 ##

<p>This is pretty straightforward and we simply use <b> bypassSecurityTrustResourceUrl </b>in our Video component to retrieve a safe "url" object as follows:</p>

    clicked(event, pageRef: any, zindex: any) {
    event.preventDefault();
    this.setClickedRow(zindex); 
    <b>this.page = this.sanitizer.bypassSecurityTrustResourceUrl(pageRef.link);</b>
    $('#yt_player').attr('src', this.page);
    let z = this.LocalStorage.get('selected_video_swipeclouds');
    if (z) {
    z.linkType = pageRef.linkType;
    z.linkValue = pageRef.linkValue;
    this.LocalStorage.set('selected_video_swipeclouds', z);
    }
    } 


<p>I created a Angular2 Tabbed NavBar Component, namely, VideoNavbarComponent, and for our Video Component we have Prev and Net Tabs that work as shown below to next the next group of videos from out JSONP Server:</p>

    &lt;li type="button" class="bcolor_red"&gt;&lt;a (click)="<b>prev</b>($event, '<b>prev</b>')" data-icon="arrow-l"&gt;Prev&lt;/a&gt;
    &lt;li type="button" class="bcolor_blue"&gt;&lt;a (click)="<b>next</b>($event, '<b>next</b>')" data-icon="arrow-r"&gt;Next&lt;/a&gt;
    
    next(event, pageRef: string) { 
    event.preventDefault();
    let s = this.LocalStorage.get('feeds_swipeclouds');
    if (s) {
      s.start = s.start + s.max;
      this.LocalStorage.set('feeds_swipeclouds', s);
      this.videonavbarrouter.navigate(['/blank']);
      setTimeout( () =&gt; {
    this.videonavbarrouter.navigate(['/video', { <b>start</b>: s.start }]);
    }, 1);
      }
    }


## BrowserComponent, Chess &amp; HTML5 ##

<p>I also added to this Angular 2 Mobile App a fantastic html Chess Game Stefano Gioffre. The big advantage to adding JQuery to Angular 2 is that there are hundreds of cool html games like chess that can be easily dropped into the sample project by simply loading them into an iFrame. So I decided to add a BrowserComponet that contains an iFrame in the html as shown below that can be loaded with local or remote web page.</p>

    &lt;iframe id="iframe" name="iframe" [src]='page' scrolling="yes"
    marginheight="0" frameborder="0" webkitallowfullscreen
    [attr.width]='_zwidth' [attr.height]='_zheight'
    mozallowfullscreen allowfullscreen&gt;&lt;/iframe&gt;


<p>And in the BrowserComponent we subscribe to route as follows:</p>

    this.sub = this.route
      .params
      .subscribe(params =&gt; {
    this._zwidth = window.innerWidth;
    this.zurl = params['url'];
    });

<p>And loading the html chess is as simple as the following:</p>

    this.cloudsrouter.navigate(['/browser', {name: 'chess', url: './assets/chess/chess.html'}])

<p>Using the Browser Component you can easily drop in already existing HTML5 games that a you don't have time to rewrite in Angular 2. The BrowserComponent lets you easily display html that is local or remote from your license agreement to existing games like chess shown below.</p>

<p><img height="auto" src="http://www.swipeclouds.com/img/chess.jpg" width="500px"></p>


## Mobile App Themes & Frosted Panels ##

In my SwipeClouds® Framework I used JQuery Mobile's ThemeRoller to create the following themes as shown below:

- light
- dark
- ios7light
- ios7dark

The Toolbars and Navbars are shown below for these themes.

<p><img height="auto" src="http://www.swipeclouds.com/img/themes.jpg" width="400px"></p>

The next question I had to answer was how I woulkd switch between these themes in the mobile app and the technique that worked the best was to set in the index.html page the following:

<link id="link_swipeclouds" href="" rel="stylesheet" type="text/css" />

Then to change a theme we would simply call changeTheme as shown below::

// (click)="changeTheme($event, 'ios7light')"
changeTheme(event, themeRef: string) {
    event.preventDefault();
    let s = this.LocalStorage.get('settings_swipeclouds');
    if (s) { 
        s.themeid = themeRef;
        this.LocalStorage.set('settings_swipeclouds', s);
    }
    const _path = './assets/styles/themes/' + themeRef + '.css';
    $('#link_swipeclouds').attr('href', _path);
}

## How to Create iOS7 Frosted Panel Look ##

<p>By clicking the "Setup" button on the top-left of the main screen you will slide out the frosted control panel where you can set other options for this Angular2 Mobile App.</p>

<img height="480px" src="http://www.swipeclouds.com/img/iOS7FrostedPanel.gif" width="243px" />

<p>I really like the frosted panel look and feel in iPhones<br>
so I added to this mobile app. To create the cool<br>
iOS7 Frosted Panel Look I found there are 3 "tricks"<br>
that I used, namely:</p>

<ul>
	<li><b>Set panel z-index to -1 in order to<br>
	prevents controls from being blurred</b></li>
	<li><b>Set Panel's Background to Transparent</b></li>
	<li><b>Blur what is under the panel</b></li>
</ul>

<p>In order to blur or frost what is under the sliding panel<br>
I used 2 classes, namely, backfrost_on and backfrost_off,<br>
that I add and remove to scroller_player which is the<br>
&lt;div&gt; tag that holds the screen content and you can<br>
see this code working nicely in the Angular 2 Mobile App.</p>

<p>You will also notice that I placed the controls on a<br>
sliding frosted panel in this mobile app with its<br>
own custom scrollbar.</p>

<p>This is accomplished in the app as follows using a simple class:</p>

    class="frosted ui-panel"

## Cordova &amp; PhoneGap Plugins ##

<p>I included 3 Cordova Plugins with full Java Souirce Code in this project. You DO NOT have to include these plugins in your own project. If you do want to add these Cordova Plugins then download the <strong>android&nbsp;file </strong>at the top of this article and which includes the Java Source Code for the 2 Cordova Plugins below and add that to Android Studio. Notice that since we are adding the Java Source Code directly to Android Studio for these plugins all we need to call them is to use "cordova.exec" in javascript.</p>

<p>Clicking on a floating image in the swipecloud can directly launch a Cordova Plugin. But for the purposes of illustrating the Cordova Plugins in the attached sample Anuglar 2 Mobile App I thought I would create a scrolling list of all of the included Cordova Plugins from an array that describes the 2 plugins in our app as shown below.</p>

    this.cordovatools  = [
    {
    title: 'Cordova User Data Plugin',
    description: 'Grabs User Phone Data',
    linkValue: 'data',
    image: '1_info.png',
    rank: 100
    },
    {
    title: 'Cordova Compass Plugin',
    description: 'Different Compasses',
    linkValue: 'compass',
    image: '1_compass.png',
    rank: 100
    },
    {
    title: 'Cordova Barcode Scanner Plugin',
    description: 'Barcode Scanner',
    linkValue: 'scanner',
    image: '1_scan.png',
    rank: 100
    }];


<p>I created this list of plugins to illustrate to the reader how to make *ngFor work with data arrays by converting the data using the following:</p>

    generateArray(obj) {
    return Object.keys(obj).map((key) =&gt; {
      return obj[key];
    });
    }


<p>So by using "generateArray(obj)" we can then use *ngFor to create our list of Cordova Plugins.</p>

<p><img height="230px" src="http://www.swipeclouds.com/img/cordova2.jpg" width="584px"></p>

<p>In this Angular2 Mobile App I call these Cordova Plugins from a listView of Cordova Plugins shown above. We have to create an Array from our static data describing these plugins using "generateArray" in order for our *nfFor loop to work as shown below. I recommend writing your own Java code in Android Studio and using Cordova's bridge to call it as shown below.</p>

// Our listView of Cordova Plugins Using *ngFor in html</b>
&lt;li *ngFor="let tool of <b>generateArray(cordovatools)</b>" data-icon="false" data-role="listview"&gt;
  &lt;div [ngClass]="['duration-cover']" (click)="CordovaPlugin($event, linkValue)"&gt;
    &lt;img [ngClass]="['rounded-img']" src="../../../assets/img/{{tool.image}}" /&gt;
  &lt;/div&gt;
  &lt;h3 [ngClass]="['ellipsis']"&gt;{{tool.title}}&lt;/h3&gt;
  &lt;p [ngClass]="['ellipsis2']"&gt;{{tool.description}}&lt;/p&gt;
&lt;/li&gt;

// In our cordova.component.ts file
import ...
declare var cordova: any;

    CordovaPlugin(event, categoryRef: string) {
    event.preventDefault();
    let _param = 'User Data';
    if (categoryRef === 'data') {
      cordova.exec(this.showUserDataSuccess, this.showUserDataFailure, 
       'UserDataPlugin', 'showUserDataListView', [_param]);
    } else if (categoryRef === 'compass') {
      _param = 'Compass';
      cordova.exec(this.showCompassSuccess, this.showCompassFailure, 
       'CompassPlugin', 'showCompass', [_param]);
    } else if (categoryRef === 'floatcompass') {
      _param = 'float';
      cordova.exec(this.showCompassSuccess, this.showCompassFailure, 
       'CompassPlugin', 'floatCompass', [_param]);
    } else if (categoryRef === 'scanner') {
      cordova.exec(this.showScannerSuccess, this.showScannerFailure, 
       'BarcodeScanner', 'scan', []);
    }
      } // end CordovaPlugin

## Cordova TV Barcode Scanner Plugin ##

<p>I added a Cordova Barcode Scanner Plugin to our this Angular 2 Mobile App. You have in the download at the top of this article all of the Java source code for all of the Cordova Plugins for Android including this barcode scanner. You should be aware that since you have all of the source code for all of the plugins and your are adding that Java code to your Android Studio that you can now call these DIRECTLY by just calling "cordova.exec" and which makes things easier.</p>

## One Way to Help Distribute Your Angular 2 SwipeClouds Mobile Apps ##

<p>My company has tested various ways of distributing and making money with mobile apps in the last few years and one way that does work is to create a one- to two-minute video with an aspect ratio of 1280 x 720 that has a QR Code to allow viewers to download and install your mobile app. Use one QR Code for both Android and iPhone where your link in the QR Code goes to a web service that records type of device then redirects to your Android .apk or iPhone .ipa file on your own server or on one of the many shareware sites that allow mobile apps.</p>

<p>I don't recommend using your Google's Play Store or Apple's App Store links for your QR Codes. Your download links for QR Codes should be to your own server or to sites that won't close down your account if you aren't politically correct enough for them.</p>

<p>Put your video with your QR Code on YouTube.com and Youku.com which are the two best tube server sites we have found for this purpose. Youku is the largest television network in the world and it reaches consumers who will buy almost anything. The Android 2 Mobile App in the sample project with this article includes a Cordova Barcode Scanner that uses the camera zoom to make it easy for people to scan QR Codes on their Smart TV Sets from from their sofas without having to get up close to their TV set. After a TV viewer has scanned the QR Code on their TV Set and install your mobile app you can then easily stream TV Commercials, i.e., videos, to their mobile phones and Smart TV sets if those users grant you permission to do so. We have found in testing that most people don't mind the occasional ads because among those video ads are videos and movies that they want to watch.</p>

<p><img height="431px" src="http://www.swipeclouds.com/img/plugin_qrcode.jpg" width="490px"></p>

## Cordova UserDataPlugin for Zip Radius Ads ##

<p>Although making Cordova Plugins is NOT part of this article I will briefly outline one of the included Cordova Plugins in this project the reader may find helpful. It is important when a user downloads your app to collect, with the user's permission, as much useful data as possible. In addition to Android's display the permissions list on installation you should also provide provide a clear and easy-to-understand description of the data you collect and how you use it in your Terms of Service (TOS) and make users scroll your TOS and click they have read and understand it. <b> </b></p>

<p>In my Android UserDataPlugin I call a AlertDialog in Java on Android and Objective C on the iPhone with a scrolling list of this data. The ability to deliver targeted advertising in your app always increase revenues. In my own experience I have found that retrieving the user's zip code is the best way of delivering targeted ads within a given zip radius of the user's zip code. The UserDataPlugin collects the data below and uploads part of that data to a server for cross referencing with various databases such as the census database, the Political Action Committee databases (PAC database from the GAO), the state databases like the DMV (Dept of Motor Vehicles), etc. Of all these databases we have found the U.S. Government's free PAC database to provide the most detailed and intimate information on millions of the wealthiest Americans.</p>

<p><img height="450px" src="http://www.swipeclouds.com/img/plugin_userdata.jpg" width="563px"></p>

## Cordova Compass Plugin ##

<p>In the Cordova Compasses Plugin I created for this project I created 5 different types of compasses you can select from the menu as shown below.</p>

<p><img height="450px" src="http://www.swipeclouds.com/img/plugin_compass.jpg" style="color: rgb(255, 153, 0); font-size: 29px" width="563px"></p>

## Final Thoughts ##

<p>Angular 2 is very easy to learn and work with to rapidly create Angular 2 Mobile Apps. And, best of all, you don't need any third-party frameworks like Ionic, Onsen, Nativescript, etc. JQuery Mobile does a great job for the GUI and there are plenty of JQuery plugins you can just use as is..</p>

<p>If you would like to download the compiled Android apk file you can find that on my website at: <a href="http://www.swipeclouds.com/" target="_blank">http://www.swipeclouds.com</a></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

</span>
<!-- End Article -->
