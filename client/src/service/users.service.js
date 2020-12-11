
import axios from 'axios'

export default class UserService {

    constructor() {
        this.apiHandler = axios.create({
            //baseURL: 'http://localhost:5000/api/users',
            baseURL: `${process.env.REACT_APP_API_URL}/users`,
            withCredentials: true
        })
    }

    // getUsers = () => this.apiHandler.get('/getAllUsers')           //ADMIN ROLE 
    // getUser = userId => this.apiHandler.get(`/getOneUser/${userId}`)      //ADMIN ROLE 
    editUser = (userId, userInfo) => this.apiHandler.put(`/editUser/${userId}`, userInfo)
    deleteUser = userId => this.apiHandler.delete(`/deleteUser/${userId}`)

    updateFavorites = (userId, favList) => this.apiHandler.put(`/editUser/updateFavs/${userId}`, favList)
    getUserFavorites = userId => this.apiHandler.get(`/userFavs/${userId}`)
}