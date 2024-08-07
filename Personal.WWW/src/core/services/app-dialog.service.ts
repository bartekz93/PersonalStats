import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AppDialogService {

    dialogs: { [code:string]: { visible: boolean; openFn: (data: any) => void  } } = {};

    register(code: string, openFn: (data: any) => void) {
        this.dialogs[code] = {
            openFn: openFn,
            visible: false
        };
    }
    
    open(code: string, data: any) {
        if (this.dialogs[code]) {
            this.dialogs[code].visible = true;
            this.dialogs[code].openFn(data);
        }
    }

    isVisible(code: string) {
        return this.dialogs[code]?.visible;
    }

    close(code: string) {
        this.dialogs[code].visible = false;
    }
}