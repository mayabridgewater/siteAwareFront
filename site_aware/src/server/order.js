import axios from 'axios';

async function placeOrder(order) {
    const makeOrder = await axios.post(`http://localhost:3000/order`, order);
    return makeOrder.data
};

export {
    placeOrder
}