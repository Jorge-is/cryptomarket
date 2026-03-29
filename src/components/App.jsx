import { Navigate, Outlet } from "react-router-dom";
import Menu from "./menu/Menu";
import "./App.css"

function App() {

  if (!localStorage.getItem("tokenCriptoMarket")) return <Navigate to="/login" />

  return (
    <div className="app-container">
      <Menu />
      <Outlet/>
    </div>
  )
}

export default App
