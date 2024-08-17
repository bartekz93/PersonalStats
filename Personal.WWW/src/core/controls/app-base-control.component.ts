import { Component, ContentChildren, Directive, Input, QueryList } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { AppError } from "@core/components/app-error/app-error.component";

@Directive()
export class AppBaseControl {

    @Input() label!: string;
    @Input() fc?: AbstractControl | null;
    

    @ContentChildren(AppError) errors!: QueryList<AppError>;

    ngAfterViewInit() {
        if (this.fc) {
            for (let e of this.errors) {
                e.fc = this.fc;
            }
        }
    }

    isInvalid() {
        return this.fc?.invalid && this.fc?.touched;
    }

    update(val: string): void {
        console.log(val);
        this.fc?.markAsTouched();
        this.fc?.setValue(val);
    }
}

@Component({
    standalone: true,
    imports: [],
    selector: 'app-base-control',
    styles: `
        .app-base-control {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            height: 100%;
        }
    `,
    template: `
        <div class="app-base-control">
            <ng-content></ng-content>
        </div>`
})
export class AppBaseControlComponent {

}