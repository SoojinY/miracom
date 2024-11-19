// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import OpenAI from "openai";


// const API_socket = ({ _FUNC_Hook_sync, SOCKET_SERVER_URL = '' }) => {
//     const [messages, setMessages] = useState();

//     const socket = io(SOCKET_SERVER_URL);
//     const FUNC_Hook_sync_ = _FUNC_Hook_sync;

//     const API_URL = 'http://165.132.144.52:8000/';
//     const API_model = "Qwen/Qwen2-7B-Instruct"

//     const msg = {
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//             'api_key': "aaa",
//             'model': API_model
//         },
//         body: JSON.stringify(data),
//     }

//     useEffect(() => {
//         console.log('get_message')
//         // 메시지 수신
//         socket.on('message', (message) => {
//             setMessages(message);
//         }
//         );
//         if (FUNC_Hook_sync_) FUNC_Hook_sync_(messages);

//     }, []);

//     useEffect(() => {
//         console.log('get_message')
//         // 메시지 수신
//         socket.on('message', (message) => {
//             setMessages(message);
//         }
//         );
//         if (FUNC_Hook_sync_) FUNC_Hook_sync_(messages);

//         return () => {
//             socket.disconnect();
//         };
//     }, [socket, messages]);

// };

// export default API_socket;


// // const API_socket = ({ _FUNC_Hook_sync, SOCKET_SERVER_URL = '' }) => {
// //     const [messages, setMessages] = useState([]);

// //     const socket = io(SOCKET_SERVER_URL);
// //     const FUNC_Hook_sync_ = _FUNC_Hook_sync;

// //     useEffect(() => {
// //         console.log('get_message');

// //         // 메시지 수신
// //         socket.on('message', (message) => {
// //             setMessages((prevMessages) => [...prevMessages, message]);
// //         });

// //         // FUNC_Hook_sync 호출
// //         if (FUNC_Hook_sync_) {
// //             FUNC_Hook_sync_(messages);
// //         }

// //         return () => {
// //             socket.disconnect();
// //         };
// //     }, [socket, messages, FUNC_Hook_sync_]); // 의존성 배열에 FUNC_Hook_sync_ 추가

// //     const sendMessage = async (userInput) => {
// //         // 메시지를 소켓으로 전송
// //         msg={
// //             method: 'get',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 'api_key':"aaa",
// //                 'model': API_model
// //             },
// //             body: JSON.stringify(data),
// //         }

// //         socket.emit('message', userInput);

// //     };

// //     return {
// //         messages,
// //         sendMessage
// //     };
// // };

// // export default API_socket;



// import io from 'socket.io-client';

// class API_socket {
//     constructor(url,_CALL_BACK_MESSAGE,_CALL_BACK_MESSAGE_END, timeout = 600 * 1000) {//'http://165.132.144.52:8000/';

//         this.url = url;
//         this.socket = null;
//         this.timeoutDuration = timeout;
//         this.VAR_CALL_BACK_END_MESSAGE_='end_______data';
//         this.CALL_BAK_MESSAGE_=_CALL_BACK_MESSAGE;
//         this.CALL_BACK_MESSAGE_END_=_CALL_BACK_MESSAGE_END;
//         this.initialize();


//     }

//     initialize() {
//         this.connect();
//     }

//     connect() {
//         console.log(this.url)
//         this.socket =new WebSocket(this.url);

//         this.socket.onopen ('connect', () => {
//             console.log('Connected to socket server');
//             this.startTimeout(this.timeoutDuration);
//         });

//         this.socket.onclose ('disconnect', () => {
//             console.log('Disconnected from socket server');
//             this.tryReconnect();
//         });

//         this.socket.onmessage ('message', (data) => {
//             if(data==this.VAR_CALL_BACK_END_MESSAGE_){
//                 this.CALL_BACK_MESSAGE_END_(data);
//             }
//             else{
//                 this.CALL_BAK_MESSAGE_(data);
//             }
//             console.log('Message received:', data);
//         });
//     }

//     sendMessage(message) {
//         if (this.socket && this.socket.connected) {
//             this.socket.emit('message', message);
//         } else {
//             console.log('Socket is not connected. Cannot send message.');
//         }
//     }

//     tryReconnect() {
//         // 3초 후에 재연결 시도
//         setTimeout(() => {
//             console.log('Trying to reconnect...');
//             this.connect();
//         }, 3000);
//     }

//     startTimeout(timeout) {
//         clearTimeout(this.timeoutId); // 기존 타이머 클리어
//         this.timeoutId = setTimeout(() => {
//             this.disconnect();
//             console.log('Socket disconnected due to timeout');
//         }, timeout);
//     }

//     disconnect() {
//         if (this.socket) {
//             this.socket.disconnect();
//             clearTimeout(this.timeoutId); // 타이머 클리어
//         }
//     }

// }
// export default API_socket;



class API_socket {
    constructor(url, _CALL_BACK_MESSAGE, _CALL_BACK_MESSAGE_END, timeout = 600 * 1000) {
        this.url = url;
        this.socket = null;
        this.timeoutDuration = timeout;
        this.VAR_CALL_BACK_END_MESSAGE_ = 'end_______data';
        this.CALL_BAK_MESSAGE_ = _CALL_BACK_MESSAGE;
        this.CALL_BACK_MESSAGE_END_ = _CALL_BACK_MESSAGE_END;
        this.initialize();
    }

    initialize() {
        this.connect();
    }

    connect() {
        console.log(this.url);
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log('Connected to socket server');
            this.startTimeout(this.timeoutDuration);
        };

        this.socket.onclose = () => {
            console.log('Disconnected from socket server');
            this.tryReconnect();
        };

        this.socket.onmessage = (event) => {
             // WebSocket 데이터는 event.data에서 가져옵니다.
            const data=JSON.parse(event.data)['message']
            if (data === this.VAR_CALL_BACK_END_MESSAGE_) {
                this.CALL_BACK_MESSAGE_END_(data);
            } else {
                this.CALL_BAK_MESSAGE_(data);
            }
            console.log('Message received:', data);
        };

        this.socket.onerror = (error) => {
            console.error(JSON.stringify(error));
        };
    }

    sendMessage(message,model='model_name',port='port_number') {
        console.log('send.');
        if (this.socket && this.socket.readyState === WebSocket.OPEN) { // 연결 상태 확인
            message={'text':message}
            message['model']=model;
            message['port']=port;
            
            console.log(message);
            this.socket.send(JSON.stringify(message)); // .emit() 대신 .send() 사용
        } else {
            console.log('Socket is not connected. Cannot send message.');
        }
    }

    tryReconnect() {
        // 3초 후에 재연결 시도
        setTimeout(() => {
            console.log('Trying to reconnect...');
            this.connect();
        }, 10000);
    }

    startTimeout(timeout) {
        clearTimeout(this.timeoutId); // 기존 타이머 클리어
        this.timeoutId = setTimeout(() => {
            this.disconnect();
            console.log('Socket disconnected due to timeout');
        }, timeout);
    }

    disconnect() {
        if (this.socket) {
            this.socket.close(); // .disconnect() 대신 .close() 사용
            clearTimeout(this.timeoutId); // 타이머 클리어
        }
    }
}

export default API_socket;
