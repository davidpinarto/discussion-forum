import React, { useState } from 'react';
import { FaSun } from 'react-icons/fa';

export function Navigation() {
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
        <li><button id="theme-mode"><FaSun /></button></li>
        <li className="profile-info">
          <img src="https://ui-avatars.com/api/?name=David+Pi&background=80CBDC" alt="avatar" />
          <div>
            <h3>Guest</h3>
            <p>Login</p>
          </div>
        </li>
      </ul>
    </nav>
  );
}
