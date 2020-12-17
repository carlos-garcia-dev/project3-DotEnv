import axios from 'axios'


export default class ServiceUser {

    constructor(){
        this.apiHandler = axios.create({
            baseURL:'http://localhost:5000/api/user',
            withCredentials: true
        })
    }

    putUser = () => this.apiHandler.put('/editUser/:id')
    deleteUser = () => this.apiHandler.delete('/deleteUser/:id')
}
