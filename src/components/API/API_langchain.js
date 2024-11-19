import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


const API_LANGCHAIN = ({ SOCKET_SERVER_URL = '' }) => {
    const [messages, setMessages] = useState([]);
    const socket = io(SOCKET_SERVER_URL);
    const [FUNC_Hook_sync_, FUNC_Hook_sync] = useState(null);

    const MANAGE_setting_hook = (hook_function) => { FUNC_Hook_sync(hook_function); }

    useEffect(() => {
        // 메시지 수신
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        }
        );
        if (FUNC_Hook_sync_) FUNC_Hook_sync_();

        return () => {
            socket.disconnect();
        };
    }, [socket]);

};

export default API_LANGCHAIN;