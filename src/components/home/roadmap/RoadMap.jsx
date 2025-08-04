import React, { useEffect } from "react";
import learningPaths from "../../../assets/roadmapDemoData/learningPaths.json";
const RoadMap = () => {
  // console.log(learningPaths);
  return (
    <>
      <h2 className="text-4xl text-[#00E1FF] font-bold mb-6 py-6 text-center">
        Career Roadmaps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {learningPaths.map((learn, idx) => (
          <div
            key={idx}
            className="bg-base-200 shadow-md hover:translate-y-1.5  transition-all duration-300 ease-in-out  rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold  mb-4">{learn.title}</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {learn.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-base-200 text-[#00E1FF] text-sm font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div>
              <h3 className="text-md font-semibold  mb-2">
                Recommended Classes:
              </h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {learn.recommendedClasses.map((cls, index) => (
                  <li key={index}>{cls}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RoadMap;
