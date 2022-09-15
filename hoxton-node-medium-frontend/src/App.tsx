
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { SinglePostPage } from './pages/SinglePostPage'
import { Users } from './components/Users'


function App() {
 
  return (
    <div className="App">
      < Users />
      <Routes>
      <Route index element={<Navigate to="/home" />} />
      <Route path="/home" element= {<Home />} />
      <Route path="/posts/:id" element={<SinglePostPage />} />
        </Routes>
      
    </div>
  )
}

export default App
