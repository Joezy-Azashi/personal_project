import axios from 'axios'
import * as Cookies from 'js-cookie'
import Api from './Api'

const AUTH_TOKEN_KEY = 'authToken'
const CURRENT_USER = 'currentUser'

export function loginUser(userData){
    return new Promise(async (resolve, reject) => {
        try{
            const result = await Api().post('/login/', userData)
            if(result.data){
                setAuthToken(result.data.access)
                setCurrentUser(result.data)
                resolve(result)
            }else{
                reject(result)
            }

        }catch(error){
            reject(error)
        }
    })
}

export function setAuthToken (access) {
    Cookies.set(AUTH_TOKEN_KEY, access)
}

export function setCurrentUser (data) {
    Cookies.set(CURRENT_USER, JSON.stringify(data))
}
export function clearAuthToken(){
    axios.defaults.headers.common.Authorization = ''
    return Cookies.remove(AUTH_TOKEN_KEY)
}
export function clearCurrentUser(){
    return Cookies.remove(CURRENT_USER)
}
export function logoutUser(){
    clearAuthToken(); clearCurrentUser()
}