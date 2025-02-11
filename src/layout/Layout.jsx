import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const Layout = () => {
    return(
        <>
            <NavBar/>
            <Outlet/>
            <footer>Questo è footer</footer>
        </>
    )
}

export default Layout