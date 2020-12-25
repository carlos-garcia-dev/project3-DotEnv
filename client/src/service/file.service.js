import axios from 'axios'


export default class ServiceFile {

    constructor(){
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    uploadImage =  imageForm => this.apiHandler.post('/upload', imageForm)
    uploadAvatar =  imageForm => this.apiHandler.post('/avatar', imageForm)
}
