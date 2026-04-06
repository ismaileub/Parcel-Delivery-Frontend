import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col mx-auto">
      <Navbar />
      <div className="flex-1 pt-16">
        <Outlet />
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
