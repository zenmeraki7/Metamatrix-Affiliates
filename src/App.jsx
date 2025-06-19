import { Route, Routes } from "react-router-dom"
import { CssBaseline } from '@mui/material'; // Add this import
import Login from "./pages/Auth/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import Dashboard from "./pages/Dashboard/Dashboard"
import Metamatrix_Dashboard from "./pages/Dashboard/Metamatrix_Dashboard"
import ResetPassword from "./pages/Auth/ResetPass"
import Forgotpassword from "./pages/Auth/Forgotpassword"
import Settings from "./pages/Dashboard/Settings"

function App() {
  return (
    <>
      <CssBaseline /> {/* Add this line */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpass" element={<Forgotpassword />} />   
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Metamatrix_Dashboard" element={<Metamatrix_Dashboard/>} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </>
  )
}

export default App