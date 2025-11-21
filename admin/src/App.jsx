import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Bookings from './pages/Bookings'
import Destinations from './pages/Destinations'
import AddDestination from './pages/AddDestination'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoutes'

function App() {

  return (
    <Routes >
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
      <Route path="/destinations" element={<ProtectedRoute><Destinations /></ProtectedRoute>} />
      <Route path="/add-destination" element={<ProtectedRoute><AddDestination /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
