import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from './SocketContext';
import socket from "../socket/socket";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

    useEffect(() => {
        setSocketInstance(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    if (!socketInstance) {
        return null;
    }

    return <SocketContext.Provider value={socketInstance}>{children}</SocketContext.Provider>;
};