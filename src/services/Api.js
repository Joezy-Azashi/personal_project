import axios from 'axios'
import * as Cookies from 'js-cookie'

export default () => {
    const authToken = Cookies.get('authToken')
    return axios.create({
        baseURL: 'http://charlez.herokuapp.com',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: authToken ? `Bearer ${authToken}` : null
        }
    })
}