import axios from 'axios';

async function guestCheckout(user) {
    const guest = await axios.post(`http://localhost:3000/user/guest`, user);
    return guest.data
};

export {
    guestCheckout
}