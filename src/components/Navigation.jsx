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
        <li><FaSun /></li>
        <li>
          <img src="https://ui-avatars.com/api/?name=David+Pi" alt="avatar" />
          <div className="profile-info">
            <h3>Guest</h3>
            <p>Login</p>
          </div>
        </li>
      </ul>
    </nav>
  );
}
