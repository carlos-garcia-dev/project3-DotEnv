import axios from 'axios'


export default class ServiceUser {

    constructor(){
        this.apiHandler = axios.create({
             baseURL: process.env.REACT_APP_API_URL,
             withCredentials: true
        })
    }

    putUser = () => this.apiHandler.put('/editUser/:id')
    deleteUser = () => this.apiHandler.delete('/deleteUser/:id')
}
