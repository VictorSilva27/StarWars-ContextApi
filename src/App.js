import React from 'react';
import Provider from './context/Provider';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <Provider>
      <Home />
      <Footer />
    </Provider>
  );
}

export default App;
