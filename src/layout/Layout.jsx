// DATA
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

// PAGE LAYOUT
const Layout = () => {
    return(
        <>
            <NavBar/>
            <Outlet/>
            <footer>Questo è footer</footer>
        </>
    )
}

// EXPORT
export default Layout