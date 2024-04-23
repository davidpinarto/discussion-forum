import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainHeader } from './MainHeader';
import { MainBody } from './MainBody';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

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
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </main>
  );
}
