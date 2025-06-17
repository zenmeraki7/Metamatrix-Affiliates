import { Route, Routes } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Home from "./pages/Home/Home"
import SignUp from "./pages/Auth/SignUp"
import Forgotpassword from "./pages/Auth/Forgotpassword"
function App() {

  return (
   <>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgotpass" element={<Forgotpassword />} />
   
  </Routes>
   </>
  )
}

export default App
