// DATA
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"

// PAGE LAYOUT
const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

// EXPORT
export default Layout