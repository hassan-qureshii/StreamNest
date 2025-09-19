import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import { Route, Routes } from 'react-router-dom'  
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Video/:categoryId/:videoId' element={<Video />} />
      </Routes>
    </div>
  )
}

export default App;
