import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useSecureAxios from "../../useAxois/useSecureAxios/useSecureAxios";

const useUserRole = () => {
  const { logedInuser, loading } = useAuth();
  const secureAxios = useSecureAxios();

  const { data: roleData, isLoading: isRoleLoading } = useQuery({
    queryKey: ["userRole", logedInuser?.email],
    enabled: !!logedInuser?.email && !loading,
    queryFn: async () => {
      const res = await secureAxios.get(`/users/role/${logedInuser.email}`);
      return res.data; // { role: "admin" }
    },
  });

  const role = roleData?.role || "user";

  return {
    role,
    isRoleLoading,
    isAdmin: role === "admin",
    isTutor: role === "tutor",
  };
};

export default useUserRole;
