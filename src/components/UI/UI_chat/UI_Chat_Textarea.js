import React, { useState,useRef } from 'react';

const UI_Chat_Textarea=(props)=> {
  const [userInput, setUserInput] = useState('');
  const textareaRef = useRef(null);

  const CALL_BACK_submit_=props._CALL_BACK_submit?props._CALL_BACK_submit:null;
  const CALL_BACK_change_=props._CALL_BACK_change?props._CALL_BACK_change:null;

  const option = props._option ? props._option : {
    backgoundcolor: '#111111',
    chatbackgoundcolor: '#222222',
    speechcolor: '#333333',
    chatoutline: 'none',
    chatoutlinecolor: 'transparent',
    speechtextcolor: '#ffffff',
  }



  const handleInputChange = (event) => {
    setUserInput(event.target.value); // 상태 업데이트
    CALL_BACK_change_(event)
  };

  const handleInput = (props) => {
    const textarea = textareaRef.current;
    // 텍스트 영역의 높이를 자동으로 조정
    textarea.style.height = 'auto';  // 먼저 높이를 초기화
    textarea.style.height = `${textarea.scrollHeight}px`;  // 콘텐츠에 맞는 높이로 설정
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault(); 
        if (CALL_BACK_submit_)CALL_BACK_submit_(event);
        setUserInput('')
        
        textareaRef.current.style.height = 'auto';  // 먼저 높이를 초기화
        textareaRef.current.style.height = `${0}px`;  
        // setTimeout(handleInput, 0.01); 
      }
    }
  };

  return (
    <div style={{position:'relative',width:'100%',height:'100%'}}>
    <textarea
    ref={textareaRef}
      value={userInput} 
      rows="1"
      onChange={handleInputChange} 
      onKeyDown={handleKeyDown}  
      onInput={handleInput}
      placeholder="..."  
      required  
      style={{ // 절대 위치
        position: 'absolute',  // 절대 위치
        bottom: 0,  // 부모 요소의 하단에 배치
        left: 0,  // 부모 요소의 좌측에 배치
        backgroundColor:option.chatbackgoundcolor,
        borderRadius:'25px',
        border: 'none',
        outline: 'none',
        color: '#000',
        fontSize: '0.8em',
        alignItems: 'center',
        margin: '0px',
        padding: '8px',
        minHeight: '20px',  // 최소 높이
        maxHeight: '100px', // 최대 높이
        width: '100%',  // 부모 요소 너비에 맞게 설정
        boxSizing: 'border-box',
        resize: 'none',  // 크기 조정 불가
        lineHeight: 'normal',
        overflowY: 'hidden',  // 위로만 커지도록
        fontFamily : 'Roboto'
      }}
    /></div>
  );
}


export default UI_Chat_Textarea;
