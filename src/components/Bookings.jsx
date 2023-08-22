import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Bookings({ url, userId }) {
  const [bookingsData, setBookingsData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const deleteBooking = (bookingId) => {
    axios
      .delete(`${url}/${bookingId}`)
      .then(() => {
        alert("Booking deleted");
        setFetch(!fetch);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };
  useEffect(() => {
    axios
      .get(`${url}?userId=${userId}`)
      .then((res) => {
        setBookingsData(res.data);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  });

  return (
    <div className="w-full grid grid-cols-3 gap-8 place-items-center self-start mt-24">
      {bookingsData.map((booking) => {
        return (
          <div
            key={booking.id}
            className="bg-slate-200 grid grid-rows-[10%, 50%, 40%] gap-3 border-black border rounded-lg shadow-lg shadow-black w-3/4 aspect-square p-4 text-center text-lg"
          >
            <div className="font-bold font-Lobster text-2xl self-center">
              B-001
            </div>
            <div className="grid grid-rows-5 gap-2">
              <div className="font-bold">Hotel Name: {booking.hotelName}</div>
              <div className="">
                <span className="font-bold">Start Date:</span>{" "}
                {booking.startDate}
              </div>
              <div className="">
                <span className="font-bold">End Date:</span> {booking.endDate}
              </div>
              <div className="flex justify-around">
                <div className="">
                  <span className="font-bold">No. of Persons:</span>{" "}
                  {booking.noOfPersons}
                </div>
                <div className="">
                  <span className="font-bold">No. of Rooms:</span>{" "}
                  {booking.noOfRooms}
                </div>
              </div>
              <div className="">
                <span className="font-bold">Type of Room:</span>{" "}
                {booking.typeOfRoom}
              </div>
            </div>
            <div className="grid grid-rows-2 gap-2 font-bold">
              <button className="rounded-lg bg-sky-400 text-sky-50 text-lg">
                <Link to={`/reschedule/${booking.id}`}>Reschedule</Link>
              </button>
              <button
                className="rounded-lg bg-sky-400 text-sky-50 text-lg"
                onClick={() => deleteBooking(booking.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
