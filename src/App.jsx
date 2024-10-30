import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Form from './components/pages/form/Form'
import Movies from './components/pages/page/movie/Movies'
import SingleMovie from './components/pages/page/singlemovie/SingleMovie'
import Book from './components/pages/page/Bookpage/Book'
import Seats from './components/pages/Seats/Seats'
import Bookings from './components/pages/Booking-history.jsx/Bookings'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Movies/>}/>
          <Route path='/addmovie' element={<Form/>} />
          <Route path='/singlemovie/:id' element={<SingleMovie/>}/>
          <Route path='bookpage/:id' element={<Book/>} />
          <Route path='/seats/:id'  element={<Seats/>} />
          <Route path='/bookings' element={<Bookings/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
