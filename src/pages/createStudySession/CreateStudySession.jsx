import React from "react";
import { useForm } from "react-hook-form";
import { HiCheckCircle, HiOutlineClipboardList } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import useAxois from "../../useAxois/useAxois";
import Swal from "sweetalert2";

const CreateStudySession = () => {
  const axoisInstece = useAxois();
  const { logedInuser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const sessionData = {
      ...data,
      tutorName: logedInuser.displayName,
      tutorEmail: logedInuser.email,
      registrationFee: 0,
      status: "pending",
    };

    try {
      const res = await axoisInstece.post("/study_session", sessionData);
      console.log(res.data);
      if (res.data?.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Study session has been submitted and is pending admin approval.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error!",
        text: err.message || "Network or server error occurred.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }

    // console.log("Submitted session:", sessionData);

    // reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-cyan-600">
        <HiCheckCircle className="w-6 h-6 text-cyan-600" />
        Create Study Session
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Session Title */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Session Title</span>
          </label>
          <input
            type="text"
            {...register("sessionTitle", {
              required: "Session title is required",
            })}
            placeholder="Enter session title"
            className="input input-bordered w-full"
          />
          {errors.sessionTitle && (
            <p className="text-error text-sm mt-1">
              {errors.sessionTitle.message}
            </p>
          )}
        </div>

        {/* Tutor Name */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Tutor Name</span>
          </label>
          <input
            type="text"
            value={logedInuser.displayName}
            readOnly
            className="input input-bordered w-full bg-base-200 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Tutor Image </span>
          </label>
          <input
            type="url"
            {...register("tutorImag")}
            className="input input-bordered w-full cursor-not-allowed"
            value={logedInuser?.photoURL}
            readOnly
          />
          {errors.imageURL && (
            <p className="text-error text-sm mt-1">{errors.imageURL.message}</p>
          )}
        </div>

        {/* Tutor Email */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Tutor Email</span>
          </label>
          <input
            type="email"
            value={logedInuser.email}
            readOnly
            className="input input-bordered w-full bg-base-200 cursor-not-allowed"
          />
        </div>

        {/* Session Description */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            rows="4"
            {...register("sessionDescription", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            placeholder="Enter session description"
          />
          {errors.sessionDescription && (
            <p className="text-error text-sm mt-1">
              {errors.sessionDescription.message}
            </p>
          )}
        </div>

        {/* image link  */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Image URL</span>
          </label>
          <input
            type="url"
            {...register("imageURL", {
              required: "Image URL is required",
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif))$/i,
                message: "Please enter a valid image URL",
              },
            })}
            className="input input-bordered w-full"
            placeholder="Enter image URL (e.g. https://example.com/image.jpg)"
          />
          {errors.imageURL && (
            <p className="text-error text-sm mt-1">{errors.imageURL.message}</p>
          )}
        </div>

        {/* Registration Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">
                Registration Start
              </span>
            </label>
            <input
              type="datetime-local"
              {...register("registrationStartDate", {
                required: "Start date is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.registrationStartDate && (
              <p className="text-error text-sm mt-1">
                {errors.registrationStartDate.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Registration End</span>
            </label>
            <input
              type="datetime-local"
              {...register("registrationEndDate", {
                required: "End date is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.registrationEndDate && (
              <p className="text-error text-sm mt-1">
                {errors.registrationEndDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Class Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Class Start</span>
            </label>
            <input
              type="datetime-local"
              {...register("classStartDate", {
                required: "Start date is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.classStartDate && (
              <p className="text-error text-sm mt-1">
                {errors.classStartDate.message}
              </p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Class End</span>
            </label>
            <input
              type="datetime-local"
              {...register("classEndDate", {
                required: "End date is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.classEndDate && (
              <p className="text-error text-sm mt-1">
                {errors.classEndDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Session Duration */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Session Duration</span>
          </label>
          <input
            type="text"
            {...register("sessionDuration", {
              required: "Duration is required",
            })}
            placeholder="e.g. 2 weeks, 10 days"
            className="input input-bordered w-full"
          />
          {errors.sessionDuration && (
            <p className="text-error text-sm mt-1">
              {errors.sessionDuration.message}
            </p>
          )}
        </div>

        {/* Registration Fee (Read-only) */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Registration Fee</span>
          </label>
          <input
            type="number"
            value={0}
            readOnly
            className="input input-bordered w-full bg-base-200 cursor-not-allowed"
          />
          <p className="text-xs text-cyan-600 mt-1">
            Default is free. Admin can edit later.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full flex items-center gap-2"
        >
          <HiCheckCircle className="w-5 h-5" />
          Submit Session
        </button>
      </form>
    </div>
  );
};

export default CreateStudySession;
