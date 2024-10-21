import { createRoot } from 'react-dom/client'
import './index.css'
import ContextProvider from './context/context.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/register/Register.tsx'
import NickName from './components/NickName/NickName.tsx'
import Login from './components/Login/Login.tsx'
import Home from './components/home/Home.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/nickname' element={<NickName />}></Route>
        <Route path='/home/:nick' element={<Home />}></Route>
      </Routes>
    </ContextProvider>
  </BrowserRouter>
)
