import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { AppCircleLabelComponent } from "@core/components/app-circle-label/app-circle-label.component";
import { WalletSearchItem } from "@budget/services/wallets.service";

@Component({
    standalone: true,
    imports: [CommonModule, AppCircleLabelComponent],
    selector: 'wallet-column',
    template: `<app-circle-label [color]="value.color" [label]="value.name" icon="pi pi-wallet">`
})

export class WalletColumn implements OnInit {
    constructor() { }

    @Input() value!: WalletSearchItem;
    
    ngOnInit(): void {
    }
}