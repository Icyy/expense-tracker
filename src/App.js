import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddExpensePage from './pages/AddExpensePage';
import NotFoundPage from './pages/NotFoundPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ff7f', // Green for buttons, links, etc.
    },
    background: {
      default: '#000', // Black background
    },
    text: {
      primary: '#fff', // White text
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/add-expense" element={<AddExpensePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
