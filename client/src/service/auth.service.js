import axios from 'axios'

export default class AuthService {

    constructor() {
        this.apiHandler = axios.create({
            //baseURL: 'http://localhost:5000/api', withCredentials: true
            baseURL: `${process.env.REACT_APP_API_URL}`, withCredentials: true
        })
    }

    signup = credentials => this.apiHandler.post('/signup', credentials)
    login = credentials => this.apiHandler.post('/login', credentials)
    logout = () => this.apiHandler.post('/logout')
    isLoggedIn = () => this.apiHandler.get('/loggedin')
}