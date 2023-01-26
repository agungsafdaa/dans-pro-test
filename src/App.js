import logo from './logo.svg';
import './style/css/main.css'
import { useState } from 'react';
import Navbar from './components/navbar/navbar';
import { Routes, Route, Link,useNavigate } from 'react-router-dom';
import Home from './components/home';
import LihatSemua from './components/lihatSemua';
import Pencarian from './components/Pencarian';
import Login from './components/dashboard';
import AppContext from './AppContext';
import Detail from './components/detail';
function App() {
  const navigate  = useNavigate();

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      navigate('/Login');
    }
  
    return children;
  };

  const [user, setUser] = useState([]);

  return (
    <>
    <AppContext.Provider
      value={{
        state: {
          user: user,
        },
        setUser: setUser,
       
      }}
    >
 <Navbar/>
    <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/lihat-semua" element={<LihatSemua />} />
        <Route path="/pencarian" element={<Pencarian />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/detail" element={<Detail />} />
        {/* <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoMatch />} /> */}
      </Routes>

    </AppContext.Provider>
   
    </>
  );
}

export default App;
