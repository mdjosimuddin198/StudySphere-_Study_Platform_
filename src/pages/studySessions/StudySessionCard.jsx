import React, { useState } from "react";
import { Link } from "react-router";
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

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 my-4">
      <img
        src={imageURL}
        alt={sessionTitle}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl text-cyan-600 font-bold mb-2">{sessionTitle}</h2>
        <p className="text-gray-700 mb-3 line-clamp-3">{sessionDescription}</p>

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

        <div className="mb-3 text-sm text-gray-600 space-y-1">
          <p>
            <strong>Fee:</strong>{" "}
            <span className="badge badge-secondary">
              {registrationFee === 0 ? "Free" : `$${registrationFee}`}
            </span>
          </p>
        </div>
        <Link
          to={`/study_session/${_id}`}
          className="btn btn-primary text-white font-semibold  transition w-full md:w-auto"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default StudySessionCard;
