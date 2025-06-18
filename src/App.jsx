import { Route, Routes } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import Forgotpassword from "./pages/Auth/Forgotpassword"
import ResetPassword from "./pages/Auth/ResetPass"
import Dashboard from "./pages/Dashboard/Dashboard"
import Navbox from "./pages/Dashboard/Navbox"
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
        <Route path="/navbox" element={<Navbox/>} />

  </Routes>
   </>
  )
}

export default App
