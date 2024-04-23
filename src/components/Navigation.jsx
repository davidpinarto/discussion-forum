import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeLightActionCreator, setThemeDarkActionCreator } from '../states/theme/action';

export function Navigation() {
  /**
   * We need 3 state here,
   *   - state for select
   *   - state for theme mode  done
   *   - state for profile-info  done
   */
  const {
    authUser = null,
    themeMode = 'light',
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  const onThemeModeChangeHandler = () => {
    if (themeMode === 'dark') {
      dispatch(setThemeLightActionCreator('light'));
    } else {
      dispatch(setThemeDarkActionCreator('dark'));
    }
  };
  const [selectedValue, setSelectedValue] = useState('Indonesia');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <nav>
      <ul>
        <li>
          <select value={selectedValue} onChange={handleSelectChange}>
            <option value="Indonesia">Indonesia</option>
            <option value="English">English</option>
          </select>
        </li>
        <li><button id="theme-mode" onClick={onThemeModeChangeHandler}>{themeMode === 'light' ? <FaSun /> : <FaMoon /> }</button></li>
        <li className="profile-info">
          <img src={`https://ui-avatars.com/api/?name=${authUser ? authUser.name : 'Guest'}&background=80CBDC`} alt="avatar" />
          <div>
            <h3>{authUser ? authUser.name : 'Guest'}</h3>
            <p>{authUser ? 'Logout' : 'Login'}</p>
          </div>
        </li>
      </ul>
    </nav>
  );
}
