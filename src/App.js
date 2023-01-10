import Login from './components/auth/Login'
import Home from './components/Home'
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector(state => state.user)
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
