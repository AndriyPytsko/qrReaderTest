import * as React from "react";
import { createContext, useEffect, useState } from "react";
import { apiSession } from "../../api/api.session";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const QQR_READER_TOKEN = "PHPSESSID";

export const sessionContext = createContext(null);

const SessionProvider = (props) => {
  const { children } = props;

  const [session, setSession] = useState(null);
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  const checkSession = async (token) => {
    const data = await apiSession.checkSession(token);
    if (!data.session) navigate("/login");
    setSession({
      email: data.session?.loggedInUserEmail ?? "",
      name: data.session?.loggedInUserFirstName ?? "",
      loginSuccessful: !!data.session,
      token: data.cookie[QQR_READER_TOKEN],
    });
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (userData) => {
    const data = await apiSession.login(userData);
    setSession({
      email: data.session?.loggedInUserEmail ?? "",
      name: data.session?.loggedInUserFirstName ?? "",
      loginSuccessful: !!data.session,
      token: data.cookie[QQR_READER_TOKEN],
    });
    if (data.session)
      setCookies(QQR_READER_TOKEN, data.cookie[QQR_READER_TOKEN]);
    return data.session;
  };

  if (!session) return <div className="globalLoader">Loading</div>;

  return (
    <sessionContext.Provider
      value={{
        checkSession,
        session,
        login,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
};

export default SessionProvider;
