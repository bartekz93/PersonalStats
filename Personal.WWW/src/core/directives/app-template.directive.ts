import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appTemplate]'
})
export class AppTemplateDirective {

    constructor(public readonly template: TemplateRef<any>) { }

    @Input('appTemplate') name?: string;
}