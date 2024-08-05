export interface AppMenuItem {
    id: number;
    name: string;
    color?: string;
    url?: string;
    icon?: string;
    childs?: AppMenuItem[];
}