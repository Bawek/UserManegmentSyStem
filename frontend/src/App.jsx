import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import AddNote from './components/AddNote';
import DisplayNote from './components/DisplayNote';
import Update from './components/Update';

const App = () => {
  return (
    <div className="sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-col bg-green-100 min-w-screen min-h-screen">
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<DisplayNote />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddNote />} />
        <Route path="/update" element={<Update />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
