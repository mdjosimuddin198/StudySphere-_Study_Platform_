import React from "react";
import CountUp from "react-countup";

const Overview = () => {
  return (
    <div>
      <h2 className="mb-6 text-center text-3xl font font-bold text-[#00E1FF]">
        Powering Progress in Online Learning
      </h2>
      <p className="text-center">
        Explore how EduNite is growing with active users, engaging classes, and
        student enrollments
      </p>
      <div className="flex items-center my-6 justify-center flex-col md:flex-row gap-4">
        <div className="card md:w-md  w-full   bg-base-200  card-md shadow-sm">
          <div className="card-body flex items-center justify-center text-center">
            <h2 className="card-title">Total Users</h2>
            <p className="text-2xl font-bold text-[#00E1FF]">
              <CountUp end={30} duration={6}></CountUp>
            </p>
          </div>
        </div>
        <div className="card md:w-md  w-full bg-base-200 card-md shadow-sm">
          <div className="card-body flex items-center justify-center">
            <h2 className="card-title">Total Classes</h2>
            <p className="text-2xl font-bold text-[#00E1FF]">
              <CountUp end={60} duration={6}></CountUp>
            </p>
          </div>
        </div>
        <div className="card  md:w-md  w-full bg-base-200 card-md shadow-sm">
          <div className="card-body flex items-center justify-center">
            <h2 className="card-title">Total Enrollments</h2>
            <p className="text-2xl font-bold text-[#00E1FF]">
              <CountUp end={10} duration={6}></CountUp>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
