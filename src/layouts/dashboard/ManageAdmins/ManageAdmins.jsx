import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useSecureAxios from "../../../useAxois/useSecureAxios/useSecureAxios";

const ManageAdmins = () => {
  const secureAxios = useSecureAxios();
  const [emailQuery, setEmailQuery] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState("");

  // debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedEmail(emailQuery), 500);
    return () => clearTimeout(timer);
  }, [emailQuery]);

  // Fetch matched users
  const {
    data: users = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedUsers", debouncedEmail],
    enabled: !!debouncedEmail,
    queryFn: async () => {
      const res = await secureAxios.get(
        `/users/search?email=${debouncedEmail}`
      );
      return res.data;
    },
  });

  // Role update mutation
  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) =>
      await secureAxios.patch(`/users/role/${id}`, { role }),
    onSuccess: () => {
      refetch();
    },
  });

  // Handle make/remove admin
  const handleRoleChange = async (id, currentRole) => {
    const isAdmin = currentRole === "admin";
    const nextRole = isAdmin ? "user" : "admin";

    const result = await Swal.fire({
      title: `${isAdmin ? "Remove Admin" : "Make Admin"}?`,
      text: `Do you want to ${isAdmin ? "remove" : "grant"} admin rights?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await updateRole({ id, role: nextRole });
      Swal.fire("Success", `User is now ${nextRole}`, "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Admins</h2>

      <div className="flex gap-2 mb-6 items-center">
        <FaSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search user by email"
          className="input input-bordered w-full max-w-md"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
      </div>

      {isFetching && <p>Searching users...</p>}
      {!isFetching && users.length === 0 && debouncedEmail && (
        <p className="text-gray-500">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.email}</td>
                  <td>{new Date(u.created_at).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.role === "admin" ? "badge-success" : "badge-ghost"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRoleChange(u._id, u.role || "user")}
                      className={`btn btn-sm ${
                        u.role === "admin" ? "btn-error" : "btn-primary"
                      }`}
                    >
                      {u.role === "admin" ? (
                        <>
                          <FaUserTimes className="mr-1" />
                          Remove Admin
                        </>
                      ) : (
                        <>
                          <FaUserShield className="mr-1" />
                          Make Admin
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;
