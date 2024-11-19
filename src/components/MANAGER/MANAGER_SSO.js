// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// // 소켓 서버 URL (외부 서버로 연결)112.107.220.134, Port : 443
// //www.stage.idp.samsung.net
// const SOCKET_URL = '112.107.220.134:443';

// const MANAGE_SSO = () => {
//     const [socket, setSocket] = useState(null);
//     const [message, setMessage] = useState(null);
//     const [connected, setConnected] = useState(false);  // 연결 상태 관리

//     // 소켓 연결 및 메시지 수신 설정
//     useEffect(() => {
//         console.log("AAAAAAAAAAAAAAAA - useEffect (Socket Initialization)");

//         const socketConnection = io(SOCKET_URL, {
//             transports: ['websocket'],  // WebSocket만 사용하도록 설정
//             reconnectionAttempts: 5,    // 최대 5번 재연결 시도
//             reconnectionDelay: 1000,    // 재연결 시도 간 간격 (1초)
//             reconnectionDelayMax: 5000, // 재연결 간 최대 간격 (5초)
//             timeout: 10000,             // 연결 시도 타임아웃 (10초)
//         });

//         // 소켓 연결 성공 시
//         socketConnection.on('connect', () => {
//             console.log(`Socket connected with ID: ${socketConnection.id}`);
//             setConnected(true); // 연결 상태를 true로 설정
//         });

//         // 소켓 연결 실패 시
//         socketConnection.on('connect_error', (error) => {
//             console.error('Socket connection failed:', error);
//             setConnected(false); // 연결 실패 시 상태를 false로 설정
//         });

//         // 서버로부터 받은 데이터 처리
//         socketConnection.on('data', (data) => {
//             console.log('Received data from server:', data);
//             receiveMessage(data); // 메시지 수신 처리 함수 호출
//         });

//         // 재연결 시도에 대한 이벤트 핸들링
//         socketConnection.on('reconnect_attempt', (attempt) => {
//             console.log(`Reconnection attempt #${attempt}`);
//         });

//         socketConnection.on('reconnect_error', (error) => {
//             console.error('Reconnection failed:', error);
//         });

//         socketConnection.on('reconnect', (attempt) => {
//             console.log(`Reconnected successfully on attempt #${attempt}`);
//         });

//         socketConnection.on('disconnect', () => {
//             console.log('Socket disconnected');
//             setConnected(false); // 연결이 끊어지면 상태를 false로 설정
//         });

//         setSocket(socketConnection); // 소켓 객체 설정

//         // 컴포넌트 언마운트 시 소켓 연결 종료
//         return () => {
//             console.log("Disconnecting socket...");
//             socketConnection.disconnect();
//             console.log("Socket disconnected");
//         };
//     }, []); // 빈 배열로 한 번만 실행 (컴포넌트 마운트 시)

//     // 소켓이 준비되면 메시지를 전송하는 useEffect
//     useEffect(() => {
//         if (socket && connected) {
//             console.log("Socket is ready, sending message...");
//             sendMessage();  // 소켓이 준비되면 메시지 전송
//         }
//     }, [socket, connected]);  // socket과 connected 상태가 변경될 때마다 실행

//     const sendMessage = () => {
//         if (socket && connected) {
//             const messageToSend = '{"rqtype":"MiraGen","token":"","data":"KCPCRTRAY0008"}';
//             console.log("Sending message to server:", messageToSend);
//             socket.emit('message', messageToSend); // 'message' 이벤트로 서버에 메시지 전송
//         }
//     };

//     // 서버로부터 받은 메시지를 처리하는 함수
//     const receiveMessage = (data) => {
//         console.log('Processing received message:', data);  // 받은 메시지 처리 로그
//         setMessage(data); // 받은 메시지를 상태에 저장
//     };

//     return (
//         <div>
//             <h2>Socket Communication</h2>
//             <p>{connected ? "Connected to the server" : "Disconnected from the server"}</p>
//             <p>{message ? `Received message: ${JSON.stringify(message)}` : 'No message received yet.'}</p>
//         </div>
//     );
// };

// export default MANAGE_SSO;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MANAGE_SSO = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendPostRequest = async () => {
      console.log("POST 요청을 보냅니다...");

      try {
        const payload = {
          rqtype: "MiraGen",
          token: "",  // 필요에 따라 토큰을 채울 수 있습니다.
          data: "KCPCRTRAY0008"
        };

        console.log("보내는 데이터:", JSON.stringify(payload));

        // POST 요청 보내기
        const response = await axios.post('https://112.107.220.134:443', payload, {
          headers: {
            'Content-Type': 'application/json', // 서버가 JSON 데이터를 처리한다고 가정
          },
        });

        // 응답 데이터를 상태에 저장
        console.log("서버로부터 받은 응답:", response.data);
        setResponseData(response.data);
      } catch (err) {
        console.error("요청 중 에러 발생:", err);
        setError(err);
      } finally {
        setLoading(false);
        console.log("요청 완료");
      }
    };

    sendPostRequest();
  }, []);


  return (
    <div>
    </div>
  );
};

export default MANAGE_SSO;
