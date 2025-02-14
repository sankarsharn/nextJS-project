import { useState } from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Header from './components/Header'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <BrowserRouter classname="light">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      </div>   
    </>
  )
}

export default App
