import { AppAction, AppActionContext } from "./app-page-action.model";

export interface AppFormControl {
    label: string;
    value: any;
    field: string;
    component?: any;
    rules?: any[];
    messages?: { [key: string]: string };
}

export interface AppForm {
    controls: AppFormControl[];
    rules?: any[];
    actions: AppAction[];
}

export interface AppFormSubmit<T> {
    value: T;
    ctx: AppActionContext;
}