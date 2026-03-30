import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginScreen from './LoginScreen'
import Dashboard from './Dashboard'
import Projects from './Projects'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )
}