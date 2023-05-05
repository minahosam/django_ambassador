import {OrderItem} from "./OrderItem";

export interface Order {
    id: number;
    FullName: string;
    email: string;
    total: number;
    order_items: OrderItem[];
}