import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

export function Header() {
  return (
    <header>
      <Logo logoName="DiForum" type="blackInPink" />
      <Navigation />
    </header>
  );
}
