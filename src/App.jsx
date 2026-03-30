import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginScreen from './LoginScreen'
import Dashboard from './Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}