import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../pages/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from "../pages/HomePage"
import Doctors from "../pages/Doctors"
import Details from "../pages/Details"


function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout/>} path="/">
        <Route index element={<HomePage/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:id" element={<Details/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
