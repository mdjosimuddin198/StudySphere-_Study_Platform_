import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import useSecureAxios from "../../../useAxois/useSecureAxios/useSecureAxios";

const PendingTutor = () => {
  const secureAxios = useSecureAxios();
  const queryClient = useQueryClient();
  const [selectedTutor, setSelectedTutor] = useState(null);

  // Load all pending tutors
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["pendingTutors"],
    queryFn: async () => {
      const res = await secureAxios.get("/tutors/pending");
      return res.data;
    },
  });

  // Mutation for status update
  const statusMutation = useMutation({
    mutationFn: async ({ id, status, email }) =>
      await secureAxios.patch(`/tutors/status/${id}`, { status, email }),
    onSuccess: (data, variables) => {
      Swal.fire(
        "Success",
        `Tutor ${variables.status} successfully`,
        variables.status === "approved" ? "success" : "error"
      );
      queryClient.invalidateQueries(["pendingTutors"]);
    },
  });

  // Confirm status change (accept/reject)
  const handleStatusUpdate = async (id, status, email) => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${status} this tutor?`,
      icon: status === "approved" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
      cancelButtonText: "Cancel",
      confirmButtonColor: status === "approved" ? "#22c55e" : "#ef4444",
    });

    if (result.isConfirmed) {
      statusMutation.mutate({ id, status, email });
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="overflow-x-auto p-4 bg-base-100 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
        Pending Tutor Applications
      </h2>

      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor, index) => (
            <tr key={tutor._id}>
              <td>{index + 1}</td>
              <td>{tutor.name}</td>
              <td>{tutor.email}</td>
              <td>{tutor.subject}</td>
              <td>
                <span
                  className={`badge ${
                    tutor.status === "approved"
                      ? "badge-success"
                      : tutor.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {tutor.status}
                </span>
              </td>
              <td className="flex flex-col md:flex-row gap-2 justify-center">
                {/* View Button */}
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => {
                    setSelectedTutor(tutor);
                    document.getElementById("tutor_modal").showModal();
                  }}
                >
                  <FaEye className="mr-1" /> View
                </button>

                {/* Accept */}
                <button
                  className="btn btn-sm btn-success"
                  onClick={() =>
                    handleStatusUpdate(tutor._id, "approved", tutor.email)
                  }
                  disabled={tutor.status !== "pending"}
                >
                  <FaCheckCircle className="mr-1" /> Accept
                </button>

                {/* Reject */}
                <button
                  className="btn btn-sm btn-error"
                  onClick={() =>
                    handleStatusUpdate(tutor._id, "rejected", tutor.email)
                  }
                  disabled={tutor.status !== "pending"}
                >
                  <FaTimesCircle className="mr-1" /> Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      <dialog id="tutor_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-[#00E1FF] mb-2">
            Tutor Details
          </h3>
          {selectedTutor && (
            <>
              <p>
                <strong>Name:</strong> {selectedTutor.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedTutor.email}
              </p>
              <p>
                <strong>Subject:</strong> {selectedTutor.subject}
              </p>
              <p>
                <strong>NID:</strong> {selectedTutor.nid}
              </p>
              <p>
                <strong>Gender:</strong> {selectedTutor.gender}
              </p>
              <p>
                <strong>Experience:</strong> {selectedTutor.experience}
              </p>
              <p>
                <strong>Status:</strong> {selectedTutor.status}
              </p>
            </>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PendingTutor;
