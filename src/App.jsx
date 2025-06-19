import { Route, Routes } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import ResetPassword from "./pages/Auth/ResetPass"
import Forgotpassword from "./pages/Auth/Forgotpassword"
import ReferalTable from "./pages/ReferalTable"
function App() {

  return (
   <>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/sign-up" element={<SignUp />} />
   <Route path="/reset-password" element={<ResetPassword/>}/>
    <Route path="/forgot-password" element={<Forgotpassword />} />
    <Route path="/referal" element={<ReferalTable />} />

  </Routes>
   </>
  )
}

export default App
