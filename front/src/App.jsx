import{BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home'
import Rover from './pages/rover'

function App() {

return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/rover' element={<Rover/>}/>
        </Routes>
    </BrowserRouter>
  )
}
export default App
