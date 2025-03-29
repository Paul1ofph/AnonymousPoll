import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ refreshReviews }) => {
  const [review, setReview] = useState({
    ui: 0,
    anonymity: 0,
    scalability: 0,
    security: 0,
    result: 0,
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const labels = {
    ui: "User Interface",
    anonymity: "Voting Accuracy and Anonymity",
    scalability: "Scalability and Performance",
    security: "Security and Duplicate Votes Prevention",
    result: "Results Presentation",
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   axiosInstance
  //     .get("/api/v1/reviews",  {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       if (res.data && res.data.some(review => review.user === token)) {
  //         setSubmitted(true); // User has submitted a review
  //       }
  //     })
  //     .catch(() => setSubmitted(false))
  //     .finally(() => setLoading(false));
  // }, []);

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
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };


  return (
    <div className="bg-white shadow-md rounded p-6">
      {submitted ? (
        <p className="text-green-500 text-center">✅ Thank you for your feedback.</p>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
          {Object.keys(labels).map((field) => (
            <div key={field} className="mb-3">
              <label className="block mb-3 text-base">{labels[field]}</label>
              <div className="flex gap-1 mb-5 text-lg">
                {[1, 2, 3, 4, 5].map((value) => (
                  <FaStar
                    key={value}
                    className={`cursor-pointer ${review[field] >= value ? "text-yellow-500" : "text-gray-300"}`}
                    onClick={() => handleStarClick(field, value)}
                  />
                ))}
              </div>
            </div>
          ))}
          <textarea
            name="comments"
            placeholder="Additional comments..."
            className="w-full p-2 border rounded mb-3"
            value={review.comments}
            onChange={(e) => setReview({ ...review, comments: e.target.value })}
          />
          <button type="submit" className="w-full bg-primary text-white p-2 rounded">
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
