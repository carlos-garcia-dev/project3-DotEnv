import axios from 'axios'


export default class ServicePublication {

    constructor(){
        this.apiHandler = axios.create({
            baseURL:'http://localhost:5000/api/publications'
        })
    }

    getPublications = () => this.apiHandler.get('/getAllPublications')
    getOnePublication = publicationId => this.apiHandler.get(`/getOnePublication/${publicationId}`)
    getAllPublicationComments = publicationId => this.apiHandler.get(`/getPublicationComments/${publicationId}`)
    
    postNewPublication = publicationDetails => this.apiHandler.post(`/newPublication`, publicationDetails)
    putPublication = () => this.apiHandler.put('/editPublication/:publication_id')
    deletePublication = () => this.apiHandler.delete('/deletePublication/:publication_id')
}
