import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import "./main.css"
import Pagina404 from './components/404.jsx'
import Home from './pages/Home.jsx'
import CryptoGrid from './features/crypto/components/CryptoGrid.jsx'
import CryptoDetail from './features/crypto/components/CryptoDetail.jsx'
import Profile from './features/profile/components/Profile.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import Login from './features/auth/components/Login.jsx'
import Register from './features/auth/components/Register.jsx'

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='perfil' element={<Profile />} />
        </Route>
        <Route path='/criptomonedas' element={<AppLayout />}>
          <Route index element={<CryptoGrid />} />
          <Route path=':id' element={<CryptoDetail />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Pagina404 />} />
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
)
