import { Outlet, useNavigate } from 'react-router-dom';

import ToolBar from '../ToolBar/ToolBar';
import { useEffect } from 'react';
import { TLogIn } from '../../types/TLogIn';
import { TLogOut } from '../../types/TLogOut';

export default function Home({ logIn, logOut, token }: { logIn: TLogIn, logOut: TLogOut, token: null | string }) {
  const navigator = useNavigate();

  useEffect(() => {
    if (token) navigator('/news');
  }, [navigator, token])

  
  return (
      <> 
        <ToolBar token={token} logIn={logIn} logOut={logOut} />
        <p>password</p>
        <Outlet />
      </>
  )
}
