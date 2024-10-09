

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { children, useEffect, useState } from 'react'
import { useAppStore } from './store'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'


const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />
}

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children
}


function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true)

  const getUserData = async () => {
    try {
      const response = await apiClient.get(GET_USER_INFO, {
        withCredentials: true,
      })
      if (response.status == 201) {
        setUserInfo(response.data)
      } else {
        setUserInfo(undefined)
      }

    }
    catch {
      () => {
        setUserInfo(undefined)
      }
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!userInfo) {
      getUserData();
    } else setLoading(false)
  }, [userInfo, setUserInfo])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          } />


          <Route path="/chat" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>

          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>

          } />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
