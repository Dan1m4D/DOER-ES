import { useState } from "react";
import AppNavbar from "./components/Navbar";
import Hero from "./components/Hero.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppNavbar />
      <Hero />
    </>
  );
}

export default App;
