import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Transaction, TransactionSearchItem } from "../../services/transactions.service";

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'amount-bar-column',
    template: `<div [ngStyle]="getStyle()"></div>`
})

export class AmountBarColumn implements OnInit {
    constructor() { }

    @Input() value!: TransactionSearchItem;
    
    ngOnInit(): void {
    }

    getStyle() {
        return {
            height: '10px',
            width: this.value.relWidth,
            backgroundColor: this.value.amount < 0 ? '#f76f6f' : '#44f74a',
            borderRadius: '5px'
        }
    }
}