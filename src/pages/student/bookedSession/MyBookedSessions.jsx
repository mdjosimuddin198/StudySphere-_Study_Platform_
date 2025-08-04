import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxois from "../../../useAxois/useAxois";

import Loading from "../../../components/loading/Loading";
import { Link } from "react-router";

const MyBookedSessions = () => {
  const axoisInstece = useAxois();
  const { logedInuser } = useAuth();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["myBookedSessions", logedInuser?.email],
    queryFn: async () => {
      const res = await axoisInstece.get(
        `/bookedSessions?email=${logedInuser.email}`
      );
      return res.data;
    },
  });

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#00acc1]">
        My Booked Sessions
      </h2>
      <table className="table w-full">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th>#</th>
            <th>Session Title</th>
            <th>Booked At</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={session._id} className="hover">
              <td>{index + 1}</td>
              <td>{session.sessionTitle || "N/A"}</td>
              <td>{formatDateTime(session.bookedAt)}</td>
              <td>
                <Link
                  to={`/booked_session/${session.sessionId}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookedSessions;
