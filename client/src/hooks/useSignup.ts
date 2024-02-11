import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { TOAST_OPTION } from "../constants/setting";

export interface SignupProps {
  username: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "";
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({
    username,
    password,
    confirmPassword,
    gender,
  }: SignupProps) => {
    const success = handleInputErrors({
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", {
        username,
        password,
        confirmPassword,
        gender,
      });

      const data = await res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Register Success!", TOAST_OPTION);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error: any) {
      toast.error(error.response.data.error, TOAST_OPTION);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

// validate input
function handleInputErrors({
  username,
  password,
  confirmPassword,
  gender,
}: SignupProps) {
  if (!username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 4) {
    toast.error("Password must be at least 4 characters");
    return false;
  }

  return true;
}
