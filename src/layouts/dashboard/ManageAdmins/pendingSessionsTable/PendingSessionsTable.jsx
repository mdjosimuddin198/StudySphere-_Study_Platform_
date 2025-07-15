import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useSecureAxios from "../../../../useAxois/useSecureAxios/useSecureAxios";

const PendingSessionsTable = () => {
  const axiosSecure = useSecureAxios();
  const queryClient = useQueryClient();

  // fetch all pending study sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["pendingStudySessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/study_session");
      return res.data;
    },
  });

  // approve/reject mutation
  const mutation = useMutation({
    mutationFn: async ({ id, status, registrationFee, feedback }) => {
      const body = { status };
      if (registrationFee !== undefined) {
        body.registrationFee = registrationFee;
      }
      if (feedback !== undefined) {
        body.feedback = feedback;
      }
      const res = await axiosSecure.patch(`/study_session/${id}/status`, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingStudySessions"]);
      Swal.fire("Success!", "Session updated successfully.", "success");
    },
  });

  const handleUpdate = async (session) => {
    const { value: fee } = await Swal.fire({
      title: "Update Registration Fee",
      input: "number",
      inputLabel: "Enter new registration fee",
      inputValue: session.registrationFee || 0,
      inputAttributes: {
        min: 0,
        step: 1,
      },
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: (value) => {
        if (value < 0) {
          Swal.showValidationMessage("Fee must be 0 or more");
        }
        return value;
      },
    });

    if (fee !== undefined) {
      mutation.mutate({
        id: session._id,
        status: "approved",
        registrationFee: Number(fee),
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/study_session/${id}`);
        queryClient.invalidateQueries(["pendingStudySessions"]);
        Swal.fire("Deleted!", "The session has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete the session.", "error");
      }
    }
  };

  const handleRejectWithFeedback = async (id) => {
    const { value: formValues } = await Swal.fire({
      title: "Reject Session",
      html:
        '<input id="swal-reason" class="swal2-input" placeholder="Rejection Reason">' +
        '<textarea id="swal-feedback" class="swal2-textarea" placeholder="Feedback"></textarea>',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const reason = document.getElementById("swal-reason").value;
        const feedback = document.getElementById("swal-feedback").value;
        if (!reason || !feedback) {
          Swal.showValidationMessage("Please provide both reason and feedback");
        }
        return { reason, feedback };
      },
    });

    if (formValues) {
      mutation.mutate({
        id,
        status: "rejected",
        feedback: {
          reason: formValues.reason,
          message: formValues.feedback,
        },
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Pending Study Sessions</h2>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Tutor</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={session._id}>
                <td>{index + 1}</td>
                <td>{session.sessionTitle}</td>
                <td>{session.tutorName}</td>
                <td>{session.tutorEmail}</td>
                <td>
                  <span
                    className={`badge ${
                      session.status === "approved"
                        ? "badge-success"
                        : session.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {session.status}
                  </span>
                </td>
                <td className="flex flex-col md:flex-row gap-2 justify-center">
                  {session.status === "pending" ? (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleUpdate({
                            ...session,
                            status: "approved",
                          })
                        }
                      >
                        <FaCheckCircle className="mr-1" /> Accept
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleRejectWithFeedback(session._id)}
                      >
                        <FaTimesCircle className="mr-1" /> Reject
                      </button>
                    </>
                  ) : session.status === "approved" ? (
                    <>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleUpdate(session)}
                      >
                        ✏️ Update
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleDelete(session._id)}
                      >
                        🗑️ Delete
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 italic">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingSessionsTable;
