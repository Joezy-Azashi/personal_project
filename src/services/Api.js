import axios from 'axios'
import * as Cookies from 'js-cookie'

export default () => {
    const authToken = Cookies.get('authToken')
    return axios.create({
        baseURL: 'https://569a9820ac59.ngrok.io/',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authToken ? `Bearer ${authToken}` : null
        }
    })
}