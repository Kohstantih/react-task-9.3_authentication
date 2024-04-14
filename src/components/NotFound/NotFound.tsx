import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
    return (
        <>
            <Link to='/' className="go_home" >На главную</Link>
            <h1 className="not_found">
                404
            </h1>
            <h1 className="not_found">
                Not Found
            </h1>
        </>
        
    )
}