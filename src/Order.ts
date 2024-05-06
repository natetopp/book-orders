export interface Order {
    id: number;
    bookTitles: string;
    quantity: number;
    creationDate: string;
    deliveryDate: string;
    deliveryService: string;
    deliveryMethod: string;
    customerName: string;
    customerContacts: string;
}