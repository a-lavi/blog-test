import axios from "../Controllers/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  console.log("triigge");
  const logout = async () => {
    setAuth((prevState) => ({
      ...prevState,
      username: null,
      password: null,
      roles: null,
      accessToken: null,
      isAuthenticated: false,
    }));
    try {
      const response = await axios("/api/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
