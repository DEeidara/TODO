import logo from './logo.svg';
import './App.css';
import React from 'react';
import TODOUserList from './components/User.js';
import axios from 'axios';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'todousers': []
    }
  }

  componentDidMount() {
      axios.get('http://localhost:8000/api/users/').then(response => { 
        this.setState({
          'todousers': response.data
        })
      }).catch(error => console.log(error))
  }

  render () {
    return (
      <div>
        <Menu />
        <TODOUserList todousers={this.state.todousers} />
        <Footer />
      </div>
    )
  }
}

export default App;
