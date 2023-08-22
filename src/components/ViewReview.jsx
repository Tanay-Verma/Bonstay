import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"

export default function ViewReview({ url }) {
  const { hotelId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get(`${url}/${hotelId}`)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }, [hotelId, url]);

  return (
    <div className="self-start mt-24 bg-slate-200 p-10 grid grid-rows-[20%, 80%] gap-4 w-1/2 text-center rounded-lg">
        <div className="font-Lobster text-5xl p-4">{"Customers' Reviews"}</div>
        <div className="flex flex-col gap-3">
            {reviews.map((review, i) => {
                return (<div key={i} className="shadow-md shadow-black p-4 rounded-lg font-bold text-lg">{review}</div>)
            })}
        </div>
    </div>
  );
}
