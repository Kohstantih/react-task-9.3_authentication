import useJsonFetch from '../../hooks/useJsonFetch';
import { TLogOut } from '../../types/TLogOut';
import { TUserObject } from '../../types/TUserObject';
import './User.css';

export default function User(
    { token, logOut }
    : { token: string, logOut: TLogOut }
    ) {
    const [user, loading, error] = useJsonFetch<null, TUserObject>(import.meta.env.VITE_APP_USER_DATA, null, token);

    if (error) logOut();

    return (
        <>
            {user && !error && <div className="user_box">
                <p className="name">Hello, {user.name}</p>
                <img src={user.avatar} className="avatar" />
                <button onClick={logOut} type="button" className="btn_logout">Logout</button>
            </div>}
            {loading && <p>Loading...</p>}
        </>
    )
}
