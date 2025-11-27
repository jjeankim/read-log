import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

const StarRating = ({rating}:StarRatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < rating;
        return (
          <Star
            key={i}
            size={30}
            className={filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        );
      })}
    </div>
  )
}

export default StarRating