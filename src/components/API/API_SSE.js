// // StreamingComponent.js
// import React, { useEffect, useState } from 'react';

// const API_sse = ({CALL_BACK,CALL_BACK_END }) => {
//     const [data, setData] = useState([]);
//   const [isStreaming, setIsStreaming] = useState(false);
//   let eventSource;  // EventSource를 상태가 아닌 변수로 관리

//   const startStreaming = () => {
//     if (isStreaming) return; // 이미 스트리밍 중이면 리턴

//     eventSource = new EventSource('http://10.0.33.11:4300/api');
//     setIsStreaming(true);

//     eventSource.onmessage = (event) => {
//       setData((prevData) => [...prevData, event.data]);
//       CALL_BACK(data)
//     };
//   };

//   const stopStreaming = () => {
//     if (eventSource) {
//       eventSource.close();
//       setIsStreaming(false);
//       CALL_BACK_END();
//     }
//   };

//   useEffect(() => {
//     // 컴포넌트 언마운트 시 EventSource 연결 종료
//     return () => {
//       stopStreaming(); // 언마운트 시 연결 종료
//     };
//   }, []);


// };

// export default API_sse;


// StreamingComponent.js
import React, { useEffect, useState } from 'react';

class API_sse {
    constructor(url, _CALL_BACK_MESSAGE, _CALL_BACK_MESSAGE_END, timeout = 600 * 1000) {
        this.inited=false;
        this.url = url;//'http://10.0.33.11:4300/api'
        this.eventSource = null;
        this.timeoutDuration = timeout;
        this.VAR_CALL_BACK_END_MESSAGE_ = 'end_______data';
        this.CALL_BAK_MESSAGE_ = _CALL_BACK_MESSAGE;
        this.CALL_BACK_MESSAGE_END_ = _CALL_BACK_MESSAGE_END;
        this.isStreaming=false;
    }
    check=()=>{
        if(this.inited==false){
            return 'false'
        }
        if(this.isStreaming){
            return 'stream'
        }
        return 'true'
    }
    stopStreaming = () => {
        console.log("end ssee")
        if (this.eventSource) {
            this.eventSource.close();
        }
        this.isStreaming = false;
        this.CALL_BACK_MESSAGE_END_();
      };
    sendMessage = async (input) => {
        if (this.isStreaming) return; // 이미 스트리밍 중이면 리턴

        this.isStreaming = true;

        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: input
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            while (this.isStreaming) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                
                this.CALL_BAK_MESSAGE_(chunk);
                
                // 종료 조건 예시
                // if (chunk.includes('end_______data')) {
                //     this.stopStreaming();
                
                
            console.log("do")// }
            }
            this.stopStreaming();
        } catch (error) {
            this.CALL_BAK_MESSAGE_('서버 작업중입니다. 연결하실 수 없습니다.');
            // console.error('Streaming error:', error);
            this.stopStreaming();
        }
    };


//   sendMessage = () => {
//     if (this.isStreaming) return; // 이미 스트리밍 중이면 리턴

//     this.eventSource = new EventSource(this.url);
//     this.isStreaming=true;

//     this.eventSource.onmessage = (event) => {
//         console.log(event.data);
//         this.CALL_BAK_MESSAGE_(event.data)
//       if(event.data.includes('end_______data')){
//         this.stopStreaming()
//       }
//     };
//   };


};

export default API_sse;
