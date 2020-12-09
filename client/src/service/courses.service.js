
import axios from 'axios'

export default class CourseService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/courses',
            withCredentials: true
        })
    }

    getCourses = () => this.apiHandler.get('/getAllCourses')
    getTeacherCourses = teacherId => this.apiHandler.get(`/getTeacherCourses/${teacherId}`)
    getCourse = courseId => this.apiHandler.get(`/getOneCourse/${courseId}`)
    saveCourse = courseInfo => this.apiHandler.post(`/newCourse`, courseInfo)
    editCourse = (courseId, courseInfo) => this.apiHandler.put(`/editCourse/${courseId}`, courseInfo)
    deleteCourse = courseId => this.apiHandler.delete(`/deleteCourse/${courseId}`)
    deleteTeacherCourses = teacherId => this.apiHandler.delete(`/deleteTeacherCourses/${teacherId}`)
}