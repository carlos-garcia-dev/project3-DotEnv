import axios from 'axios'


export default class ServicePublication {

    constructor(){
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
        })
    }

    getPublications = () => this.apiHandler.get('/getAllPublications')
    getOnePublication = publicationId => this.apiHandler.get(`/getOnePublication/${publicationId}`)
    getAllPublicationComments = publicationId => this.apiHandler.get(`/getPublicationComments/${publicationId}`)
    
    postNewPublication = publicationDetails => this.apiHandler.post(`/newPublication`, publicationDetails)
    putPublication = () => this.apiHandler.put('/editPublication/:id')
    deletePublication = () => this.apiHandler.delete('/deletePublication/:id')
}
