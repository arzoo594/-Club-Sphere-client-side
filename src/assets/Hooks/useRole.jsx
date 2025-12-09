import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Contexts/AuthContext";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: role = "member" } = useQuery({
    queryKey: ["member-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);

      return res.data?.role || "user";
    },
  });

  return { role, roleLoading };
};

export default useRole;
