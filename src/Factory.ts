import { Order } from "./Order";

export default abstract class Factory {
    abstract newOrder(): Order;
}