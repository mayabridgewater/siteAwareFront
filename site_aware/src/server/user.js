import fetcher from './fetcher';

async function guestCheckout(user) {
    const guest = await fetcher.post(`/user/guest`, user);
    return guest.data
};

async function registerCheckout(user) {
    const register = await fetcher.post(`/user/register`, user);
    console.log(register)
    return register.data
};

async function login(user) {
    const loggedIn = await fetcher.post(`/user/login`, user);
    return loggedIn.data
};

async function getUserInfo(id) {
    const address = await fetcher.get(`/user/${id}`);
    return address.data
}
export {
    guestCheckout,
    registerCheckout,
    login,
    getUserInfo
}