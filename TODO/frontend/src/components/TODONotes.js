import React from 'react';
import {useParams} from 'react-router-dom';

const TODONoteItem = ({TODONote, deleteTODO}) => {
    return (
        <tr>
            <td>
                {TODONote.text}
            </td>
            <td>
                {TODONote.status}
            </td>
            <td>
                {TODONote["createdAt"]}
            </td>
            <td>
                {TODONote["updatedAt"]}
            </td>
            <td>
                <button className='nav-link' onClick={() => deleteTODO(TODONote.id)}>Delete</button>
            </td>
        </tr>
    )
}

const TODONotesList = ({TODONotes, deleteTODO}) => {
    const {projectId} = useParams();
    let filter_notes = TODONotes.filter((note) => note.project === Number.parseInt(projectId));
    return (
        <table className='table'>
            <thead>
            <tr>
                <th>
                    Text
                </th>
                <th>
                    Status
                </th>
                <th>
                    Created at
                </th>
                <th>
                    Updated at
                </th>
                <th>
                </th>
            </tr>
            </thead>
            <tbody>{filter_notes.map((note) => <TODONoteItem TODONote={note} deleteTODO={deleteTODO}/>)}</tbody>
        </table>
    )
}

export default TODONotesList;