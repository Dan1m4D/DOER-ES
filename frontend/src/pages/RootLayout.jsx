import { Outlet } from "react-router-dom"
import AppNavbar from "../components/Navbar"
import Footer from "../components/Footer"

const RootLayout = () => {
  return (
    <section className="flex flex-col min-h-screen">
        <AppNavbar />
            <Outlet />
        <Footer />
    </section>
  )
}

export default RootLayout
