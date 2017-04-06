import {Component, ContentChild, Input, Inject, AfterViewInit, forwardRef} from '@angular/core';
import {SbItemBodyComponent} from './sb-item-body';
import {SqueezeBoxComponent} from './squeeze-box.component';

@Component({
    exportAs: 'sb-item',
    selector: 'sb-item',
    template: `
        <div class="sb-item" [ngClass]="{'is-collapsed': collapsed}">
            <ng-content></ng-content>
        </div>
    `
})
export class SbItemComponent implements AfterViewInit {

    private squeezebox: SqueezeBoxComponent;

    @Input() public collapsed: boolean = true;

    @ContentChild(SbItemBodyComponent) body: SbItemBodyComponent;

    constructor(@Inject(forwardRef(() => SqueezeBoxComponent)) squeezebox: SqueezeBoxComponent) {
        this.squeezebox = squeezebox;
    }

    ngAfterViewInit() {
        this.body.toggle(this.collapsed);
    }
    toggle(collapsed: boolean) {
        this.squeezebox.didItemToggled(this);
        this.applyToggle(collapsed);
    }

    applyToggle(collapsed: boolean) {
        this.collapsed = collapsed;
        this.body.toggle(collapsed);
    }

}
