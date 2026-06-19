import React from "react";

const HomeScreen: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-600 shadow-sm p-4 bg-white rounded-lg mb-4">
          ClickCraft Home Page 🚀
        </h1>
        <p className="text-gray-600">Landing page</p>
      </div>
    </div>
  );
};

export default HomeScreen;
