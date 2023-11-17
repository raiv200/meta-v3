"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const WebSocketClient = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3001"); // Adjust the URL based on your WebSocket server

    // Event listener for when the connection is established
    socket.on("connect", () => {
      // console.log("Connected to WebSocket server");
    });

    // Event listener for when data is received from the server
    socket.on("dataUpdate", (updatedData) => {
      // console.log("Received data update:", updatedData);
      setData(updatedData);
    });

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <h1>WebSocket Client</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
};

export default WebSocketClient;
