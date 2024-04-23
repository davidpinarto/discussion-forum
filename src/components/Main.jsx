import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainHeader } from './MainHeader';
import { MainBody } from './MainBody';
import { LoginPage } from '../pages/LoginPage';

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
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
}
