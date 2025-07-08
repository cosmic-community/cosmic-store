import { Review } from '@/lib/types'
import { Star } from 'lucide-react'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const rating = parseInt(review.metadata.rating.key)
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {review.metadata.review_title}
          </h3>
          <p className="text-sm text-gray-600">
            by {review.metadata.customer_name}
          </p>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {review.metadata.rating.value}
          </span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">
        {review.metadata.review_content}
      </p>
      
      <div className="flex items-center text-sm text-gray-500">
        {review.metadata.verified_purchase && (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-3">
            Verified Purchase
          </span>
        )}
        <span>
          {new Date(review.metadata.review_date).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}