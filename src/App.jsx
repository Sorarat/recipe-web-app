import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Search from "./components/Search";
import Explore from "./components/Explore";
import ViewRecipes from "./components/ViewRecipes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EditProfile from "./components/EditProfile";
import SavedRecipes from "./components/SavedRecipes";

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
        <Route path="/signup" element={<Signup/>}/>
        <Route path="edit-profile" element={<EditProfile/>}/>
        <Route path="saved-recipes" element={<SavedRecipes/>}/>
      </Routes>
    </Router>
  );
}

export default App
