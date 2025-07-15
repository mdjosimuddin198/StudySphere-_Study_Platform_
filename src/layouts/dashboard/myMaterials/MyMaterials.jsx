import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useSecureAxios from "../../../useAxois/useSecureAxios/useSecureAxios";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole/useUserRole";

const MyMaterials = () => {
  const axiosSecure = useSecureAxios();
  const queryClient = useQueryClient();
  const { role, isRoleLoading, isAdmin, isTutor } = useUserRole();
  const { logedInuser } = useAuth();

  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["materials"],
    enabled: !isRoleLoading,
    queryFn: async () => {
      const res = await axiosSecure.get("/all_materials");
      return res.data;
    },
  });

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/materials/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["materials"]);
      Swal.fire("Deleted!", "Material has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete material.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading || isRoleLoading) {
    return <p className="text-center">Loading materials...</p>;
  }

  const filteredMaterials = isAdmin
    ? materials
    : materials.filter((material) => material.tutorEmail === logedInuser.email);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
        {isAdmin ? "All Materials" : "My Materials"}
      </h2>

      {filteredMaterials.length === 0 ? (
        <p className="text-center">No materials found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMaterials.map((material) => (
            <div
              key={material._id}
              className="card bg-base-100 shadow-md border rounded-md"
            >
              <figure>
                <img
                  src={material.imageUrl}
                  alt={material.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-lg font-bold">{material.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Tutor Email:</strong> {material.tutorEmail}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href={material.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View Material
                  </a>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(material._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMaterials;
