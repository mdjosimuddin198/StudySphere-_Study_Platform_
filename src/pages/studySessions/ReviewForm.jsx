import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxois from "../../useAxois/useAxois";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole/useUserRole";

const ReviewForm = ({ sessionId, sessionTitle, refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const axoisInstece = useAxois();
  const { logedInuser } = useAuth();
  const { role, isRoleLoading, isAdmin, isTutor } = useUserRole();

  const onSubmit = async (data) => {
    const reviewData = {
      studentEmail: logedInuser.email,
      studentName: logedInuser.displayName,
      studentImg: logedInuser.photoURL,
      sessionTitle: sessionTitle,
      sessionId: sessionId,
      rating: parseFloat(data.rating),
      comment: data.comment,
      createdAt: new Date(),
    };

    try {
      await axoisInstece.post("/reviews", reviewData);
      Swal.fire("Success!", "Your review has been submitted.", "success");
      reset();
      refetch(); // update review list
    } catch (error) {
      Swal.fire("Error", "Failed to submit review.", "error");
    }
  };

  // ✅ শুধুমাত্র স্টুডেন্টদের দেখাও
  if (role !== "user") return null;

  return (
    <div className="bg-base-200 shadow p-4 rounded-xl mt-8">
      <h3 className="text-xl font-bold mb-4 text-cyan-600">Write a Review</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="font-semibold">Rating</label>
          <select
            {...register("rating", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="font-semibold">Comment</label>
          <textarea
            {...register("comment", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Write your feedback here..."
          />
        </div>

        <button className="btn btn-primary w-full">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
