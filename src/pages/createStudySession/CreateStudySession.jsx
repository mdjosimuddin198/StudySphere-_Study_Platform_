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
      tutorImag: logedInuser?.photoURL,
      tutorEmail: logedInuser.email,
      registrationFee: 0,
      status: "pending",
    };
    console.log(sessionData);
    try {
      const res = await axoisInstece.post("/study_session", sessionData);
      // console.log(res.data);
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
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2 text-[#00E1FF]">
        <HiCheckCircle className="w-6 h-6  text-[#00E1FF]" />
        Submit a course request to the administrator
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Lessons</span>
            </label>
            <input
              type="number"
              {...register("lessons", {
                required: "Session number is required",
              })}
              placeholder="Enter session number"
              className="input input-bordered w-full"
            />
            {errors.sessionTitle && (
              <p className="text-error text-sm mt-1">
                {errors.sessionTitle.message}
              </p>
            )}
          </div>
          {/* catagory  */}
          <div>
            <label className="label">
              <span className="label-text font-semibold">Select Catagory</span>
            </label>
            <select
              {...register("sessionCatagory", {
                required: "session catagory is required",
              })}
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Select Catagory
              </option>
              <option value="Programming & Tech">Programming & Tech</option>
              <option value="Business Management">Business Management</option>
              <option value="Arts & Design">Arts & Design</option>
              <option value="Personal Development">Personal Development</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Marketing">Marketing</option>
              <option value="Business & Finance">Business & Finance</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Video & Photography">Video & Photography</option>
              <option value="Data Science">Data Science</option>
              <option value="IT Startup Agency">IT Startup Agency</option>
              <option value="Software Company">Software Company</option>
              <option value="Web Design">Web Design</option>
            </select>
            {errors.sessionTitle && (
              <p className="text-error text-sm mt-1">
                {errors.sessionTitle.message}
              </p>
            )}
          </div>
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

        {/* add this futures in future  */}
        {/* Registration Dates */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div> */}

        {/* Session Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <p className="text-xs text-[#00E1FF] mt-1">
              Default is free. Admin can edit later.
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-[#00E1FF] text-black w-full flex items-center gap-2"
        >
          <HiCheckCircle className="w-5 h-5" />
          Submit a Course Request
        </button>
      </form>
    </div>
  );
};

export default CreateStudySession;
