import runtimeEnv from "@mars/heroku-js-runtime-env";
import axios from 'axios'

const env = runtimeEnv()

export default class AuthService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: `${ env.REACT_APP_API_URL }`,
            withCredentials: true
        })
    }

    signup = credentials => this.apiHandler.post('/signup', credentials)
    login = credentials => this.apiHandler.post('/login', credentials)
    logout = () => this.apiHandler.post('/logout')
    isLoggedIn = () => this.apiHandler.get('/loggedin')
}