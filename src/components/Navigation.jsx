import React from 'react';
import { FaSun } from 'react-icons/fa';

export function Navigation() {
  return (
    <nav>
      <ul>
        <li><FaSun /></li>
        {/* language icon */}
        <li>
          <img src="https://ui-avatars.com/api/?name=David+Pi" alt="avatar" />
        </li>
      </ul>
    </nav>
  );
}
