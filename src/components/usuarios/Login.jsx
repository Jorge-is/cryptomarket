import axios from "axios"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./Login.css"

function Login() {

  const USERS_API_URL = import.meta.env.VITE_USERS_API_URL
  const USERS_API_KEY = import.meta.env.VITE_USERS_API_KEY

  const navigation = useNavigate()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState()

  const submit = (e) => {
    e.preventDefault()
    setCargando(true)
    setError(null)

    axios.post(
      USERS_API_URL, 
      user, 
      {
        headers: {
          Authorization: `Bearer ${USERS_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      setCargando(false)
      localStorage.setItem("tokenCriptoMarket", response.data.data)
      navigation("/")
    })
    .catch(error => {
      setCargando(false)
      console.error(error)
      setError(error.response?.data?.error || "Credenciales incorrectas")
    })
  }

  if (localStorage.getItem("tokenCriptoMarket")) return <Navigate to="/" />

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="email">Correo Electrónico</label>
          <input required onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value
            })
          }} type="email" name="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <input required onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value
            })
          }} type="password" name="password" />
        </div>
        <div className="submit">
          <input
            type="submit"
            value={cargando ? "cargando..." : "Ingresar"}
            className="link"
          />
        </div>
      </form>
      {
        error && <span className="error">{error}</span>
      }
    </div>
  )
}

export default Login
