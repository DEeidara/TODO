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
import ProjectForm from "./components/ProjectForm";
import TODONoteForm from "./components/TODONoteForm";

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

    deleteProject(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(() => {
            this.loadData()
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    createProject(name, devsList, repositoryLink) {
        const headers = this.getHeaders()
        const data = {name: name, repositoryLink: repositoryLink, devsList: devsList}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers}).then(() => {
            this.loadData()
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    deleteTODO(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/TODO/${id}`, {headers}).then(() => {
            this.loadData()
        }).catch(error => {
            console.log(error)
            this.setState({TODONotes: []})
        })
    }

    createTODO(text, project) {
        const headers = this.getHeaders()
        const data = {text: text, project: project}
        axios.post(`http://127.0.0.1:8000/api/TODO/`, data, {headers}).then(() => {
            this.loadData()
        }).catch(error => {
            console.log(error)
            this.setState({TODONotes: []})
        })
    }

    setToken(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.loadData())
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json',
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    isAuthenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.setToken('')
    }

    getTokenFromStorage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.loadData())
    }

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {username: username, password: password}).then(response => {
            this.setToken(response.data['token'])
        }).catch(() => alert('Invalid username or password'))
    }

    loadData() {
        const headers = this.getHeaders()
        axios.get('http://localhost:8000/api/users/', {headers}).then(response => {
            this.setState({
                todousers: response.data.results
            })
        }).catch(error => {
            console.log(error)
            this.setState({todousers: []})
        })
        axios.get(`http://localhost:8000/api/projects/`,
            {headers}).then(response => {
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
        this.getTokenFromStorage()
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
                            getToken={(username, password) => this.getToken(username, password)}/>}></Route>
                        <Route path='/projects'>
                            <Route index element={<ProjectsList projects={this.state.projects}
                                                                deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route path=':projectId'
                                   element={<TODONotesList TODONotes={this.state.TODONotes}
                                                           deleteTODO={(id) => this.deleteTODO(id)}/>}/>

                            <Route exact path='/projects/create'
                                   element={<ProjectForm users={this.state.todousers}
                                                         createProject={(name, devsList, repositoryLink) =>
                                                             this.createProject(name, devsList, repositoryLink)}/>}/>

                        </Route>
                        <Route exact path='TODO/create'
                               element={<TODONoteForm projects={this.state.projects}
                                                      createTODO={(text, project) =>
                                                          this.createTODO(text, project)}/>}/>
                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
