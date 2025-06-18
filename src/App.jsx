import { Route, Routes } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import Forgotpassword from "./pages/Auth/Forgotpassword"
import ResetPassword from "./pages/Auth/ResetPass"
import Dashboard from "./pages/Dashboard/Dashboard"

import Metamatrix_Dashboard from "./pages/Dashboard/Metamatrix_Dashboard"
function App() {

  return (
   <>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgotpass" element={<Forgotpassword />} />   
   <Route path="/reset-password" element={<ResetPassword/>}/>
    <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Metamatrix_Dashboard" element={<Metamatrix_Dashboard/>} />

  </Routes>
   </>
  )
}

export default App
