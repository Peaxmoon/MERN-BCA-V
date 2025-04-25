import React, { useState } from 'react';

const ProductReview = ({ reviews = [] }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState(0); // 0 means show all

  // Sort and filter reviews
  const processedReviews = [...reviews]
    .filter(review => filterRating === 0 || Math.round(review.rating) === filterRating)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'highest') {
        return b.rating - a.rating;
      } else if (sortBy === 'lowest') {
        return a.rating - b.rating;
      }
      return 0;
    });

  // Calculate average rating and counts
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  // Count ratings
  const ratingCounts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  reviews.forEach(review => {
    const roundedRating = Math.round(review.rating);
    if (ratingCounts[roundedRating] !== undefined) {
      ratingCounts[roundedRating]++;
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
      
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
          </svg>
          <p className="text-gray-500 text-lg">No reviews available for this product yet.</p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg">
            Be the first to review
          </button>
        </div>
      ) : (
        <>
          {/* Review Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
            {/* Average Rating */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm">Based on {reviews.length} reviews</p>
            </div>
            
            {/* Rating Distribution */}
            <div className="col-span-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Rating Distribution</h3>
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating] || 0;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center mb-2">
                    <div className="flex items-center w-16">
                      <span className="text-sm text-gray-600 mr-2">{rating}</span>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                      <div 
                        className="bg-yellow-400 h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }} 
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500 w-12">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Filters and Sorting */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
              <button 
                className={`px-3 py-1 text-sm rounded-full ${filterRating === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setFilterRating(0)}
              >
                All Reviews
              </button>
              {[5, 4, 3, 2, 1].map(rating => (
                <button 
                  key={rating}
                  className={`px-3 py-1 text-sm rounded-full flex items-center ${filterRating === rating ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setFilterRating(rating)}
                >
                  {rating}
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <label className="text-sm text-gray-600 mr-2">Sort by:</label>
              <select 
                className="text-sm border border-gray-300 rounded-md py-1 px-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>
          
          {/* Reviews List */}
          <div className="space-y-6">
            {processedReviews.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No reviews match your filter criteria.</p>
            ) : (
              processedReviews.map((review, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800">{review.reviewerName}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(review.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded-lg">
                      <span className="text-blue-700 font-semibold mr-1">{review.rating}</span>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  
                  {/* Helpfulness buttons */}
                  <div className="mt-3 flex items-center text-sm">
                    <button className="text-gray-500 hover:text-blue-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                      </svg>
                      Helpful
                    </button>
                    <span className="mx-2 text-gray-300">|</span>
                    <button className="text-gray-500 hover:text-blue-600">
                      Report
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Write a Review Button */}
          <div className="mt-8 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
              Write a Review
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductReview;