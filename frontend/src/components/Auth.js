import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event) {
        this.props.getToken(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <div className="width-for-forms position-absolute top-50 start-50 translate-middle">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input className='form-control' type="text" name="login" placeholder="login"
                           value={this.state.login} onChange={(event) => this.handleChange(event)}/>
                    <input className='form-control' type="password" name="password" placeholder="password"
                           value={this.state.password} onChange={(event) => this.handleChange(event)}/>
                    <input className='btn btn-primary' type="submit" value="Sign in"/>
                </form>
            </div>
        )
    }
}

export default LoginForm