import axios from 'axios';

async function placeOrder(order) {
    const makeOrder = await axios.post(`http://localhost:3000/order`, order);
    return makeOrder.data
};

async function previousOrders(id) {
    const orders = await axios.get(`http://localhost:3000/order/${id}`);
    console.log(orders.data)
}

export {
    placeOrder,
    previousOrders
}