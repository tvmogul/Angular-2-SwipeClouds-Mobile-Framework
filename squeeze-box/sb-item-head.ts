import { Component } from '@angular/core';
import { SbItemComponent } from './sb-item';

@Component({
    exportAs: 'sb-item-head',
    selector: 'sb-item-head',
    template: `
        <div class="sb-item-head">
            <a role="button" (click)="toggleClick($event)"><ng-content></ng-content><span class="toggle-icon"></span></a>
        </div>
    `
})
export class SbItemHeadComponent {

    constructor(private sbItem: SbItemComponent) {}

    toggleClick(event) {
        event.preventDefault();
        this.sbItem.collapsed = !this.sbItem.collapsed;
        this.sbItem.toggle(this.sbItem.collapsed);
    }
}
