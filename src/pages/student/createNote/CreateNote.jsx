import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxois from "../../../useAxois/useAxois";

const CreateNote = () => {
  const { logedInuser } = useAuth();
  const axoisInstece = useAxois();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const noteData = {
      ...data,
      email: logedInuser.email,
      createdAt: new Date(),
    };
    // console.log(noteData);
    try {
      await axoisInstece.post("/notes", noteData);
      Swal.fire("Success!", "Your note has been saved.", "success");
      reset();
    } catch (error) {
      Swal.fire("Error", "Failed to save the note.", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-base-100 shadow rounded">
      <h2 className="text-2xl font-bold text-[#00E1FF] mb-4">
        Create New Note
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email (read-only) */}
        <input
          type="email"
          value={logedInuser.email}
          readOnly
          className="input input-bordered w-full "
        />

        {/* Title */}
        <input
          type="text"
          placeholder="Note Title"
          {...register("title", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">Title is required</p>
        )}

        {/* Description */}
        <textarea
          placeholder="Note Description"
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}

        <button type="submit" className="btn bg-[#00E1FF] text-black w-full">
          Save Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
