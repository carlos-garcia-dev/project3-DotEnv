import axios from 'axios'


export default class CommentaryService {

    constructor(){
        this.apiHandler = axios.create({
            baseURL:'http://localhost:5000/api/commentaries',
            withCredentials: true
        })
    }

    getCommentaries = () => this.apiHandler.get('/getAllCommentaries')
    getOneCommentary = commentaryId => this.apiHandler.get(`/getOneCommentary/${commentaryId}`)
    postNewCommentary = commentaryId => this.apiHandler.post(`/newCommentary`,commentaryId)
    putCommentary = () => this.apiHandler.put('/editCommentary/:commentary_id')
    deleteCommentary = () => this.apiHandler.delete('/deleteCommentary/:commentary_id')
}
