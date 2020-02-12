import fetcher from './fetcher';

async function guestCheckout(user) {
    const guest = await fetcher.post(`/user/guest`, user);
    return guest.data
};

async function registerCheckout(user) {
    const register = await fetcher.post(`/user/register`, user);
    return register.data
};

async function login(user) {
    const loggedIn = await fetcher.post(`/user/login`, user);
    console.log(loggedIn.data);
    console.log(loggedIn)
}
export {
    guestCheckout,
    registerCheckout,
    login
}