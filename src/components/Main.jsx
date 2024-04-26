import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { DetailThreadPage } from '../pages/DetailThreadPage';
import { AddThreadPage } from '../pages/AddThreadPage';
import { LeaderboardsPage } from '../pages/LeaderboardsPage';

export function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/threads/:id" element={<DetailThreadPage />} />
        <Route path="/add-thread" element={<AddThreadPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
      </Routes>
    </main>
  );
}
