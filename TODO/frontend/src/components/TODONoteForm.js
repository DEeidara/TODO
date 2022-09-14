import React from 'react';

class TODONoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'text': '', 'project': ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'project': ''
            })
            return;
        }
        const project = event.target.selectedOptions[0].value
        this.setState(
            {'project': project}
        )
    }

    handleSubmit(event) {
        this.props.createTODO(this.state.text, this.state.project);
        event.preventDefault()

    }

    render() {
        return (
            <div className="width-for-forms position-absolute top-50 start-50 translate-middle">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input className='form-control' type="text" name="text" placeholder="Note text"
                           value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                    <select className='form-select' name="project"
                            onChange={(event) => this.handleProjectChange(event)}>
                        <option></option>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                    <input className='btn btn-primary' type="submit" value="Save"/>
                </form>
            </div>
        )
    }
}

export default TODONoteForm