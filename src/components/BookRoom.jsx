import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function BookRoom({ url, userId }) {
  const firstRender = useRef(true);
  const { hotelName, hotelId } = useParams();

  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    noOfPersons: "",
    noOfRooms: "",
    typeOfRoom: "",
  });

  const [bookingDataError, setBookingDataError] = useState({
    startDate: "",
    endDate: "",
    noOfPersons: "",
    noOfRooms: "",
    typeOfRoom: "",
  });

  const [hover, setHover] = useState({
    startDate: false,
    endDate: false,
    noOfPersons: false,
    noOfRooms: false,
    typeOfRoom: false,
  });

  const [mandatory, setMandatory] = useState(false);
  const [valid, setValid] = useState(false);

  const messages = {
    START_DATE_ERROR: "Start date cannot be before today's date",
    END_DATE_ERROR: "End date cannot be before start date",
    NO_OF_PERSONS_BELOW_ZERO: "Number of persons should be greater than zero",
    NO_OF_PERSONS_ABOVE_FIVE:
      "Number of persons should be less than or equal to five",
    NO_OF_ROOMS_BELOW_ZERO: "Number of persons should be greater than zero",
    NO_OF_ROOMS_ABOVE_THREE:
      "Number of persons should be less than or equal to three",
  };

  const validations = (name, value) => {
    const currDate = new Date();
    switch (name) {
      case "startDate": {
        const startDate = new Date(value);

        if (bookingData.endDate) {
          const endDate = new Date(bookingData.endDate);
          endDate.getTime() < startDate.getTime()
            ? setBookingDataError({
                ...bookingDataError,
                endDate: messages.END_DATE_ERROR,
              })
            : setBookingDataError({ ...bookingDataError, endDate: "" });
        }
        startDate.getTime() < currDate.getTime()
          ? setBookingDataError({
              ...bookingDataError,
              [name]: messages.START_DATE_ERROR,
            })
          : setBookingDataError({ ...bookingDataError, [name]: "" });

        break;
      }
      case "endDate": {
        const endDate = new Date(value);
        if (bookingData.startDate) {
          const startDate = new Date(bookingData.startDate);
          endDate.getTime() < startDate.getTime()
            ? setBookingDataError({
                ...bookingDataError,
                [name]: messages.END_DATE_ERROR,
              })
            : setBookingDataError({ ...bookingDataError, [name]: "" });
        } else {
          endDate.getTime() < currDate.getTime()
            ? setBookingDataError({
                ...bookingDataError,
                [name]: "End date cannot be before today's date",
              })
            : setBookingDataError({ ...bookingDataError, [name]: "" });
        }
        break;
      }
      case "noOfPersons":
        if (value <= 0) {
          setBookingDataError({
            ...bookingDataError,
            [name]: messages.NO_OF_PERSONS_BELOW_ZERO,
          });
        } else if (value > 5) {
          setBookingDataError({
            ...bookingDataError,
            [name]: messages.NO_OF_PERSONS_ABOVE_FIVE,
          });
        } else {
          setBookingDataError({ ...bookingDataError, [name]: "" });
        }
        break;
      case "noOfRooms":
        if (value <= 0) {
          setBookingDataError({
            ...bookingDataError,
            [name]: messages.NO_OF_ROOMS_BELOW_ZERO,
          });
        } else if (value > 3) {
          setBookingDataError({
            ...bookingDataError,
            [name]: messages.NO_OF_ROOMS_ABOVE_THREE,
          });
        } else {
          setBookingDataError({ ...bookingDataError, [name]: "" });
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validations(name, value);
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(url, {
        ...bookingData,
        noOfPersons: Number(bookingData.noOfPersons),
        noOfRooms: Number(bookingData.noOfRooms),
        hotelName,
        hotelId: Number(hotelId),
        userId,
      })
      .then((res) => {
        alert(`Booking created with ID: ${res.data.id}`);
      })
      .catch(() => alert("Something went wrong"));
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (
        bookingDataError.endDate ||
        bookingDataError.noOfPersons ||
        bookingDataError.noOfRooms ||
        bookingDataError.startDate ||
        bookingDataError.typeOfRoom
      ) {
        setValid(false);
      } else {
        setValid(true);
      }
      if (Object.values(bookingData).includes("")) {
        setMandatory(true);
      } else {
        setMandatory(false);
      }
    }
  }, [bookingData, bookingDataError]);

  return (
    <>
      <div className="grid grid-rows-[10%, 90%] w-1/4 rounded-md p-4 gap-10 mx-auto bg-slate-200">
        <h1 className="text-center font-Lobster text-4xl p-4">Book A Room</h1>
        <form
          noValidate
          className="grid grid-rows-6 gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid grid-rows-2 gap-1">
            <label className="text-lg font-bold" htmlFor="startDate">
              Start Date
            </label>
            <div className="grid grid-cols-10 gap-1 relative">
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={bookingData.startDate}
                onChange={handleChange}
                className="rounded-lg p-1 col-span-9"
              />
              {bookingDataError.startDate && (
                <div
                  className="flex justify-center align-middle hover:cursor-pointer"
                  onMouseEnter={() => setHover({ ...hover, startDate: true })}
                  onMouseLeave={() => setHover({ ...hover, startDate: false })}
                >
                  <FontAwesomeIcon
                    icon={faExclamation}
                    beatFade
                    className="text-red-500 text-3xl justify-self-center self-center"
                  />

                  {hover.startDate && (
                    <div className="text-red-400 absolute bg-orange-100 right-1/2 top-1/2 text-justify p-2 rounded-lg">
                      {bookingDataError.startDate}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-rows-2 gap-1">
            <label className="text-lg font-bold" htmlFor="endDate">
              End Date
            </label>
            <div className="grid grid-cols-10 gap-1 relative">
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={bookingData.endDate}
                onChange={handleChange}
                className="rounded-lg p-1 col-span-9"
              />
              {bookingDataError.endDate && (
                <div
                  className="flex justify-center align-middle hover:cursor-pointer"
                  onMouseEnter={() => setHover({ ...hover, endDate: true })}
                  onMouseLeave={() => setHover({ ...hover, endDate: false })}
                >
                  <FontAwesomeIcon
                    icon={faExclamation}
                    beatFade
                    className="text-red-500 text-3xl justify-self-center self-center"
                  />

                  {hover.endDate && (
                    <div className="text-red-400 absolute bg-orange-100 right-1/2 top-1/2 text-justify p-2 rounded-lg">
                      {bookingDataError.endDate}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-rows-2 gap-1">
            <label className="text-lg font-bold" htmlFor="noOfPersons">
              No. of Persons
            </label>
            <div className="grid grid-cols-10 gap-1 relative">
              <input
                type="number"
                name="noOfPersons"
                id="noOfPersons"
                value={bookingData.noOfPersons}
                onChange={handleChange}
                className="rounded-lg p-1 col-span-9"
              />
              {bookingDataError.noOfPersons && (
                <div
                  className="flex justify-center align-middle hover:cursor-pointer"
                  onMouseEnter={() => setHover({ ...hover, noOfPersons: true })}
                  onMouseLeave={() =>
                    setHover({ ...hover, noOfPersons: false })
                  }
                >
                  <FontAwesomeIcon
                    icon={faExclamation}
                    beatFade
                    className="text-red-500 text-3xl justify-self-center self-center"
                  />

                  {hover.noOfPersons && (
                    <div className="text-red-400 absolute bg-orange-100 right-1/2 top-1/2 text-justify p-2 rounded-lg">
                      {bookingDataError.noOfPersons}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-rows-2 gap-1">
            <label className="text-lg font-bold" htmlFor="noOfRooms">
              No. of Rooms
            </label>
            <div className="grid grid-cols-10 gap-1 relative">
              <input
                type="number"
                name="noOfRooms"
                id="noOfRooms"
                value={bookingData.noOfRooms}
                onChange={handleChange}
                className="rounded-lg p-1 col-span-9"
              />
              {bookingDataError.noOfRooms && (
                <div
                  className="flex justify-center align-middle hover:cursor-pointer"
                  onMouseEnter={() => setHover({ ...hover, noOfRooms: true })}
                  onMouseLeave={() => setHover({ ...hover, noOfRooms: false })}
                >
                  <FontAwesomeIcon
                    icon={faExclamation}
                    beatFade
                    className="text-red-500 text-3xl justify-self-center self-center"
                  />

                  {hover.noOfRooms && (
                    <div className="text-red-400 absolute bg-orange-100 right-1/2 top-1/2 text-justify p-2 rounded-lg">
                      {bookingDataError.noOfRooms}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-rows-2 gap-1">
            <label className="text-lg font-bold" htmlFor="typeOfRoom">
              Type of Room
            </label>
            <div className="grid grid-cols-10 gap-1 relative">
              <select
                className="rounded-lg p-1 col-span-9"
                name="typeOfRoom"
                id="typeOfRoom"
                onChange={handleChange}
              >
                <option disabled selected>
                  --Select Room Type--
                </option>
                <option value="AC">AC</option>
                <option value="Non AC">Non AC</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center p-3">
            <button
              type="submit"
              className="rounded-lg bg-sky-400 text-sky-50 text-lg font-bold disabled:bg-slate-500 w-full"
              disabled={!(valid && !mandatory)}
            >
              Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
