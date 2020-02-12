import axios from 'axios';

async function guestCheckout(user) {
    const guest = await axios.post(`http://localhost:3000/user/guest`, user);
    return guest.data
};

async function registerCheckout(user) {
    const register = await axios.post(`http://localhost:3000/user/register`, user);
    return register.data
}

export {
    guestCheckout,
    registerCheckout
}