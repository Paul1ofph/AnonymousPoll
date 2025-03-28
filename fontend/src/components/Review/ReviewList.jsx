import { FaStar } from "react-icons/fa";

const ReviewList = ({ reviews }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-center mb-4">User Reviews</h2>
      {reviews.length === 0 ? <p className="text-gray-600 text-center">No reviews yet.</p> : null}
      {reviews.map((review) => (
        <div key={review._id} className="bg-gray-100 p-4 mb-3 rounded shadow">
          <p><strong>UI:</strong> {Array(review.ui).fill(<FaStar className="text-yellow-500" />)}</p>
          <p><strong>Anonymity:</strong> {Array(review.anonymity).fill(<FaStar className="text-yellow-500" />)}</p>
          <p><strong>Scalability:</strong> {Array(review.scalability).fill(<FaStar className="text-yellow-500" />)}</p>
          <p className="italic">{review.comments}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
