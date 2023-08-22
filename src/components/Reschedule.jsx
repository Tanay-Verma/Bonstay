import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Reschedule({url}) {
  const [reschedule, setReschedule] = useState({
    startDate:"",
    endDate:""
  });

  const {bookingId} = useParams(); 

  const handleChange = (e) => {
    const {name, value} = e.target;
    setReschedule({...reschedule, [name]:value})
  };

  const handleReschedule = () => {
    axios.get(`${url}/${bookingId}`)
    .then((res) => {
        const data = res.data;
        let newData = {...data, startDate: reschedule.startDate, endDate:reschedule.endDate};
        axios.put(`${url}/${bookingId}`, {...newData})
        .then((res) => {
            alert("Rescheduled the date for booking ID: "+res.data.id);
        })
        .catch(() => {
            alert("Reschedule failed");
        })
    })
    .catch(() => {
        alert("Something went wrong")
    })
  }


  return (
    <div className="grid grid-rows-[20%, 80%] gap-4 bg-slate-200 w-1/4 p-10 rounded-lg">
      <div className="font-Lobster text-4xl text-center">Book a Room</div>
      <div className="grid grid-rows-3 gap-5">
        <div className="grid grid-rows-2 gap-2">
          <label htmlFor="startDate">Start Date</label>
          <input
            name="startDate"
            id="startDate"
            value={reschedule.startDate}
            type="date"
            onChange={handleChange}
            className="rounded-lg p-1"
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <label htmlFor="endDate">End Date</label>
          <input
            name="endDate"
            id="endDate"
            value={reschedule.endDate}
            type="date"
            onChange={handleChange}
            className="rounded-lg p-1"
          />
        </div>
        <div className="">
            <button className="rounded-lg bg-sky-400 text-sky-50 text-lg font-bold p-3 w-full" onClick={handleReschedule}>
              Reschedule
            </button>
        </div>
      </div>
    </div>
  );
}
