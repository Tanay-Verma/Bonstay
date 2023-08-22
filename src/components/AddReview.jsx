import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddReview({ url }) {
  const { hotelId } = useParams();
  const [review, setReview] = useState("");
  const handleSubmit = () => {
    axios.get(`${url}/${hotelId}`).then((res) => {
      let data = res.data;
      data.reviews.push(review);
      axios
        .put(`${url}/${hotelId}`, { ...data })
        .then(() => {
          alert("Review Added");
        })
        .catch(() => {
          alert("Review Could not be added");
        })
        .catch(() => {
          alert("Something went wrong");
        });
    });
  };
  return (
    <div className="grid grid-rows-[20%, 80%] bg-slate-200 p-4 gap-4 rounded-lg w-1/2">
      <div className="font-Lobster text-5xl p-4 text-center">
        Your Review Means a Lot for Us
      </div>
      <div className="grid grid-rows-[10%, 70%, 20%] gap-3">
        <label htmlFor="review" className="font-bold text-lg">
          Add your Review
        </label>
        <textarea
          rows="5"
          className="p-4 text-lg"
          name="review"
          id="review"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button
          className="justify-self-end rounded-lg bg-sky-400 text-sky-50 text-lg font-bold p-3"
          onClick={handleSubmit}
        >
          Add Review
        </button>
      </div>
    </div>
  );
}
