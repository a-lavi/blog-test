/* import { SettingsSuggestRounded } from "@mui/icons-material"; */
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../Controllers/axios";
const LOGIN_URL = "/api/login";

const Login = () => {
  const { setAuth, persist, setPersist} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/blog_project";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const expiresIn= response?.data?.expiresIn
      const expirationTime =  new Date(new Date().getTime()+ +expiresIn * 100)
      
      console.log(expirationTime.toISOString());
      /* setAuth({ username, password, roles, accessToken }); */
      setAuth((prevState) => ({
        ...prevState,
        username, password, roles, accessToken ,expirationTime,
        isAuthenticated: true,
      }));
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  console.log(persist);
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <div>
      <h2>Login</h2>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form action="submit" id="reg-form" onSubmit={handleSubmit}>
        <input
          ref={userRef}
          type="text"
          placeholder="Username"
          autoComplete="off"
          id="username"
          onChange={({ target }) => setUser(target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          id="password"
          onChange={({ target }) => setPwd(target.value)}
        />
        <button>Submit</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
