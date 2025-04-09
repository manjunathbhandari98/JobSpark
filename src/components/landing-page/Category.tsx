import { jobCategory } from "../../data/Data";

const Category = () => {
  return (
    <div className="mt-3 px-4 sm:px-6 lg:px-10 py-6">
      {/* Heading */}
      <div className="text-3xl sm:text-4xl font-bold text-center">
        Browse By Category
      </div>
      <div className="text-center py-3 text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
        Explore diverse job opportunities tailored
        to your skills. Start your career journey
        today!
      </div>

      {/* Job Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {jobCategory.map((category, index) => (
          <div
            key={index}
            className="flex flex-col cursor-pointer justify-center items-center w-full sm:w-64 h-60 sm:h-64 border border-green-500 rounded-lg p-5 text-center shadow-md 
                       transition-all duration-300 hover:scale-105 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/50 hover:backdrop-blur-lg"
          >
            {/* Icon */}
            <div className="p-3 bg-green-500 rounded-full flex justify-center items-center w-14 h-14">
              <img
                src={`/Category/${category.name}.png`}
                alt={category.name}
                className="h-8 w-8"
              />
            </div>

            {/* Content */}
            <div className="mt-3 font-semibold text-lg">
              {category.name}
            </div>
            <div className="text-gray-500 text-sm mt-1">
              {category.desc}
            </div>
            <div className="text-green-600 font-semibold mt-2">
              {category.jobs}+ new jobs posted
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
