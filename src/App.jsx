import { Route, Routes } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Auth/SignUp"
import ResetPassword from "./pages/Auth/ResetPass"
function App() {

  return (
   <>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
   <Route path="/reset-password" element={<ResetPassword/>}/>
  </Routes>
   </>
  )
}

export default App
