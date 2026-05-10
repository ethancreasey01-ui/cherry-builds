import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import StickyQuoteBar from "./components/StickyQuoteBar.jsx";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Routes>
      </main>
      <Footer />
      <StickyQuoteBar />
    </>
  );
}
