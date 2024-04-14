import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './components/Home/Home';
import News from './components/News/News';
import NewsDetails from './components/NewsDetails/NewsDetails';
import NotFound from './components/NotFound/NotFound';

import { TLogOut } from './types/TLogOut';
import { TLogIn } from './types/TLogIn';

import './App.css';

function App() {
  const navigator = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [isDetails, setIsDetails] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'));
    }
  }, [navigator])

  const changeDetailsStatus = (status: boolean) => setIsDetails(status);

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
    <Routes>
      <Route path='/' element={<Home logIn={logIn} logOut={logOut} token={token} />} >
        {token &&
        <Route
          path='/news'
          element= {
            <News
              token={token}
              logOut={logOut}
              changeDetailsStatus={changeDetailsStatus}
            />
          }
        />}
      </Route>
      {token && isDetails && <Route path='/news/:id' Component={NewsDetails}/>}
      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
}

export default App
