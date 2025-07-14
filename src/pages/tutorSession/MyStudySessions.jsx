import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import Loading from "../../components/loading/Loading";
import useAxois from "../../useAxois/useAxois";
import UploadMaterialModal from "./UploadMaterialModal"; // modal component

const MyStudySessions = () => {
  const axoisInstece = useAxois();
  const { logedInuser } = useAuth();
  const [selectedSession, setSelectedSession] = useState(null);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["myStudySessions", logedInuser.email],
    queryFn: async () => {
      const res = await axoisInstece.get("/study_session");
      return res.data.filter(
        (session) => session.tutorEmail === logedInuser.email
      );
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-cyan-600 text-center mb-6">
        My Approved Study Sessions
      </h2>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session._id}
            className="border p-4 rounded-md shadow-md bg-base-100"
          >
            <h3 className="text-xl font-semibold">{session.sessionTitle}</h3>
            <p>
              <strong>Duration:</strong> {session.sessionDuration}
            </p>
            <p>
              <strong>Date:</strong> {session.classStartDate}
            </p>
            <button
              className="btn btn-outline btn-primary btn-sm mt-2"
              onClick={() => setSelectedSession(session)}
            >
              Upload Materials
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSession && (
        <UploadMaterialModal
          session={selectedSession}
          tutorEmail={logedInuser.email}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
};

export default MyStudySessions;
