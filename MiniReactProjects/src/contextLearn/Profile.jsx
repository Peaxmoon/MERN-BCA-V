import  { useContext } from 'react';
import UserContext from './UserContext';

const Profile = () => {
    const user = useContext(UserContext);
    const suer = useContext(UserContext);

    return (
        <div>
            <h2>Profile Page</h2>
            <p>Username : {user}</p>
            {suer}
        </div>
    )
}

export default Profile;
