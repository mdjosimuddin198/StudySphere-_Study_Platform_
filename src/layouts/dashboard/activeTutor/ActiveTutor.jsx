import { useQuery } from "@tanstack/react-query";

import { FaTimesCircle, FaSearch } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import useSecureAxios from "../../../useAxois/useSecureAxios/useSecureAxios";

const ActiveTutor = () => {
  const secureAxios = useSecureAxios();
  const [searchTerm, setSearchTerm] = useState("");

  // Query for approved tutors
  const {
    data: tutors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["activeTutors"],
    queryFn: async () => {
      const res = await secureAxios.get("/tutors/approved");
      return res.data;
    },
  });

  // Reject tutor handler with confirmation
  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this approved tutor.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        await secureAxios.patch(`/tutors/status/${id}`, { status: "rejected" });
        Swal.fire("Rejected!", "Tutor has been rejected.", "success");
        refetch(); // Re-fetch updated data
      } catch (error) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  // Filter by name/email
  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="overflow-x-auto p-4 bg-base-100 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
        Active Tutors
      </h2>

      {/* Search bar */}
      <div className="mb-4 flex justify-end">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name or email"
            className="input input-bordered input-sm w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch />
        </div>
      </div>

      {/* Table */}
      {filteredTutors.length === 0 ? (
        <p className="text-center text-gray-500">No approved tutors found.</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTutors.map((tutor, index) => (
              <tr key={tutor._id}>
                <td>{index + 1}</td>
                <td>{tutor.name}</td>
                <td>{tutor.email}</td>
                <td>{tutor.subject}</td>

                {/* ✅ Status Badge Button */}
                <td>
                  <button
                    className={`btn btn-xs ${
                      tutor.status === "approved"
                        ? "btn-success"
                        : tutor.status === "rejected"
                        ? "btn-error"
                        : "btn-warning"
                    }`}
                  >
                    {tutor.status}
                  </button>
                </td>

                <td>{tutor.experience}</td>

                {/* Reject Button */}
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleReject(tutor._id)}
                  >
                    <FaTimesCircle className="mr-1" /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActiveTutor;
