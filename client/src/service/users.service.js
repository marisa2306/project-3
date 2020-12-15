
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

    getUserFavCourses = userId => this.apiHandler.get(`/userFavCourses/${userId}`)
    updateFavCourses = (userId, favList) => this.apiHandler.put(`/editUser/updateFavCourses/${ userId }`, favList)
    
    getUserFavTeachers = userId => this.apiHandler.get(`/userFavTeachers/${userId}`)
    updateFavTeachers = (userId, favList) => this.apiHandler.put(`/editUser/updateFavTeachers/${userId}`, favList)
}