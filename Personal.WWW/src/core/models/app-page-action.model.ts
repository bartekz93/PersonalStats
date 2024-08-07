export interface AppAction {
    label: string;
    icon?: string;
    onClick?: (ctx: AppActionContext, data?: any) => void;
    primary?: boolean;
    submit?: boolean;
    inProgress?: boolean;
}

export class AppActionContext {
    action: AppAction;
    param: any;

    constructor(action: AppAction) {
        this.action = action;
    }

    inProgress(v: boolean) {
        this.action.inProgress = v;
    }
}