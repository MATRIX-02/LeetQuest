import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { ThemeProvider } from './components/ThemeProvider';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <CustomThemeProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/main" element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </CustomThemeProvider>
  );
}

export default App;