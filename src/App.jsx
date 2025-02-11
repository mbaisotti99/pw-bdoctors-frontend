import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../pages/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import HomePage from "../pages/HomePage"


function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout/>} path="/">
        <Route index element={<HomePage/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
