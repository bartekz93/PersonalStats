import { Injectable } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { forkJoin } from "rxjs";
import { Format } from "@core/helpers/formatters";

@Injectable({providedIn: 'root'})
export class AppConfirmService {

    confirmLabel: string = 'app.confirm';
    yesLabel: string = 'app.yes';
    noLabel: string = 'app.no';

    constructor(private confirmService: ConfirmationService, private translateService: TranslateService) {
    }

    show(msg: string, params: any) {
        let t1 = this.translateService.get(this.confirmLabel);
        let t2 = this.translateService.get(this.yesLabel);
        let t3 = this.translateService.get(this.noLabel);
        let t4 = this.translateService.get(msg);

        return new Promise((resolve, reject) => {
            forkJoin([t1, t2, t3, t4]).subscribe(r => {
                this.confirmService.confirm({
                    message: Format.string(r[3], params),
                    header: r[0],
                    icon: 'pi pi-exclamation-triangle',
                    acceptIcon:"none",
                    rejectIcon:"none",
                    acceptLabel: r[1],
                    rejectLabel: r[2],
                    rejectButtonStyleClass:"p-button-text",
                    accept: () => {
                        resolve(null);
                    },
                    reject: () => {
                        reject();
                    }
                });
            });
        })
    }
}