import Login from './components/auth/Login'
import Home from './components/Home'
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store/slice/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()
  const data = JSON.parse(localStorage.getItem('user'))
  const { user } = useSelector(state => state.user)

  useEffect(()=>{
    if(data){
      dispatch(login(data))
    }
  },[])
  
  return (
    <div className="App">
      {
          user.token ? <Home /> : <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      }
      {/* <Home/> */}
    </div>
  );
}

export default App;
