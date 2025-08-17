import React, { useEffect, useState } from "react";
import useSecureAxios from "../../useAxois/useSecureAxios/useSecureAxios";
import Loading from "../../components/loading/Loading";
import StudySessionCard from "./StudySessionCard";
import { useQuery } from "@tanstack/react-query";

const StudySessionsList = () => {
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
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

  // ডেটা আসলে filteredSessions update
  useEffect(() => {
    setFilteredSessions(sessions);
  }, [sessions]);

  // Search handle
  // Search + Sort combined
  useEffect(() => {
    let result = sessions.filter((session) =>
      session.sessionTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "asc") {
      result.sort((a, b) => a.registrationFee - b.registrationFee);
    } else if (sortOption === "desc") {
      result.sort((a, b) => b.registrationFee - a.registrationFee);
    }

    setFilteredSessions(result);
  }, [searchTerm, sortOption, sessions]);

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
      <h1 className="text-4xl font-bold mb-6 text-center text text-[#00E1FF]">
        Explore Featured Courses
      </h1>

      {/* Sorting Buttons */}
      <div className="flex gap-4 mb-4 flex-col md:flex-row">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 py-2 px-1 border rounded w-full md:w-1/3"
        />
        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="mb-4 p-2 border bg-black rounded w-full md:w-1/3"
        >
          <option value="">Sort by registrationFee</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {filteredSessions.map((session) => (
          <StudySessionCard key={session._id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default StudySessionsList;
