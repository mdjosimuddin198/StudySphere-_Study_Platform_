import React from "react";
import useSecureAxios from "../../useAxois/useSecureAxios/useSecureAxios";
import Loading from "../../components/loading/Loading";
import StudySessionCard from "./StudySessionCard";
import { useQuery } from "@tanstack/react-query";

const StudySessionsList = () => {
  const axiosSecure = useSecureAxios();
  const {
    data: sessions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["studySessions"],
    queryFn: async () => {
      const response = await axiosSecure.get("/study_session?status=approved");
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available study session </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {sessions.map((session) => (
          <StudySessionCard key={session._id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default StudySessionsList;
