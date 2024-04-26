import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { asyncUnsetAuthUser } from '../states/authUser/action';

export function Navigation() {
  const {
    authUser = null,
  } = useSelector((states) => states);
  const dispatch = useDispatch();
  const location = useLocation();

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <nav>
      <ul>
        <li><Link to="/"><button className="btn">Home</button></Link></li>
        <li><Link to="/leaderboards"><button className="btn">Leaderboards</button></Link></li>
        {location.pathname === '/login' || location.pathname === '/register'
          ? ''
          : (
            <li className="profile-info">
              <img src={authUser ? authUser.avatar : 'https://ui-avatars.com/api/?name=Guest&background=80CBDC'} alt="avatar" />
              <div>
                <h3>{authUser ? authUser.name : 'Guest'}</h3>
                {authUser
                  ? <button onClick={onSignOut}>Logout</button>
                  : <button><Link to="/login">Login</Link></button>}
              </div>
            </li>
          )}
      </ul>
    </nav>
  );
}
