import axios from "@/utils/axios-instance";

export const loginApi = async (
  username: string,
  password: string,
  rememberMe: boolean
) => {
  const res = await axios.post("/auth/login", {
    username,
    password,
    rememberMe,
  });
  return res.data;
};

export const registerApi = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const res = await axios.post("/auth/register", {
    username,
    email,
    password,
    confirmPassword,
  });
  return res.data;
};
