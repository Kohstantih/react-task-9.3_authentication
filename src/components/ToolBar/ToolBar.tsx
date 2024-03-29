import { TLogIn } from '../../types/TLogIn';
import { TLogOut } from '../../types/TLogOut';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import User from '../User/User';
import './ToolBar.css'

export default function ToolBar(
    { token, logIn, logOut}: { token: string | null, logIn: TLogIn, logOut: TLogOut}
    ) {
    return (
        <div className="toolbar">
            <h1 className="toolbar_title">Neto Social</h1>
            {!token && <AuthorizationForm onSubmit={logIn}/>}
            {token && <User token={token} logOut={logOut} />}
        </div>
    )
}