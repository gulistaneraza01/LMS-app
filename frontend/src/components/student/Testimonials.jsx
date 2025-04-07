import { assets, dummyTestimonial } from "../../assets/assets";

function Testimonials() {
  return (
    <div className="text-center my-20 sm:my-25">
      <h3 className="text-2xl md:text-3xl text-gray-800 font-medium mb-5">
        Testimonials
      </h3>
      <p className="text-sm md:text-base text-gray-500  ">
        Hear from our learners as they share their journeys of transformation,
        success, and how our
        <br className="max-sm:hidden" /> platform has made a difference in their
        lives.
      </p>
      <div className="flex justify-center flex-wrap my-10 sm:my-16 gap-5 sm:gap-8 md:gap-12">
        {dummyTestimonial.map((item) => {
          return (
            <div
              key={item._id}
              className="border border-gray-500/30 rounded-lg w-70 shadow"
            >
              <div className="flex justify-center items-center bg-gray-500/10 p-4 gap-3 rounded-t-lg">
                <div>
                  <img
                    src={item.image}
                    alt="review image"
                    className="w-12 h-12"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-gray-800/80 text-sm">{item.role}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5 text-start">
                <div className="flex">
                  {[...Array(5)].map((i, index) => {
                    return (
                      <img
                        src={
                          index < Math.floor(item.rating)
                            ? assets.star
                            : assets.star_blank
                        }
                        alt="star"
                        key={index}
                        className="w-5 h-5"
                      />
                    );
                  })}
                </div>
                <p className="my-5 text-gray-500 text-sm">{item.feedback}</p>
                <a
                  href="#"
                  className="text-blue-400 text-sm underline cursor-pointer"
                >
                  Read more
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Testimonials;
