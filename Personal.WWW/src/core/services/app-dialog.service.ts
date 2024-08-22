import { Injectable } from "@angular/core";

export interface AppDialogOpenOptions {
    isEdit: boolean;
}

export interface AppDialogOpenContext {
    resolve: Function;
    reject: Function;
}

export interface AppDialogOpenParam {
    data: any;
    options?: AppDialogOpenOptions;
    ctx: AppDialogOpenContext;
}

type OpenDialogFunction = (param: AppDialogOpenParam) => void

@Injectable({providedIn: 'root'})
export class AppDialogService {

    dialogs: { [code:string]: { visible: boolean; openFn: OpenDialogFunction  } } = {};

    register(code: string, openFn: OpenDialogFunction) {
        this.dialogs[code] = {
            openFn: openFn,
            visible: false
        };
    }
    
    open(code: string, data: any, options?: AppDialogOpenOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.dialogs[code]) {
                this.dialogs[code].visible = true;
                this.dialogs[code].openFn({
                    data: data, 
                    options: options, 
                    ctx: { resolve, reject }
                });
            }
        })
    }

    isVisible(code: string) {
        return this.dialogs[code]?.visible;
    }

    close(code: string) {
        this.dialogs[code].visible = false;
    }
}