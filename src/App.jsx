import { Route, Routes } from "react-router-dom"
import { CssBaseline } from '@mui/material'; // Add this import
import Login from "./pages/Auth/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"


import Dashboard from "./pages/Dashboard/Dashboard"
import Forgotpassword from "./pages/Auth/Forgotpassword"
import Settings from "./pages/Dashboard/Settings"

import ReferalTable from "./pages/Dashboard/ReferalTable"
import Wallet from "./pages/Dashboard/Wallet"
import Overview from "./pages/Dashboard/Overview"

import VerifyEmail from "./pages/Auth/VerifyEmail";
function App() {
  return (
   <>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgotpass" element={<Forgotpassword />} />   
        <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/settings" element={<Settings/>}/>
    <Route path="/referal" element={<ReferalTable />} />
    <Route path="/wallet" element={<Wallet />} />
    <Route path="/overview" element={<Overview />} />
     <Route path="/verify-email" element={<VerifyEmail/>}/>

    </Routes>
   </>
  )
}

export default App