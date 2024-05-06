import { Order } from "./Order";

export default abstract class Strategy {
    abstract sortByIdReverse(accounts: Order[]): void;
    abstract sortByCustomerName(accounts: Order[]): void;
}