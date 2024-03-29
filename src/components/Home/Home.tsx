import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import ToolBar from '../ToolBar/ToolBar';
import News from '../News/News';
import NewsDetails from '../NewsDetails/NewsDetails';

import { TLogOut } from '../../types/TLogOut';
import { TLogIn } from '../../types/TLogIn';

export default function Home() {
    const [isNewsDetails, setIsNewsDetails] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const navigator = useNavigate();
  
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
            !isNewsDetails && navigator('/news');
        }

        if (!token) navigator('/');
    }, [token, navigator, isNewsDetails]);
  
    const logOut: TLogOut = () => {
      setToken(null);
      sessionStorage.removeItem('token');
      navigator("/")
    };
  
    const logIn: TLogIn = (data) => {
      const body = JSON.stringify(data);
  
      fetch(import.meta.env.VITE_APP_AUTH, {
        method: 'POST',
        body
      }).then((response) => response.json()).then((dataToken) => {
        setToken(dataToken.token);
        sessionStorage.setItem('token', dataToken.token);
        navigator('/news');
      });
    }    
  
    return (
        <> 
            {!isNewsDetails && <ToolBar token={token} logIn={logIn} logOut={logOut} />}
            <p>password</p>
            <Routes>
                {token && !isNewsDetails &&
                <Route path='news/' element= {
                    <News
                        token={token}
                        isDetails={isNewsDetails}
                        hideToolbar={setIsNewsDetails}
                        logOut={logOut} />
                    }
                />}
                {token && isNewsDetails && <Route path="news/:id" Component={NewsDetails}/>}
            </Routes>
        </>
    )
  }
