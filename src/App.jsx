import { Route, Routes } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"

import ResetPassword from "./pages/Auth/ResetPass"
import Forgotpassword from "./pages/Auth/Forgotpassword"
import Settings from "./pages/Dashboard/Settings"
import ReferalTable from "./pages/Dashboard/ReferalTable"
import Wallet from "./pages/Dashboard/Wallet"
import Overview from "./pages/Dashboard/Overview"
import Dashboard from "./pages/Dashboard/Dashboard"
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
    <Route path="/sign-up" element={<SignUp />} />
   <Route path="/reset-password" element={<ResetPassword/>}/>
    <Route path="/forgot-password" element={<Forgotpassword />} />
    <Route path="/settings" element={<Settings/>}/>
    <Route path="/referal" element={<ReferalTable />} />
    <Route path="/wallet" element={<Wallet />} />
    <Route path="/overview" element={<Overview />} />

    

  </Routes>
   </>
  )
}

export default App
