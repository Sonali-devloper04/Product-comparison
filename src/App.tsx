// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ComparePage from './pages/ComparePage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { CompareProvider } from './contexts/CompareContext';

const App: React.FC = () => {
  return (
    <CompareProvider>
      <Router>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
            <Routes>
              <Route path="/" element={<ProductPage />} />
              <Route path="/compare" element={<ComparePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CompareProvider>
  );
};

export default App;
