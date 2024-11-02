import React from 'react'
import App from '../App'
import AppNavbar from '../components/Navbar'

const Layout = ({children}) => {
  return (
    <>
    <AppNavbar/>
    {children}
      
    </>
  )
}

export default Layout
