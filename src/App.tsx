import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
