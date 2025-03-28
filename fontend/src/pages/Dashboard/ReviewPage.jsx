import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ReviewForm from "../../components/Review/ReviewForm";
import ReviewList from "../../components/Review/ReviewList";
import DashboardLayout from "../../components/layout/DashboardLayout";

const ReviewPages = () => {
  const [reviews, setReviews] = useState([]); // ✅ Ensure reviews is an array

  useEffect(() => {
    axiosInstance.get("/api/v1/reviews")  // Ensure correct API route
      .then(res => {
        console.log("API response:", res.data); // Debugging log
        if (Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          console.error("API did not return an array:", res.data);
          setReviews([]); // ✅ Default to an empty array
        }
      })
      .catch(err => {
        console.error("Error fetching reviews:", err);
        setReviews([]); // ✅ Default to an empty array on error
      });
  }, []);

  return (<DashboardLayout>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Rate and Review</h1>
      <ReviewForm addReview={setReviews} />
      <ReviewList reviews={reviews} />
    </div>
    </DashboardLayout>
  );
};

export default ReviewPages;
