import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { TOAST_OPTION } from "../constants/setting";
import { useAuthContext } from "../context/AuthContext";


const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();


  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/logout");
      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Logout success", TOAST_OPTION);
      localStorage.removeItem("user");
      setAuthUser(null)
    } catch (error: any) {
      toast.error(error.response.data.error, TOAST_OPTION);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
