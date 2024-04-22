import React from 'react';
import { MainHeader } from './MainHeader';
import { MainBody } from './MainBody';
import { Footer } from './Footer';

export function Main() {
  return (
    <main>
      <MainHeader />
      <MainBody />
      <Footer />
    </main>
  );
}
