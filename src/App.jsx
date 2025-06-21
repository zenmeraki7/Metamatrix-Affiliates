import { Route, Routes } from "react-router-dom"
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
import ResetPassword from "./pages/Auth/Resetpassword"

function App() {
  return (
   <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />   
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/referal" element={<ReferalTable />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/wallet" element={<Wallet />} />
         <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/reset-password" element={<ResetPassword/>} />
  </Routes>
   </>
  )
}

export default App