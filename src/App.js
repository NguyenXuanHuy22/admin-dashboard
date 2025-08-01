import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages';
import { Login, ProtectedRoute } from './components';
import ProductDetail from './pages/ProductDetail'; // ✅ Bổ sung dòng này

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route - Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Public route - Xem chi tiết sản phẩm */}
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* Protected route - Dashboard */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Redirect bất kỳ route không tồn tại nào về "/" */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
