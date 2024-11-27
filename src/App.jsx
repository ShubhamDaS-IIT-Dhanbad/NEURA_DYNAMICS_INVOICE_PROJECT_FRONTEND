import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home.jsx';
import AddInvoice from './pages/addInvoice.jsx';
import Navbar from './components/navBar.jsx'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/add-invoice" element={<AddInvoice />}/>
      </Routes>
    </Router>
  );
}

export default App;
