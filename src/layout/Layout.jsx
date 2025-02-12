// DATA
import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import FilterButtons from "../components/FilterBtn"

// PAGE LAYOUT
const Layout = () => {
    return (
        <>
            <NavBar />
            <FilterButtons />
            <Outlet />
            <footer>Questo è footer</footer>
        </>
    )
}

// EXPORT
export default Layout