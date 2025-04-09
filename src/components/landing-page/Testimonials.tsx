import avatar from "../../assets/Images/avatar.png";
import { testimonials } from "../../data/Data";
import { Rating } from "@mantine/core";

const Testimonials = () => {
  return (
    <div className="py-16 px-4 sm:px-10 lg:px-20 mt-20">
      <div className="text-center text-2xl sm:text-3xl md:text-4xl font-bold [&>span]:text-green-500">
        What <span>Users</span> Say About Us?
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {testimonials.map((data, index) => (
          <div
            key={index}
            className="border border-green-500 rounded-2xl p-5 shadow hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt="User Avatar"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-lg">
                  {data.name}
                </div>
                <Rating
                  defaultValue={data.rating}
                />
              </div>
            </div>
            <p className="text-sm text-gray-300 mt-4">
              {data.testimonial}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
