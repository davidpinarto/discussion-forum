import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setThemeLightActionCreator, setThemeDarkActionCreator } from '../states/theme/action';
import { setLanguage } from '../states/language/action';
import { asyncUnsetAuthUser } from '../states/authUser/action';

export function Navigation() {
  const {
    authUser = null,
    themeMode = 'light',
    language = 'Indonesia',
  } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onThemeModeChangeHandler = () => {
    if (themeMode === 'dark') {
      dispatch(setThemeLightActionCreator('light'));
    } else {
      dispatch(setThemeDarkActionCreator('dark'));
    }
  };

  const onLanguageChangeHandler = ({ target }) => {
    dispatch(setLanguage(target.value));
  };

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <nav>
      <ul>
        <li>
          <select value={language} onChange={onLanguageChangeHandler}>
            <option value="Indonesia">Indonesia</option>
            <option value="English">English</option>
          </select>
        </li>
        <li><button id="theme-mode" onClick={onThemeModeChangeHandler}>{themeMode === 'light' ? <FaSun /> : <FaMoon /> }</button></li>
        <li className="profile-info">
          <img src={`https://ui-avatars.com/api/?name=${authUser ? authUser.name : 'Guest'}&background=80CBDC`} alt="avatar" />
          <div>
            <h3>{authUser ? authUser.name : 'Guest'}</h3>
            {authUser
              ? <button onClick={onSignOut}>Logout</button>
              : <button onClick={() => navigate('/login')}>Login</button>}
          </div>
        </li>
      </ul>
    </nav>
  );
}
