import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Survey from './pages/Survey';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pesquisa" element={<Survey />} />
        <Route path="sobre" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;