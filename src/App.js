import React, { useEffect, useState } from "react";
import Seats from "./screens/Seats";
import { io } from "socket.io-client";
import { fetchAuthToken } from "./Api/api";
import Main from "./screens/Main";
import background from "./assets/bg-1.jpg";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   async function initializeSocket() {
  //     const authToken = await fetchAuthToken();

  //     const socketInstance = io("http://localhost:8000", {
  //       auth: {
  //         token: authToken,
  //       },
  //       transports: ["websocket"],
  //     });

  //     setSocket(socketInstance);
  //   }

  //   initializeSocket();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                height: "100vh",
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {<Main />}
            </div>
          }
        />
        <Route
          path="/seats"
          element={
            <div
              style={{
                height: "100vh",
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {<Seats socket={socket} />}
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
