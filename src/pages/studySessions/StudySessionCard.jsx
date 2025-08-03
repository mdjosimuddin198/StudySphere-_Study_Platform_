import React, { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole/useUserRole";
import { useQuery } from "@tanstack/react-query";
import useAxois from "../../useAxois/useAxois";
import { FaStar } from "react-icons/fa";
import { FaBookOpen, FaUserGraduate } from "react-icons/fa6";
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

  const axoisInstece = useAxois();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", _id],
    queryFn: async () => {
      const res = await axoisInstece.get(`/reviews?sessionId=${_id}`);
      return res.data;
    },
  });

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No rating";

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
    <div className="max-w-md mx-auto  bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 my-4">
      <img
        src={imageURL}
        alt={sessionTitle}
        className="w-full h-48 transition-all duration-300 ease-in-out  hover:scale-110 hover:shadow-lg object-cover"
      />

      <div className="p-4">
        <div className="badge bg-[#00E1FF70] text-black my-3 badge-outline">
          {session?.sessionCatagory}
        </div>
        <h2 className="text-xl w-full h-14 text-black font-bold  leading-snug line-clamp-2 mb-2">
          {sessionTitle}
        </h2>

        <div className="flex items-center text-gray-500 py-2 justify-between">
          <p className="flex items-center gap-3">
            <FaBookOpen /> Lessons {session.lessons}
          </p>
          <p className="flex items-center gap-3">
            <FaUserGraduate /> coming soon
          </p>
        </div>

        {/* <p className="text-gray-700 mb-3 line-clamp-3">{sessionDescription}</p> */}
        <div className="flex items-center mb-3">
          <img
            src={tutorImag}
            alt={tutorName}
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="font-semibold text-[#00E1FF]">{tutorName}</p>
            <p className="text-[#00E1FF] flex items-center gap-1">
              <FaStar /> {averageRating}
            </p>
          </div>
        </div>
        <hr className="border opacity-5 mb-4 border-black" />
        <div className="mb-3 flex items-center justify-between text-sm text-gray-600 space-y-1">
          <button className="text-2xl font-bold">
            <span className=" font-semibold">Price : </span>
            {registrationFee === 0 ? "Free" : `$${registrationFee}`}
          </button>
          {/* <button className="text-2xl">
            {" "}
            {isUpcoming
              ? "Upcoming"
              : isClosed
              ? "Recorded Session"
              : "Ongoing"}
          </button> */}
        </div>
        <Link
          to={`/study_session/${_id}`}
          className="btn btn-outline hover:border-[#07A698] hover:bg-white text-black font-semibold  transition w-full"
        >
          Enroll Now
        </Link>

        {/* Book Now Button */}
      </div>
    </div>
  );
};

export default StudySessionCard;
