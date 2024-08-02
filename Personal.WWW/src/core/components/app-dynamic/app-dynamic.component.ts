import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    standalone: true,
    imports: [],
    selector: 'app-dynamic',
    template: `<ng-template #body></ng-template>`
})

export class AppDynamicComponent implements OnInit {
    constructor() { }

    @Input() component!: any;

    @Input() value: any;
    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @ViewChild('body', {read: ViewContainerRef}) body!: ViewContainerRef;

    ref: any

    ngOnInit() { }

    ngOnChanges() {
        if (this.ref) {
            this.ref.instance.value = this.value;
        }
    }

    ngAfterViewInit() {
        this.ref = this.body.createComponent(this.component) as any;
        if (this.value) {
            this.ref.instance.value = this.value;
        }
        if (this.ref.instance.valueChange) {
            this.ref.instance.valueChange.subscribe((e: any) => {
                this.valueChange.emit(e)
            });
        }
    }
}