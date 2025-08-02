import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxois from "../../useAxois/useAxois";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole/useUserRole";
import Loading from "../../components/loading/Loading";
import ReviewForm from "./ReviewForm";

const StudySessionsDetails = () => {
  const { id } = useParams();
  const axoisInstece = useAxois();
  const { logedInuser } = useAuth();
  const { isRoleLoading, isAdmin, isTutor } = useUserRole(); // returns ["student", "tutor", "admin"]

  // 1️⃣ Fetch single session
  const { data: session = {}, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await axoisInstece.get(`/study_session/${id}`);
      return res.data;
    },
  });

  // 2️⃣ Fetch reviews for this session
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axoisInstece.get(`/reviews?sessionId=${id}`);
      return res.data;
    },
  });

  // 3️⃣ Average Rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No rating";

  // 4️⃣ Check button condition
  // const now = new Date();

  // const isUpcoming = new Date(session.registrationStartDate) > now;
  // const isClosed = new Date(session.registrationEndDate) < now;
  const isNotAllowed = !logedInuser || isAdmin || isTutor;

  const isDisabled = isNotAllowed;

  // 5️⃣ Book Now Handler
  const handleBookNow = async () => {
    if (!logedInuser) return;

    if (session.registrationFee === 0) {
      try {
        await axoisInstece.post("/bookedSessions", {
          studentEmail: logedInuser.email,
          sessionId: session._id,
          tutorEmail: session.tutorEmail,
          sessionTitle: session.sessionTitle,
          bookedAt: new Date(),
        });
        Swal.fire("Booked!", "You have booked the session.", "success");
      } catch (error) {
        Swal.fire("Error", "	You’ve already booked this session!", "error");
      }
    } else {
      // Redirect to payment
      window.location.href = `/payment/${session._id}`;
    }
  };

  if (isRoleLoading) return <Loading></Loading>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="bg-base-100 rounded-xl shadow p-6">
        {/* Banner */}
        <img
          src={session.imageURL}
          alt="Session Banner"
          className="w-full h-64 object-cover rounded-xl mb-4"
        />

        {/* Title + Tutor Info */}
        <h2 className="text-3xl font-bold text-cyan-600 mb-2">
          {session.sessionTitle}
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={session.tutorImag}
            className="w-10 h-10 rounded-full border"
            alt="Tutor"
          />
          <p className="font-semibold">{session.tutorName}</p>
          <p className="text-yellow-500 flex items-center gap-1">
            <FaStar /> {averageRating}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-500 mb-4">{session.sessionDescription}</p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-base-200 p-4 rounded">
            <p>
              <span className="font-bold">Registration:</span>{" "}
              {new Date(session.registrationStartDate).toLocaleDateString()} →{" "}
              {new Date(session.registrationEndDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-bold">Class Dates:</span>{" "}
              {new Date(session.classStartDate).toLocaleDateString()} →{" "}
              {new Date(session.classEndDate).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-base-200 p-4 rounded">
            <p>
              <span className="font-bold">Duration:</span>{" "}
              {session.sessionDuration}
            </p>
            <p>
              <span className="font-bold">Fee:</span>{" "}
              {session.registrationFee === 0
                ? "Free"
                : `${session.registrationFee} ৳`}
            </p>
          </div>
        </div>

        {/* Book Now Button */}
        <button
          disabled={isDisabled}
          onClick={handleBookNow}
          className={`btn btn-primary w-full cursor-pointer`}
        >
          {isNotAllowed ? "Not Allowed" : "Enroll Now"}
        </button>
      </div>

      {/* Review Section */}
      <div className="mt-8 bg-base-100 p-4 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4 text-cyan-600">
          Student Reviews
        </h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border p-3 rounded bg-base-200 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{review.studentEmail}</p>
                  <p className="text-yellow-500 flex items-center gap-1">
                    <FaStar /> {review.rating}
                  </p>
                </div>
                <p className="mt-2 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <ReviewForm sessionId={session._id} refetch={refetch}></ReviewForm> */}
    </div>
  );
};

export default StudySessionsDetails;
