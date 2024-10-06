import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Search from "./components/Search";
import Explore from "./components/Explore";
import ViewRecipes from "./components/ViewRecipes";
import Login from "./components/Login";

function App() {
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/view-recipes" element={<ViewRecipes/>} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App
