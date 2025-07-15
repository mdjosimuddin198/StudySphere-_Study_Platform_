import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxois from "../../useAxois/useAxois";
import UploadMaterialModal from "./UploadMaterialModal"; // modal component
import Loading from "../../components/loading/Loading";
import { toast } from "react-toastify";

const MyStudySessions = () => {
  const axoisInstece = useAxois();
  const { logedInuser } = useAuth();
  const [selectedSession, setSelectedSession] = useState(null);

  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myStudySessions", logedInuser.email],
    queryFn: async () => {
      const res = await axoisInstece.get("/study_session");
      return res.data.filter(
        (session) => session.tutorEmail === logedInuser.email
      );
    },
  });

  const handleResubmit = async (id) => {
    try {
      await axoisInstece.patch(`/study_session/resubmit/${id}`);
      // success notification
      toast.success("Resubmitted successfully!");
      // manually refetch data
      refetch();
      // window.location.reload(); // অথবা useQuery এর refetch ইউজ করো যদি থাকে
    } catch (error) {
      console.error("Resubmit failed", error);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-cyan-600 text-center mb-6">
        My all Study Sessions
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
            <p>
              <strong>status:</strong> {session.status}
            </p>
            <button
              disabled={
                session.status === "pending" || session.status === "rejected"
              }
              className="btn btn-outline btn-primary btn-sm mt-2"
              onClick={() => setSelectedSession(session)}
            >
              Upload Materials
            </button>
            {session.status === "rejected" && (
              <button
                onClick={() => handleResubmit(session._id)}
                className="btn btn-warning btn-sm mt-2 ml-4"
              >
                Resubmit
              </button>
            )}
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
