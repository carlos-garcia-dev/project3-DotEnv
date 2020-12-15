import axios from 'axios'


export default class ServiceCommentary {

    constructor(){
        this.apiHandler = axios.create({
            baseURL:'http://localhost:5000/api/commentaries',
            withCredentials: true
        })
    }

    getCommentaries = () => this.apiHandler.get('/getAllCommentaries')
    getOneCommentary = commentaryId => this.apiHandler.get(`/getOneCommentary/${commentaryId}`)
    postNewCommentary = commentaryInfo => this.apiHandler.post(`/newComment`, commentaryInfo)
    putCommentary = () => this.apiHandler.put('/editCommentary/:commentary_id')
    deleteCommentary = () => this.apiHandler.delete('/deleteCommentary/:commentary_id')
}
