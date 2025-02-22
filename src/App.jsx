import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import Doctors from "./pages/Doctors";
import Details from "./pages/Details";
import FormRegistrazione from "./pages/FormRegistrazione";
import { useState } from "react";

const PageDetailsProvider = () => {
  const [activePage, setActivePage] = useState("")
  return <Details 
  activePage = {activePage}
  setActivePage = {setActivePage}
  />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/medici" element={<Doctors />} />
          <Route path="/medici/:slug" element={<PageDetailsProvider />} />
          <Route path="/registrati" element={<FormRegistrazione />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
