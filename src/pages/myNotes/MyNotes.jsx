import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxois from "../../useAxois/useAxois";

const MyNotes = () => {
  const { logedInuser } = useAuth();
  const axoisInstece = useAxois();
  const [editingNote, setEditingNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: notes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myNotes", logedInuser.email],
    queryFn: async () => {
      const res = await axoisInstece.get(`/notes?email=${logedInuser.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this note?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axoisInstece.delete(`/notes/${id}`);
      Swal.fire("Deleted!", "Your note has been deleted.", "success");
      refetch();
    }
  };

  const onUpdate = async (data) => {
    try {
      await axoisInstece.put(`/notes/${editingNote._id}`, data);
      Swal.fire("Success!", "Note updated successfully.", "success");
      setEditingNote(null);
      setIsModalOpen(false);
      reset();
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to update note.", "error");
    }
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setValue("title", note.title);
    setValue("description", note.description);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-cyan-600 mb-4">
        My Personal Notes
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500">You have no notes.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="p-4 rounded shadow bg-base-100 border"
            >
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{note.description}</p>
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-outline btn-info"
                  onClick={() => handleEditClick(note)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && editingNote && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-cyan-600 mb-4">
              Update Note
            </h3>

            <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
              <input
                type="text"
                placeholder="Note Title"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}

              <textarea
                placeholder="Note Description"
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">Description is required</p>
              )}

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingNote(null);
                    setIsModalOpen(false);
                  }}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyNotes;
