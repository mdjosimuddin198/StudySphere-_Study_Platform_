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
  const [showFeedbackSession, setShowFeedbackSession] = useState(null); // ফিডব্যাক দেখানোর জন্য

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
      toast.success("Resubmitted successfully!");
      refetch();
    } catch (error) {
      console.error("Resubmit failed", error);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-[#00E1FF] text-center mb-6">
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
              <strong>Status:</strong> {session.status}
            </p>

            {/* যদি সেশন rejected হয় এবং feedback থাকে, তাহলে ফিডব্যাক দেখানোর বাটন */}
            {session.status === "rejected" && session.feedback && (
              <button
                onClick={() => setShowFeedbackSession(session)}
                className="btn btn-sm btn-warning mt-2 mr-2"
              >
                View Rejection Feedback
              </button>
            )}

            <button
              disabled={
                session.status === "pending" || session.status === "rejected"
              }
              className="btn btn-outline bg-[#00E1FF] text-black btn-sm mt-2"
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

      {/* Upload Material Modal */}
      {selectedSession && (
        <UploadMaterialModal
          session={selectedSession}
          tutorEmail={logedInuser.email}
          onClose={() => setSelectedSession(null)}
        />
      )}

      {/* Rejection Feedback Modal */}
      {showFeedbackSession && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowFeedbackSession(null)}
        >
          <div
            className="bg-white p-6 rounded-md max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 text-red-600">
              Rejection Feedback
            </h3>
            <p>
              <strong>Reason:</strong>{" "}
              {showFeedbackSession.feedback?.reason || "No reason provided"}
            </p>
            <p className="mt-2">
              <strong>Feedback:</strong>{" "}
              {showFeedbackSession.feedback?.message || "No feedback provided"}
            </p>
            <button
              className="btn btn-sm bg-[#00E1FF] text-black mt-4"
              onClick={() => setShowFeedbackSession(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStudySessions;
