import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";
import Hotels from "./components/Hotels";
import BookRoom from "./components/BookRoom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const urls = {
    users: "http://localhost:3000/users",
    hotels: "http://localhost:3000/hotels",
    bookings: "http://localhost:3000/bookings",
  };

  const [userId, setUserId] = useState("");

  return (
    <>
      <BrowserRouter>
        <div className="bg-[url('/bgPic.jpg')] bg-cover bg-no-repeat bg-center min-h-screen">
          <div className="flex flex-col">
            <Routes>
              <Route
                path="/"
                element={<Navbar userId={userId} setUserId={setUserId} />}
              >
                <Route index element={<Registration url={urls.users} />} />
                <Route
                  path="/login"
                  element={<Login url={urls.users} setUserId={setUserId} />}
                />
                <Route element={<ProtectedRoutes userId={userId} />}>
                  <Route path="/home" element={<Home />} />
                  <Route
                    path="/hotels"
                    element={<Hotels url={urls.hotels} />}
                  />
                  <Route path="/bookRoom/:hotelName" element={<BookRoom/>}/>
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
