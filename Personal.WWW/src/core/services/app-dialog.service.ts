import { Injectable } from "@angular/core";

export interface AppDialogOpenOptions {
    isEdit: boolean;
}

@Injectable({providedIn: 'root'})
export class AppDialogService {

    dialogs: { [code:string]: { visible: boolean; openFn: (data: any, options?: AppDialogOpenOptions) => void  } } = {};

    register(code: string, openFn: (data: any, options?: AppDialogOpenOptions) => void) {
        this.dialogs[code] = {
            openFn: openFn,
            visible: false
        };
    }
    
    open(code: string, data: any, options?: AppDialogOpenOptions) {
        if (this.dialogs[code]) {
            this.dialogs[code].visible = true;
            this.dialogs[code].openFn(data, options);
        }
    }

    isVisible(code: string) {
        return this.dialogs[code]?.visible;
    }

    close(code: string) {
        this.dialogs[code].visible = false;
    }
}