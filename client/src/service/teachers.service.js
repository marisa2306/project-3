
import axios from 'axios'

export default class TeacherService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/teachers',
            withCredentials: true
        })
    }

    getTeachers = () => this.apiHandler.get('/getAllTeachers')
    getTeacher = userId => this.apiHandler.get(`/getOneTeacher/${userId}`)
    saveTeacher = teacherInfo => this.apiHandler.post(`/newTeacher/`, teacherInfo)
    //editTeacher = (teacherId, teacherInfo) => this.apiHandler.put(`/editTeacher/${teacherId}`, teacherInfo)
    //deleteCourse = teacherId => this.apiHandler.delete(`/deleteTeacher/${teacherId}`)

}