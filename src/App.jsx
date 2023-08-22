import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";
import Hotels from "./components/Hotels";
import BookRoom from "./components/BookRoom";
import Bookings from "./components/Bookings";
import ViewReview from "./components/ViewReview";
import AddReview from "./components/AddReview";
import Reschedule from "./components/Reschedule";
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
                  <Route
                    path="/bookRoom/:hotelName/:hotelId"
                    element={<BookRoom url={urls.bookings} userId={userId} />}
                  />
                  <Route
                    path="/addReview/:hotelName/:hotelId"
                    element={<AddReview url={urls.hotels} />}
                  />
                  <Route
                    path="/viewReview/:hotelName/:hotelId"
                    element={<ViewReview url={urls.hotels} />}
                  />
                  <Route
                    path="/bookings"
                    element={<Bookings userId={userId} url={urls.bookings} />}
                  />
                  <Route
                  path="/reschedule/:bookingId"
                  element={<Reschedule url={urls.bookings}/>}
                  />
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
