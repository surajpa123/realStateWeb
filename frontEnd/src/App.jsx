import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Sign } from "./pages/Sign";
import { SignOut } from "./pages/SignOut";
import { Profile } from "./pages/Profile";
import { Header } from "./components/Header";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/signOut" element={<SignOut />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
