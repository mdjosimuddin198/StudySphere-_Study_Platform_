import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../useAxois/useSecureAxios/useSecureAxios";

const BeATutor = () => {
  const { logedInuser } = useAuth();
  const secureAxios = useSecureAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (tutorData) => {
    tutorData.status = "pending";
    // console.log("Tutor Form Data:", tutorData);
    secureAxios.post("/tutors", tutorData).then((result) => {
      // console.log(tutorData);
      if (result.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application is pending approval.",
        });
      }
    });

    // reset();
  };

  return (
    <section className="max-w-6xl mx-auto my-12 bg-base-200 rounded-xl shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image Section (Always Visible) */}
        <div className="order-1 md:order-2">
          <img
            src="https://media.istockphoto.com/id/187244393/photo/we-will-get-to-the-right-answer-eventually.jpg?s=612x612&w=0&k=20&c=sv85YclfSvJwBzxHipFN5YSNIDSU6YXe8skqZb6QVjw="
            alt="Be a Tutor"
            className="w-full h-full object-cover rounded-t-xl md:rounded-l-none md:rounded-r-xl"
          />
        </div>

        {/* Form Section */}
        <div className="p-8 order-2 md:order-1">
          <h2 className="text-3xl font-bold text-[#00E1FF] mb-6 text-center">
            Be a Tutor
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Your full name"
                value={logedInuser?.displayName}
                className="input input-bordered w-full"
                readOnly
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                value={logedInuser?.email}
                className="input input-bordered w-full"
                readOnly
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Image Url </span>
              </label>
              <input
                type="url"
                {...register("imageURL")}
                value={logedInuser?.photoURL}
                className="input input-bordered w-full"
                readOnly
              />
            </div>

            {/* NID */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  NID Card Number
                </span>
              </label>
              <input
                type="text"
                {...register("nid", {
                  required: "NID is required",
                  minLength: { value: 10, message: "At least 10 digits" },
                })}
                placeholder="Your NID"
                className="input input-bordered w-full"
              />
              {errors.nid && (
                <p className="text-red-500 text-sm">{errors.nid.message}</p>
              )}
            </div>

            {/* Subject Dropdown */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Subject Expertise
                </span>
              </label>
              <select
                {...register("subject", { required: "Subject is required" })}
                className="select select-bordered w-full"
              >
                <option value="">Select a subject</option>
                <option value="Computer Science ">Computer Science </option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Business Administration ">
                  Business Administration{" "}
                </option>
                <option value="Political science ">Political science </option>
                <option value="Chemistry">Chemistry</option>
                <option value="ICT">ICT</option>
                <option value="Bangla">Bangla</option>
              </select>
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>

            {/* Gender Radio */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Gender</span>
              </label>
              <div className="flex gap-4">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="Male"
                    {...register("gender", { required: "Gender is required" })}
                    className="radio checked:bg-blue-500"
                  />
                  <span className="label-text ml-2">Male</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="Female"
                    {...register("gender", { required: "Gender is required" })}
                    className="radio checked:bg-pink-500"
                  />
                  <span className="label-text ml-2">Female</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="Other"
                    {...register("gender", { required: "Gender is required" })}
                    className="radio checked:bg-purple-500"
                  />
                  <span className="label-text ml-2">Other</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Teaching Experience
                </span>
              </label>
              <textarea
                {...register("experience", {
                  required: "Experience is required",
                  minLength: { value: 10, message: "Minimum 10 characters" },
                })}
                placeholder="Describe your teaching experience..."
                className="textarea textarea-bordered w-full"
              ></textarea>
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn bg-[#00E1FF] text-black w-full mt-4"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BeATutor;
