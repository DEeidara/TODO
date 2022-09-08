import React from 'react';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'name': '', 'devsList': [], 'repositoryLink': ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleDevsChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'devsList': []
            })
            return;
        }
        const devs = []
        for (const i of event.target.selectedOptions) {
            devs.push(parseInt(i.value))
        }
        this.setState(
            {'devsList': devs}
        )
    }

    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.devsList, this.state.repositoryLink)
        event.preventDefault()
    }

    render() {
        return (
            <div className="width-for-forms position-absolute top-50 start-50 translate-middle">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input className='form-control' type="text" name="name" placeholder="Project name"
                           value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                    <input className='form-control' type="text" name="repositoryLink" placeholder="Repository link"
                           value={this.state.repositoryLink} onChange={(event) => this.handleChange(event)}/>
                    <select className='form-select' name="devsList" multiple
                            onChange={(event) => this.handleDevsChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>
                    <input className='btn btn-primary' type="submit" value="Save"/>
                </form>
            </div>
        )
    }
}

export default ProjectForm