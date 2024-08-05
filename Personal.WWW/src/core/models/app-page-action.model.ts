export interface AppAction {
    label: string;
    icon?: string;
    onClick?: (ctx: AppActionContext) => void;
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

    start() {
        this.action.inProgress = true;
    }

    done() {
        this.action.inProgress = false;
    }
}