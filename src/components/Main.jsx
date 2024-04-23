import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainHeader } from './MainHeader';
import { MainBody } from './MainBody';

export function Main() {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <MainHeader />
              <MainBody />
            </>
          )}
        />
      </Routes>
    </main>
  );
}
