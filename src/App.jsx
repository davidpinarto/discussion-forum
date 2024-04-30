import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { asyncPreloadProcess } from './states/isPreload/action';
import Loading from './components/Loading';

function App() {
  const isPreload = useSelector((states) => states.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <Header />
        <Main />
        <Footer footerContent="created by David Pinarto" type="blackInWhite" />
      </div>
    </>
  );
}

export default App;
