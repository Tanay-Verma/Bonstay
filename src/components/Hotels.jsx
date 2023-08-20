import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hotels({ url }) {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setHotels(res.data);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }, [url]);

  return (
    <>
      <div className="w-full p-4 h-full flex flex-col gap-10">
        {hotels.map((hotel) => {
          return (
            <div
              key={hotel.id}
              className="flex justify-between w-3/4 mx-auto bg-slate-200 rounded-md"
            >
              <div className="border w-1/5 flex justify-center items-center">
                <div
                  className={`w-3/4 aspect-square bg-[url(/${hotel.imageUrl})] bg-cover bg-center bg-no-repeat rounded-full  border-4 border-slate-800 shadow-2xl shadow-slate-800`}
                ></div>
              </div>
              <div className="grid grid-rows-5 gap-2 border w-3/5">
                <div className="text-3xl font-semibold">{hotel.hotelName}</div>
                <div>City : {hotel.city}</div>
                <div>Amenities: {hotel.amenities}</div>
                <div>Address : {hotel.address}</div>
                <div>Contacts No : {hotel.phoneNo}</div>
              </div>
              <div className="border w-1/5 grid grid-crows-3 p-4 gap-2">
                <button className="rounded-lg bg-sky-400 text-sky-50 text-lg font-bold">
                  <Link to={`/bookRoom/${hotel.hotelName}`}>Book A Room</Link>
                </button>
                <button className="rounded-lg bg-sky-400 text-sky-50 text-lg font-bold">
                  Add Review
                </button>
                <button className="rounded-lg bg-sky-400 text-sky-50 text-lg font-bold">
                  View Review
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
