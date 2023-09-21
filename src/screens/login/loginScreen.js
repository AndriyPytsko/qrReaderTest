import React, { useContext, useEffect, useState } from "react";
import { sessionContext } from "../../providers/sessionProvider/sessionProvider";
import { useNavigate } from "react-router-dom";
import "./loginScreen.css";

const INITIAL_STATE = {
  headerUsername: "",
  headerPassword: "",
};

export function LoginScreen() {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [isDisabled, setDisabled] = useState(false);
  const [incorrectData, setIncorrectData] = useState(false);
  const navigate = useNavigate();
  const { login, session } = useContext(sessionContext);

  const handleChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    setDisabled(true);
    e.stopPropagation();
    e.preventDefault();
    try {
      const isSuccess = await login(formState);
      console.log(isSuccess);
      if (isSuccess) {
        navigate("/");
      } else {
        setIncorrectData(true);
      }
    } catch (e) {
      console.info(e);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (session?.loginSuccessful) navigate("/");
  }, []);

  return (
    <div className="loginWrapper">
      {incorrectData ? (
        <span className="loginError">Invalid username or password</span>
      ) : null}
      <form className="basketForm" onSubmit={onSubmit}>
        <input
          className="inputField"
          placeholder="Your e-mail*"
          name="headerUsername"
          pattern="[a-z0-9._%+-.]+@[a-z0-9.-.]+.[a-z]{2,4}$"
          type="email"
          required
          value={formState.headerUsername}
          onChange={handleChange}
        />
        <input
          className="inputField"
          placeholder="Password"
          type="password"
          name="headerPassword"
          required
          value={formState.headerPassword}
          onChange={handleChange}
        />
        <div className="basketSubmitBlock">
          <button
            disabled={isDisabled}
            type="submit"
            className="infoModalButton"
          >
            {isDisabled ? "..." : "LOGIN"}
          </button>
        </div>
      </form>
    </div>
  );
}
