import React from "react";
import Homecon from "../components/Homecon";
import Page1foot from "../components/Page1foot";
import "../styles/Page1.css";

const Page1 = () => {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-yellow-400 flex flex-col items-center min-h-screen relative">
      <Homecon />
      

      <div className="w-full absolute bottom-5">
        <Page1foot />
      </div>
    </div>
  );
};

export default Page1;
