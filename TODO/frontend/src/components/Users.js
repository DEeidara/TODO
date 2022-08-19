import React from 'react';

const TODOUserItem = ({todouser}) => {
    return (
        <tr>
            <td>
                {todouser.username}
            </td>
            <td>
                {todouser.firstName}
            </td>
            <td>
                {todouser.lastName}
            </td>
            <td>
                {todouser.email}
            </td>
        </tr>
    )
}

const TODOUserList = ({todousers}) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>
                        Username
                    </th>
                    <th>
                        First name
                    </th>
                    <th>
                        Last name
                    </th>
                    <th>
                        Email
                    </th>
                </tr>
            </thead>
            <tbody>{todousers.map((todouserr) => <TODOUserItem todouser={todouserr} />)}</tbody>
        </table>
    )
}

export default TODOUserList;