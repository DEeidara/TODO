import './App.css';
import React from 'react';
import TODOUserList from './components/Users.js';
import axios from 'axios';
import Menu from './components/Menu.js';
import NotFound404 from './components/NotFound404';
import Footer from './components/Footer.js';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import ProjectsList from './components/Projects';
import TODONotesList from './components/TODONotes';
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/es6";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'todousers': [],
            'projects': [],
            'TODONotes': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {username: username, password: password}).then(response => {
            this.set_token(response.data['token'])
        }).catch(() => alert('Invalid username or password'))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://localhost:8000/api/users/', {headers}).then(response => {
            this.setState({
                todousers: response.data.results
            })
        }).catch(error => {
            console.log(error)
            this.setState({todousers: []})
        })

        axios.get('http://localhost:8000/api/projects/', {headers}).then(response => {
            this.setState({
                projects: response.data.results
            })
        }).catch(error => console.log(error))

        axios.get('http://localhost:8000/api/TODO/', {headers}).then(response => {
            this.setState({
                TODONotes: response.data.results
            })
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div className='App'>
                <BrowserRouter>
                    <Menu user={this}/>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/projects'/>}/>
                        <Route exact path='/users' element={<TODOUserList todousers={this.state.todousers}/>}/>
                        <Route exact path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}></Route>
                        <Route path='/projects'>
                            <Route index element={<ProjectsList projects={this.state.projects}/>}/>
                            <Route path=':projectId' element={<TODONotesList TODONotes={this.state.TODONotes}/>}/>
                        </Route>
                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
