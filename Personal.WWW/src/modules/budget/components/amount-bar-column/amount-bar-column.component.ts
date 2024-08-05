import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Transaction } from "../../services/transactions.service";

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'amount-bar-column',
    template: `<div [ngStyle]="getStyle()"></div>`
})

export class AmountBarColumn implements OnInit {
    constructor() { }

    @Input() value!: Transaction;
    
    ngOnInit(): void {
    }

    getStyle() {
        return {
            height: '10px',
            width: this.value.relWidth,
            backgroundColor: this.value.amount < 0 ? '#3760a4' : '#53aefc',
            borderRadius: '5px'
        }
    }
}