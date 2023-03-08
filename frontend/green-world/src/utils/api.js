import axios from 'axios'

// Axios request to create a new user account
export async function createUser(formData) {
    const { data } = await axios.post('http://localhost:8800/users/signup', formData)
    return data
}

export async function userLogin(formData) {
    try {
        console.log('form data:', formData); // Add this line to check the form data
        const { data } = await axios.post('http://localhost:8800/users/login', formData);
        console.log('response data:', data); // Add this line to check the response data
        return data;
    } catch (error) {
        console.log('login error:', error);
    }
}
