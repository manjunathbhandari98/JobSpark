const NewsLetter = () => {
  return (
    <div className="py-10 px-4 sm:px-10 lg:px-20">
      <div className="bg-gray-700 rounded-lg flex flex-col lg:flex-row justify-between items-center gap-6 p-6">
        {/* Text */}
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left [&>span]:text-green-500 max-w-xl">
          Never Want to Miss Any{" "}
          <span>Job News?</span>
        </div>

        {/* Input + Button */}
        <div className="w-full lg:w-[45%] flex flex-col sm:flex-row bg-gray-600 rounded-xl overflow-hidden text-lg font-semibold">
          <input
            type="text"
            placeholder="yourmail@mail.com"
            className="flex-grow px-4 py-3 outline-none text-base"
          />
          <button className="bg-green-500 text-white px-6 py-3 hover:bg-green-600 transition-all w-full sm:w-auto">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
