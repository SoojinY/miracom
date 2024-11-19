import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


const API_openai = ({ SOCKET_SERVER_URL = '' }) => {
    const [messages, setMessages] = useState([]);

    const API_URL = 'asd';//'https://api.openai.com/v1/chat/completions';
    const openai = new OpenAI({
        apiKey: 'qqq',//'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',
        dangerouslyAllowBrowser: true
    });


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