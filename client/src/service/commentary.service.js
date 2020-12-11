import axios from 'axios'


export default class PublicationService {

    constructor(){
        this.apiHandler = axios.create({
            baseURL:'http://localhost:5000/api/commentaries'
        })
    }

   
}
