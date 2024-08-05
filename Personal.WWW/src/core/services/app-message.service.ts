import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { Observable, forkJoin, from, map, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class AppMessageService {
    errorLabel: string = 'app.error';
    successLabel: string = 'app.success';

    constructor(private messageService: MessageService, private translateService: TranslateService) {
        this.translateService.get(this.errorLabel).subscribe(x => {

        });
    }

    handleError(err: any) {
        if (err.error) {
            err.error.errors.forEach((e: any) => {
                if (e.message) {
                    this.error(e.message);
                }
            });
        } else {
            this.error('app.errors.unknownError');
        }
    }

    error(msg: string) {
        this.show('error', msg);
    }

    success(msg: string) {
        this.show('success', msg);
    }

    show(type: string, msg: string) {
        let t1 = this.translateService.get(`app.${type}`);
        let t2 = this.translateService.get(msg);

        forkJoin([t1, t2]).subscribe(r => {
            this.messageService.add({ severity: type, summary: r[0], detail: r[1] });
        })
    }
}