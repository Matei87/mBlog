import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../state/UserContext';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    async function getCookies() {
      const req = await fetch('/profile', { credentials: 'include' });
      const res = await req.json();
      setUserInfo(res);
    }
    getCookies();
  }, [setUserInfo]);

  const Logout = async () => {
    const req = await fetch('/logout', {
      credentials: 'include',
      method: 'POST',
    });
    const res = await req.json();
    if (res === 'ok') setUserInfo(null);
  };

  //console.log('header ', userInfo);
  return (
    <header>
      <Link to='/' className='logo'>
        MyBlog
      </Link>
      <nav>
        {userInfo?.username ? (
          <>
            <Link to='/create'>Create new post</Link>
            <Link to='/' onClick={Logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;