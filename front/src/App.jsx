import{BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home'
import Rover from './pages/rover'
import { useState, useEffect } from 'react'
import {io} from 'socket.io-client'
import axios from 'axios'

function App() {


  const [id, setId] = useState(null)
  
useEffect(() => {
  const socket = io('http://localhost:3000')

  socket.on('connect', () => {
    setId(socket.id)
  })
  socket.on('getSession', async(id) => {
    console.log(id)
  })
  socket.on('roverPosition', (data) => {
    console.log(data)
  })

  // Cleanup the socket connection on unmount
  return () => {
    socket.disconnect()
  }
}, [])

  return (
    // <BrowserRouter>
    //     <Routes>
    //       <Route index element={<Home/>}/>
    //       <Route path='/rover' element={<Rover/>}/>
    //     </Routes>
    // </BrowserRouter>
    <>
    {id && <p>{id}</p>}
    </>
  )
}

export default App
