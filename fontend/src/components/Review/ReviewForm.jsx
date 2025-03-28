import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ refreshReviews }) => {
  const [review, setReview] = useState({
    ui: 0,
    anonymity: 0,
    scalability: 0,
    comments: "",
  });

  const handleStarClick = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post("/api/v1/reviews", review, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshReviews();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
      {["ui", "anonymity", "scalability"].map((field) => (
        <div key={field} className="mb-3">
          <label className="block">{field.toUpperCase()}</label>
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              className={`cursor-pointer ${review[field] >= value ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => handleStarClick(field, value)}
            />
          ))}
        </div>
      ))}
      <textarea name="comments" placeholder="Additional comments..."
        className="w-full p-2 border rounded mb-3" value={review.comments}
        onChange={(e) => setReview({ ...review, comments: e.target.value })}
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
