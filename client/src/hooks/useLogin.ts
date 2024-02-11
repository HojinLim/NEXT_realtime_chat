import { useState } from "react";

import { toast } from "react-toastify";
import { TOAST_OPTION } from "../constants/setting";
import axios from "axios";

import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const login = async (username: string, password: string) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const data = await res.data;
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error: any) {
      toast.error(error.response.data.error, TOAST_OPTION);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username: string, password: string) {
  if (!username || !password) {
    toast.error("Please fill in all fields", TOAST_OPTION);
    return false;
  }

  return true;
}
