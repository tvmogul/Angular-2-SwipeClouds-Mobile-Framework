import { Component, Input, OnInit, NgModule, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { SbItemComponent } from './sb-item';

@Component({
  exportAs: 'squeeze-box',
  selector: 'squeeze-box',
  styleUrls: ['./squeeze-box.component.css'],
  template: `
    <div class="squeezebox">
        <ng-content></ng-content>
    </div>
  `
})
export class SqueezeBoxComponent implements OnInit {

  @Input() multiple: boolean = true

  @ContentChildren(forwardRef(() => SbItemComponent)) items: QueryList<SbItemComponent>;

  constructor() {}

  ngOnInit() {
  }
    
  didItemToggled(item: SbItemComponent) {
      // on not multiple, it will collpase the rest of items
      if (!this.multiple) {
          this.items.toArray().forEach(function(i) { 
              if (i !== item) {
                  i.applyToggle(true)
              }
          });
      }
  }

}
