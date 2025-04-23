import React from 'react'

const ProductReview = ({ reviews }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews available.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{review.reviewerName}</h3>
              <span className="text-yellow-500 font-medium">⭐ {review.rating}/5</span>
            </div>
            <p className="text-gray-700 italic">"{review.comment}"</p>
            <p className="text-xs text-gray-400 mt-2">{new Date(review.date).toDateString()}</p>
          </div>

        ))
      )}
    </div>
  )
}

export default ProductReview