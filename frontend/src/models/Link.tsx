import {Order} from "./Order";

export interface Links {
    id: number;
    code: string;
    orders: Order[];
}