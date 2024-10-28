import './App.css'
import React, { useState } from 'react'
import NavBar from './components/NavBar'
import {Route, Routes} from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';

const App = () => {

  const [colorMode, setColorMode] = useState("light");

  const toggleColorMode = () =>{
    setColorMode(colorMode === "light"? "dark": "light");
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={colorMode}>
      <NavBar colorMode={colorMode} toggleColorMode={toggleColorMode}/>
      <Routes>
        <Route path='/' element={<HomePage colorMode={colorMode}/>}/>
        <Route path='/create' element={<CreatePage/>}/>
      </Routes>
    </div>
  )
}

export default App