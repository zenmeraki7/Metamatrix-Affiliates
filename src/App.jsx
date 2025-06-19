import { Route, Routes } from "react-router-dom"
import { CssBaseline } from '@mui/material'; // Add this import
import Login from "./pages/Auth/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import Dashboard from "./pages/Dashboard/Dashboard"
import Metamatrix_Dashboard from "./pages/Dashboard/Metamatrix_Dashboard"
import Forgotpassword from "./pages/Auth/Forgotpassword"
import Settings from "./pages/Dashboard/Settings"

import ReferalTable from "./pages/Dashboard/ReferalTable"
import VerifyEmail from "./pages/Auth/VerifyEmail";
function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />   
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Metamatrix_Dashboard" element={<Metamatrix_Dashboard/>} />
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/referal" element={<ReferalTable />} />
        <Route path="/verify-email" element={<VerifyEmail/>}/>
  </Routes>
   </>
  )
}

export default App