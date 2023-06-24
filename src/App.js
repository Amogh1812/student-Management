import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Update from './Update';
import Create from './Create';
import Navbar from './Navbar';
// import Login from './Login';
// import Register from './Register';
import {useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  // const [user,setLoginUser] = useState({

  // })
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      {/* <Route exact path="/">
    {
      user && user._id ? <Home/>:<Login/>
    }<Home/></Route> */}
     {/* <Route path="/Login" element={<Login/>} />
  <Route path="/Register" element={<Register/>}/> */}
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/update' element={<Update/>}/>
        <Route path='*' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
