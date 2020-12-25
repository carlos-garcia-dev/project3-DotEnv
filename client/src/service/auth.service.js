import axios from 'axios'


export default class ServiceAuth {

    constructor(){
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    signUp = credentials => this.apiHandler.post('/signup', credentials)
    signIn = credentials => this.apiHandler.post('/signin', credentials)
    signOut = () => this.apiHandler.post('/signout')
    signnedIn = () => this.apiHandler.get('/signnedin')
}
