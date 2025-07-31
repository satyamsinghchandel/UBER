import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

//connecting backend socket to frontend
const SOCKET_SERVER_URL =  `${import.meta.env.VITE_BASE_URL}`;

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null); 

  useEffect(() => {
    // Connect to server
    socketRef.current = io(SOCKET_SERVER_URL);
    setSocket(socketRef.current); 
    socketRef.current.on('connect', () => {
      console.log('Connected to socket server:', socketRef.current.id);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Send message to a specific event
  const sendMessage = (eventName, data) => {
    if (socketRef.current) {
      
      socketRef.current.emit(eventName, data);
    }
  };

  // Listen for messages from a specific event
  const onMessage = (eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }
    // Optionally return a cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.off(eventName, callback);
      }
    };
  };

  return (
    <SocketContext.Provider value={{ sendMessage, onMessage, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;