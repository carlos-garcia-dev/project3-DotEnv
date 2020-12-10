import axios from 'axios'


export default class AuthService {

    constructor(){
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/auth',
            withCredentials: true
        })
    }

    signUp = credentials => this.apiHandler.post('/signup', credentials)
    signIn = credentials => this.apiHandler.post('/signin', credentials)
    signOut = () => this.apiHandler.post('/signout')
    signnedIn = () => this.apiHandler.get('/signnedin')
}
