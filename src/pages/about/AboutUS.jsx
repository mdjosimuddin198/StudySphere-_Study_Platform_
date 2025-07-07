import React from "react";

const AboutUS = () => {
  return (
    <section className="py-12 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-cyan-600">About Us</h2>
        <p className="text-lg mb-8 ">
          Welcome to{" "}
          <span className="font-semibold text-cyan-600">StudySphere</span>, your
          collaborative study companion designed to bring students, tutors, and
          administrators together on a single, streamlined platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="text-2xl font-semibold text-cyan-600 mb-2">
                Our Mission
              </h3>
              <p>
                To simplify study session scheduling, resource sharing, and
                enhance collaboration in modern education.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="text-2xl font-semibold text-cyan-600 mb-2">
                Our Vision
              </h3>
              <p>
                To empower students, tutors, and administrators with a flexible,
                user-friendly, and secure learning platform.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="text-2xl font-semibold text-cyan-600 mb-2">
                Our Goal
              </h3>
              <p>
                Build a collaborative environment where education is accessible,
                efficient, and engaging for everyone.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button className="btn btn-primary">Join Us</button>
        </div>
      </div>
    </section>
  );
};

export default AboutUS;
