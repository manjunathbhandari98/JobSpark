const NewsLetter = () => {
  return (
    <div className="py-20 px-20">
      <div className="bg-gray-700 rounded-lg flex justify-around p-3">
        <div className="w-[38%] text-4xl font-bold text-center [&>span]:text-green-500">
          Never Wants to Miss Any{" "}
          <span>Job News?</span>
        </div>
        <div className="w-[45%] flex bg-gray-600 rounded-xl p-3 text-2xl font-semibold">
          <input
            type="text"
            placeholder="yourmail@mail.com"
            className="flex-grow px-4 py-2 w-[70%] rounded-l-lg outline-none "
          />
          <button className="bg-green-500 w-[30%] text-center text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
