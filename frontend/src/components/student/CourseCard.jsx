import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { currency } from "../../utils/constaints";
import { useAppContext } from "../../contexts/AppProvider";

function CourseCard({
  _id,
  courseThumbnail,
  courseTitle,
  courseRatings,
  coursePrice,
  educator,
  discount,
}) {
  const { calAvgRating } = useAppContext();
  const avgrating = calAvgRating(courseRatings);

  return (
    <Link
      to={`/course/${_id}`}
      onChange={() => scrollTo(0, 0)}
      className="pb-6 overflow-hidden rounded-lg border border-gray-500"
    >
      <img src={courseThumbnail} alt="course thumbnail" className="w-full" />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{courseTitle}</h3>
        <p className="text-base text-gray-500">{educator}</p>
        <div className="flex items-center gap-2">
          <p>{avgrating}</p>
          <div className="flex">
            {[...Array(5)].map((item, index) => {
              return (
                <img
                  src={
                    index < Math.floor(avgrating)
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                  key={index}
                  className="w-3.5 h-3.5"
                />
              );
            })}
          </div>
          <p className="text-base text-gray-500">({courseRatings.length})</p>
        </div>
        <p>
          <span className="font-semibold text-gray-800">
            {currency}
            {(coursePrice - (coursePrice * discount) / 100).toFixed(2)}
          </span>
          <span className="line-through text-gray-500 text-sm mx-1">
            {currency}
            {coursePrice}
          </span>
          <span className="text-sm text-gray-500">{discount}% off</span>
        </p>
      </div>
    </Link>
  );
}

export default CourseCard;
