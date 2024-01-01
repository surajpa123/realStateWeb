import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { SignUp } from "./pages/SignUp";
import { SignOut } from "./pages/SignOut";
import { Profile } from "./pages/Profile";
import { Header } from "./components/Header";
import { SignIn } from "./pages/SignIn";
import { PrivateRoute } from "./components/PrivateRoute";
import  CreateListing  from "./pages/CreateListing";
import { Listing } from "./pages/Listing";
import { Search } from "./pages/Search";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signOut" element={<SignOut />} />
          <Route element = {<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/listing/:listingId" element={<Listing/>} />
          <Route path="/create-listing" element={<CreateListing/>} />
          </Route>
          <Route path="/signin"  element= {<SignIn/>}/>
          <Route path="/search" element = {<Search/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
