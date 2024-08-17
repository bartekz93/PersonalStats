import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppText } from '@core/controls/app-text.component';

@Component({
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    selector: 'app-form',
    styles: `fieldset { border: none }`,
    templateUrl: 'app-form.component.html'
})

export class AppFormComponent implements OnInit {
    constructor() { 
    }

    @ContentChildren(AppText) controls!: QueryList<AppText>;

    @Input() formGroup!: FormGroup;
    @Input() horizontal?: boolean;
    @Input() disabled?: boolean;

    @Output() onSubmit: EventEmitter<any> = new EventEmitter;

    ngOnInit() { 
    }

    ngAfterViewInit() {
        console.log(this.controls);
    }

    getFiltersStyle() {
        return {
            display: 'flex',
            flexDirection: this.horizontal ? 'row' : 'column',
            alignItems: this.horizontal ? 'stretch' : 'stretch',
            flexWrap: 'wrap',
            gap: '10px'
        }
    }

    getFormStyle() {
        return {
        }
    }

    getActionsStyle() {
        return {
            display: 'flex',
            flexDirecton: 'row',
            gap: '10px',
            justifyContent: 'space-between'
        }
    }

    submit() {
        for (const field in this.formGroup.controls) { 
            this.formGroup.get(field)?.markAsTouched();
        }

        if (this.formGroup.valid) {
            this.onSubmit.emit(this.formGroup.value);
        }
    }
}