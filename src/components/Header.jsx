import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

export function Header() {
  return (
    <header id="main-header">
      <Logo />
      <Navigation />
    </header>
  );
}
