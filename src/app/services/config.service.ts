import { Output, EventEmitter } from '@angular/core';

export class Config {

    // ///////////////////////////////////////////////////////
    // Set here whether you are using local or remote service!
    // ///////////////////////////////////////////////////////
    static DATA_SOURCE = 'localjson'; // remotejsonp
    // static DATA_SOURCE = 'remotejsonp'; // remotejsonp

    static MAIN_COPYRIGHT = 'Copyright 2016 -2017, Bill SerGio, The Infomercial King';

    static JSONP_DOMAIN1 = 'http://{YOUR_WEBSITE}/{YOUR_HANDLER}?';

    // Array for our background images
    // Note that we can use animated gifs
    static DATA_BACKGROUNDS: Array<string> = [
        'bg_clouds.gif',
        'bg_blackweb.gif',
        'bg_blueriver.gif',
        'bg_christmas.jpg',
        'bg_e29374.jpg',
        'bg_earthvsflyingsaucers.jpg',
        'bg_flash1.jpg',
        'bg_flyingsaucer.jpg',
        'bg_girl_column.jpg',
        'bg_marylinmonroe.jpg',
        'bg_popmechanics.jpg',
        'bg_snow_forest.gif',
        'bg_snow_home.gif',
        'bg_superman1.jpg',
        'bg_ufo1.jpg',
        'bg_ufo2.jpg',
        'bg_ufo3.jpg',
        'bg_vampirella.jpg',
        'bg_water.gif',
        'bg_whitealien.jpg',
        'bg_wood.jpg',
        'bg_ww.gif'
        ];

    // Our SwipeCloud Names we are using
    static DATA_CLOUDS: Array<string> = [
        'dronesCloud',
        'eduCloud',
        'sportsCloud',
        'solCloud'
    ];

    @Output()
    uploaded: EventEmitter<string> = new EventEmitter();

    uploadComplete() {
        this.uploaded.emit('complete');
    }

}
