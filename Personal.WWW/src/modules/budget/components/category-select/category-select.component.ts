import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Category, CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [DropdownModule, FormsModule, CommonModule, TranslateModule],
    selector: 'category-select',
    templateUrl: './category-select.component.html'
})

export class CategorySelect implements OnInit {
    categories: any[] = [];
    categoriesLoading: boolean = false;

    @Input() value: any;
    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    constructor(private categoryService: CategoryService) { }

    ngOnInit() { 
        this.categoriesLoading = true;
        this.categoryService.getList().subscribe(data => {
            this.categories = data.rows;
            this.categoriesLoading = false;
        })
    }

    onChange(event: Category) {
        this.valueChange.emit(event);
    }

    getItemStyle(item: any, small: boolean) {
        return {
            width: small ? '16px' : '24px',
            height: small ? '16px' : '24px',
            fontSize: small ? '10px' : '12px',
            backgroundColor: item.color,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
}