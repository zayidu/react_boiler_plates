import React from 'react';
import { Link , Redirect } from 'react-router-dom';

const Profile = (props) => {

    console.log(props);
    const _path = props.match.url;

    const redir = () => {
        // return (
        // <Redirect to="/" />
        // )
        props.history.push('/')
    }

    return (
        <div>
            <Link to={
                {
                    pathname:`${_path}/posts`
                }
            }>M'emmener sur la ligne /profile/posts</Link>

            {redir()}
        </div>
    )
}

export default Profile;