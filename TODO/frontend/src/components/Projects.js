import React from 'react';
import {Link} from 'react-router-dom';


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repositoryLink}
            </td>
            <td>
                {project.devsList.map((object) => <Link to='/users'>{object.username + ' '}</Link>)}
            </td>
            <td>
                <Link to={`/projects/${project.id}`}>Link</Link>
            </td>
        </tr>
    )
}

const ProjectsList = ({projects}) => {
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
            </tr>
            </thead>
            <tbody>{projects.map((project) => <ProjectItem project={project}/>)}</tbody>
        </table>
    )
}

export default ProjectsList;