import axios from 'axios';

async function getItems() {
    const items = await axios.get(`http://localhost:3000/item`);
    return items.data
};

async function getItemsByDept(id) {
    const items = await axios.get(`http://localhost:3000/item/department/${id}`);
    return items.data
};

export {
    getItems,
    getItemsByDept
}