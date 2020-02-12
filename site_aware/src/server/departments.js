import axios from 'axios';

async function getDepartments() {
    const departments = await axios.get(`http://localhost:3000/department`);
    return departments.data
};

export {
    getDepartments
}