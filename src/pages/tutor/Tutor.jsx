import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBook,
  FaEnvelope,
  FaUser,
  FaVenusMars,
  FaIdCard,
} from "react-icons/fa";
import Loading from "../../components/loading/Loading";
import useAxois from "../../useAxois/useAxois";
import { toast } from "react-toastify";

const Tutor = () => {
  const axoisInstece = useAxois();

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["activeTutors"],
    queryFn: async () => {
      const res = await axoisInstece.get("/tutors/approved");
      return res.data;
    },
  });

  const handleTutorView = () => {
    toast.warn("this event is coming soon ");
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#00E1FF]">
        Active Tutors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <figure>
              <img
                src={tutor.imageURL}
                alt={tutor.name}
                className="w-full h-56 object-cover rounded-t-xl"
              />
            </figure>
            <div className="card-body space-y-2">
              <h2 className="card-title text-xl font-semibold text-cyan-700">
                <FaUser /> {tutor.name}
              </h2>
              <p className="flex items-center gap-2 text-sm">
                <FaEnvelope /> {tutor.email}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <FaBook /> Subject: {tutor.subject}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <FaIdCard /> NID: {tutor.nid}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <FaVenusMars /> Gender: {tutor.gender}
              </p>
              <p className="text-sm text-gray-600">
                Experience: {tutor.experience}
              </p>
              <div className="card-actions justify-end">
                <button
                  onClick={handleTutorView}
                  className="btn btn-outline bg-[#00E1FF] text-black btn-sm"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutor;
