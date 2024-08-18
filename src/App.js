import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import './styles.css';
import Footer from './components/Footer';
import MovieDetails from './pages/MovieDetails';
import Series from './pages/Series';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieDetails />} />
        <Route path="/series" element={<Series />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
