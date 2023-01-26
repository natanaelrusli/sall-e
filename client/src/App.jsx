import React from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'

import logo from './assets/logo.svg'
import { Home, CreatePost } from './pages'

import './App.scss'

function App() {  
  return (
    <BrowserRouter>
      <div className='app'>
        <header className='app__header'>
          <Link to='/' onClick={() => setPage('home')}>
            <img src={logo} alt='logo' className='app__header_img' />
          </Link>
          {
            window.location.pathname !== '/create-post' && (
              <Link to='/create-post' className='app__header_btn'>
                Create
              </Link>
            )
          }
        </header>

        <main className='app__main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
