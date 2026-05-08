import { Routes, Route } from 'react-router-dom'
import WomanHome from './pages/WomanHome'
import WomanCollection from './pages/WomanCollection'
import WomanContact from './pages/WomanContact'
import WomanNav from './components/WomanNav'

function App() {
  return (
    <>
      <WomanNav />
      <Routes>
        <Route path="/" element={<WomanHome />} />
        <Route path="/collection" element={<WomanCollection />} />
        <Route path="/contact" element={<WomanContact />} />
        <Route path="*" element={<WomanHome />} />
      </Routes>
    </>
  )
}

export default App
