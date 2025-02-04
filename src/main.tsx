import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/register/Register.tsx'
import NickName from './components/NickName/NickName.tsx'
import Login from './components/Login/Login.tsx'
import Home from './components/home/Home.tsx'
import AuthListenerProvider from './auth/AuthListener.tsx'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <AuthListenerProvider>
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/nickname' element={<NickName />}></Route>
        <Route path='/home/:nick' element={<Home />}></Route>
      </Routes>
    </AuthListenerProvider>
  </BrowserRouter>
)
