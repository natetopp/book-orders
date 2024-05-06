import React, { useEffect, useState } from 'react';
import './bookOrders.css';
import { Order } from './Order';
import Factory from './Factory';
import Strategy from './Strategy';

function BookOrders() {
    //initialization
    const [orders, setOrders] = useState<Order[]>(() => {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        return savedOrders;
    });

    const [formData, setFormData] = useState<Order>({
        id: 0,
        bookTitles: "",
        quantity: 0,
        creationDate: "",
        deliveryDate: "",
        deliveryService: "",
        deliveryMethod: "",
        customerName: "",
        customerContacts: ""
    });

    const deliveryServicesAvailable: string[] = ["UkrPoshta", "Nova Poshta"];
    const deliveryMethodsAvailable: string[] = ["To post office", "To address"];

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    //add orders in realtime
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "id" || name === "quantity" ? parseInt(value) : value
        }));
    };

    //factory template init
    class OrderFactory extends Factory {
        newOrder(): Order {
            return formData;
        }
    }

    //factory template use
    const newOrder = () => {
        const factory: Factory = new OrderFactory();
        const order: Order = factory.newOrder();
        setOrders(prevOrders => [...prevOrders, order]);
        setFormData({
            id: 0,
            bookTitles: "",
            quantity: 0,
            creationDate: "",
            deliveryDate: "",
            deliveryService: "",
            deliveryMethod: "",
            customerName: "",
            customerContacts: ""
        });
    };

    //strategy template init
    class SortingStrategy extends Strategy {
        sortByIdReverse(orders: Order[]): Order[] {
            return [...orders].sort((b, a) => a.id - b.id);
        }

        sortByCustomerName(orders: Order[]): Order[] {
            return [...orders].sort((a, b) => a.customerName.localeCompare(b.customerName));
        }
    }

    //strategy template use
    const sortingStrategy = new SortingStrategy();

    const sortByIdReverse = () => {
        const sortedOrders = sortingStrategy.sortByIdReverse(orders);
        setOrders(sortedOrders);
    };

    const sortByCustomerName = () => {
        const sortedOrders = sortingStrategy.sortByCustomerName(orders);
        setOrders(sortedOrders);
    };

    //remove order
    const removeOrder = (indexToRemove: number) => {
        const filteredOrders = orders.filter((_, index) => index !== indexToRemove);
        setOrders(filteredOrders);
    };

    return (
        <div className='userInterface'>
            <div className="container">
                <div className="userInterface__wrapper">
                    <div className="userInterface__top">
                        <form className="userInterface__form userInterface__add">
                            <label>
                                <span>ID</span>
                                <input type="number" name="id" value={formData.id} onChange={handleChange} placeholder="Enter ID" />
                            </label>
                            <label>
                                <span>Book titles</span>
                                <input type="text" name="bookTitles" value={formData.bookTitles} onChange={handleChange} placeholder="Enter book titles" />
                            </label>
                            <label>
                                <span>Quantity</span>
                                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Enter quantity" />
                            </label>
                            <label>
                                <span>Creation date</span>
                                <input type="text" name="creationDate" value={formData.creationDate} onChange={handleChange} placeholder="Enter creation date" />
                            </label>
                            <label>
                                <span>Delivery date</span>
                                <input type="text" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} placeholder="Enter delivery date" />
                            </label>
                            <label>
                                <span>Delivery service</span>
                                <select name="deliveryService" value={formData.deliveryService} onChange={handleChange}>
                                    <option value="">Choose delivery service</option>
                                    {deliveryServicesAvailable.map((deliveryService, index) => (
                                        <option key={index} value={deliveryService}>{deliveryService}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <span>Delivery method</span>
                                <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange}>
                                    <option value="">Choose delivery method</option>
                                    {deliveryMethodsAvailable.map((deliveryMethod, index) => (
                                        <option key={index} value={deliveryMethod}>{deliveryMethod}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <span>Customer name</span>
                                <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Enter customer name" />
                            </label>
                            <label>
                                <span>Customer contacts</span>
                                <input type="text" name="customerContacts" value={formData.customerContacts} onChange={handleChange} placeholder="Enter customer contacts" />
                            </label>
                        </form>
                        <div className="userInterface__buttons">
                            <button onClick={newOrder}>Add order</button>

                        </div>
                    </div>
                    <div className="userInterface__bottom">
                        <form className="userInterface__form userInterface__sort">
                            <span>Sort by</span>
                            <label>
                                <input type="radio" id="idRev" name="sort" value="idRev" onChange={sortByIdReverse} />
                                <span>Order ID - Reverse</span>
                            </label>
                            <label>
                                <input type="radio" id="cusNm" name="sort" value="cusNm" onChange={sortByCustomerName} />
                                <span>Customer name</span>
                            </label>
                        </form>
                        <table className="userInterface__table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Book titles</th>
                                    <th>Quantity</th>
                                    <th>Creation date</th>
                                    <th>Delivery date</th>
                                    <th>Delivery service</th>
                                    <th>Delivery method</th>
                                    <th>Customer name</th>
                                    <th>Customer contacts</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order, index) => (
                                        <tr key={index} className="order-item">
                                            <td>{order.id}</td>
                                            <td>{order.bookTitles}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.creationDate}</td>
                                            <td>{order.deliveryDate}</td>
                                            <td>{order.deliveryService}</td>
                                            <td>{order.deliveryMethod}</td>
                                            <td>{order.customerName}</td>
                                            <td>{order.customerContacts}</td>
                                            <td><button onClick={() => removeOrder(index)}>Remove</button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={10}>No orders</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookOrders;