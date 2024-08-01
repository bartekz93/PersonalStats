export interface AppMenuItem {
    id: number;
    name: string;
    url?: string;
    icon?: string;
    childs?: AppMenuItem[];
}