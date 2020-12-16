import axios from 'axios'

export default class CommentsService {

    constructor() {
        this.apiHandler = axios.create({
            //baseURL: 'http://localhost:5000/api/courses',withCredentials: true
            baseURL: `${process.env.REACT_APP_API_URL}/comments`, withCredentials: true
        })
    }

    getComments = () => this.apiHandler.get('/getAllComments')
    getUserComments = userId => this.apiHandler.get(`/getUserComments/${userId}`)
    getComment = commentId => this.apiHandler.get(`/getOneComment/${commentId}`)
    saveComment = commentInfo => this.apiHandler.post(`/newComment`, commentInfo)
    editComment = (commentId, commentInfo) => this.apiHandler.put(`/editComment/${commentId}`, commentInfo)
}