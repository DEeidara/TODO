import React from 'react';
import {Link} from 'react-router-dom';


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repositoryLink}
            </td>
            <td>
                {project.devsList.map((object) => <Link to='/users'>{object + ' '}</Link>)}
            </td>
            <td>
                <Link to={`/projects/${project.id}`}>Link</Link>
            </td>
            <td>
                <button className='nav-link' onClick={() => deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ProjectsList = ({projects, deleteProject}) => {
    return (
        <table className='table'>
            <thead>
            <tr>
                <th>
                    Project name
                </th>
                <th>
                    Repository link
                </th>
                <th>
                    Devs list
                </th>
                <th>
                    TODO notes related to this project
                </th>
                <th>
                </th>
            </tr>
            </thead>
            <tbody>{projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}</tbody>
        </table>
    )
}

export default ProjectsList;