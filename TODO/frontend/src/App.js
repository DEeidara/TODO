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

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'todousers': [],
            'projects': [],
            'TODONotes': []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/users/').then(response => {
            this.setState({
                'todousers': response.data.results
            })
        }).catch(error => console.log(error))

        axios.get('http://localhost:8000/api/projects/').then(response => {
            this.setState({
                'projects': response.data.results
            })
        }).catch(error => console.log(error))

        axios.get('http://localhost:8000/api/TODO/').then(response => {
            this.setState({
                'TODONotes': response.data.results
            })
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className='App'>
                <BrowserRouter>
                    <Menu/>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/projects'/>}/>
                        <Route exact path='/users' element={<TODOUserList todousers={this.state.todousers}/>}/>
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
