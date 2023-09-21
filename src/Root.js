import React from "react";
import { Outlet } from "react-router-dom";
import SessionProvider from "./providers/sessionProvider/sessionProvider";
import BasketProvider from "./providers/basketProvider/basketProvider";

export default function Root() {
  return (
    <div className="app">
      <SessionProvider>
        <BasketProvider>
          <Outlet />
        </BasketProvider>
      </SessionProvider>
    </div>
  );
}
