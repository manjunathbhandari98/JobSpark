import { Star, StarIcon } from "lucide-react";
import avatar from "../../assets/Images/avatar.png";
import { testimonials } from "../../data/Data";
import { Rating } from "@mantine/core";

const Testimonials = () => {
  return (
    <div className="py-16 px-6 mt-20">
      <div className="text-center text-4xl font-bold [&>span]:text-green-500">
        What <span>User</span> says about us?
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-7 justify-center items-center mt-15">
        {testimonials.map((data, index) => (
          <div
            key={index}
            className="border border-green-500 rounded-2xl p-3"
          >
            <div className="flex gap-4">
              <div>
                <img
                  src={avatar}
                  alt=""
                  className="h-15 w-15 rounded-full"
                />
              </div>
              <div>
                <div className="font-bold text-xl">
                  {data.name}
                </div>
                <div>
                  <Rating
                    defaultValue={data.rating}
                  />
                </div>
              </div>
            </div>
            <div className="text-sm mt-2">
              {data.testimonial}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
