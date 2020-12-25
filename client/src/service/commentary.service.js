import axios from 'axios'


export default class ServiceCommentary {

    constructor(){
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getCommentaries = () => this.apiHandler.get('/getAllCommentaries')
    getOneCommentary = commentaryId => this.apiHandler.get(`/getOneCommentary/${commentaryId}`)
    postNewCommentary = commentaryInfo => this.apiHandler.post(`/newComment`, commentaryInfo)
    putCommentary = () => this.apiHandler.put('/editCommentary/:id')
    deleteCommentary = () => this.apiHandler.delete('/deleteCommentary/:id')
}
