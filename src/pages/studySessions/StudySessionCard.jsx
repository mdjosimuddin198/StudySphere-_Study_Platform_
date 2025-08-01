import React, { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole/useUserRole";
const StudySessionCard = ({ session }) => {
  const {
    _id,
    sessionTitle,
    tutorImag,
    sessionDescription,
    imageURL,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    sessionDuration,
    tutorName,
    tutorEmail,
    registrationFee,
    status,
  } = session;
  const { logedInuser } = useAuth();
  const { isRoleLoading, isAdmin, isTutor } = useUserRole();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const now = new Date();

  const isUpcoming = new Date(registrationStartDate) > now;
  const isClosed = new Date(registrationEndDate) < now;
  const isNotAllowed = !logedInuser || isAdmin || isTutor;
  const isDisabled = isUpcoming || isClosed || isNotAllowed;

  return (
    <div className="max-w-md mx-auto transition-transform duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg  bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 my-4">
      <img
        src={imageURL}
        alt={sessionTitle}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl text-cyan-600 font-bold mb-2">{sessionTitle}</h2>
        {/* <p className="text-gray-700 mb-3 line-clamp-3">{sessionDescription}</p> */}
        <div className="flex items-center mb-3">
          <img
            src={tutorImag}
            alt={tutorName}
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="font-semibold text-cyan-600">{tutorName}</p>
          </div>
        </div>
        <hr className="border-1 mb-4 border-black" />
        <div className="mb-3 flex items-center justify-between text-sm text-gray-600 space-y-1">
          <button className="text-2xl">
            {registrationFee === 0 ? "Free" : `$${registrationFee}`}
          </button>
          <button className="text-2xl">
            {" "}
            {isUpcoming
              ? "Upcoming"
              : isClosed
              ? "Recorded Session"
              : "Ongoing"}
          </button>
        </div>
        <Link
          to={`/study_session/${_id}`}
          className="btn btn-primary text-white  font-semibold  transition w-full"
        >
          Read More
        </Link>

        {/* Book Now Button */}
      </div>
    </div>
  );
};

export default StudySessionCard;
