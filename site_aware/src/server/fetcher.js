import axios from 'axios';

const fetcher = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

export default fetcher