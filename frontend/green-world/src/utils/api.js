import axios from 'axios'

// Axios request to create a new user account
export async function createUser(formData) {
    const { data } = await axios.post('https://localhost:8800/users/signup', formData)
    return data
}

export async function userLogin(formData) {
    const { data } = await axios.post('https://localhost:8800/users/login', formData)
    return data
}