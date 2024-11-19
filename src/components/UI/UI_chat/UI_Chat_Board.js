import React, { useEffect, forwardRef, useRef, useState, useImperativeHandle } from 'react';

import API_axios from './../../API/API_axios.js';
import API_socket from './../../API/API_socket.js';
import File_component from './../UI_file/UI_File_component.js';
import Speech from './UI_Chat_Speech.js';
import UI_CircleSpinner from './../UI_norm/UI_CircleSpinner.js';
import UI_Chat_Textarea from './UI_Chat_Textarea.js'

import './../../STYLE/scroll.css';
import OpenAI from "openai";
import API_SSE from './../../API/API_SSE.js'
import Icon_clip from "./../../../Icon/Icon_clip.png"
// import { io } from 'socket.io-client';


const Board = forwardRef((props, ref) => {
  // const inited = useRef(localStorage.getItem(props.page_key)?true:false);
  const fileComponent = useRef(null);
  const sse_url = useRef(props.url ? props.url : '');

  const [page_key, set_page_key] = useState(props.page_key ? props.page_key : null);

  const scrollableDivRef = useRef(null);//스크롤 내리기
  const [isLoading, setIsLoading] = useState(false);//서버가 응답할때까지 채팅 막기

  const [userInput, setUserInput] = useState('');
  const messagesRef = useRef(localStorage.getItem(page_key) ? JSON.parse(localStorage.getItem(page_key)) : [])
  const [messages, setMessages] = useState(
    localStorage.getItem(page_key) ? JSON.parse(localStorage.getItem(page_key)) : []
    // props.message?
    //   localStorage.getItem(page_key) ? 
    //     [{text:props.message,sender:'user'},...JSON.parse(localStorage.getItem(page_key))] : [{text:props.message,sender:'user'}]
    //   :localStorage.getItem(page_key) ?
    //     JSON.parse(localStorage.getItem(page_key)) : []
  );


  const option = props._option ? props._option : {
    backgoundcolor: '#111111',
    chatbackgoundcolor: '#222222',
    speechcolor: '#333333',
    chatoutline: 'none',
    chatoutlinecolor: 'transparent',
    speechtextcolor: '#ffffff',
  }




  useImperativeHandle(ref, () => ({
    MANAGE_add_message
  }));


  const MANAGE_add_message = (message, user) => {
    const newMessage = { text: message, sender: user }
    messagesRef.current = [...messagesRef.current, newMessage];
    // setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  const MANAGE_change_message = (newText) => {

    messagesRef.current[messagesRef.current.length - 1] = {
      ...messagesRef.current[messagesRef.current.length - 1],
      text: messagesRef.current[messagesRef.current.length - 1].text + newText
    };
    return messagesRef.current
    // setMessages((prevMessages) => {

    // const updatedMessages = [...prevMessages];

    // // 배열 복사
    // updatedMessages[updatedMessages.length - 1] = {
    //   ...updatedMessages[updatedMessages.length - 1],
    //   text: updatedMessages[updatedMessages.length - 1].text + newText
    // };

    // return updatedMessages; // 새로운 배열 반환
    // });
  };

  const func_socket_end = () => {
    setIsLoading(false);

    if (page_key) localStorage.setItem(page_key, JSON.stringify(messagesRef.current));
    if (scrollableDivRef.current) {
      setTimeout(() => {
        scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
      }, 2); 
    }

    console.log(messages)

  };

  const VAR_socket_ = useRef(null);
  const VAR_sse_ = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLoading) return
    // const newMessage = { text: userInput, sender: 'user' };
    // setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);
    let response = null;
    try {

      VAR_socket_.current.sendMessage(userInput)
      MANAGE_add_message(userInput, 'user');
      MANAGE_add_message('', 'bot');
      setIsLoading(true);

    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = { text: "Error fetching response: '''javascript int test_code = 200 \r\n const api=(test_input)=>{return(<div>{test_input}</div>)} '''가나다\n\n 1. 예제입니다\n\n 2. 예제가 맞습니다\n\n", sender: 'bot' };
      MANAGE_add_message(errorMessage, 'user');
    }

    setUserInput('');

  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    // const newMessage = { text: userInput, sender: 'user' };
    // setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);
    let response = null;
    try {
      // ------------------------------------post

      setMessages((prevMessages) => [...prevMessages, { text: userInput, sender: 'user' }]);
      response = await API_axios(userInput);
      let responseMessage = null;

      if (response) {
        responseMessage = { text: response, sender: 'bot' }
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
        setIsLoading(false);
      }
      else {
        throw new Error(JSON.stringify(response));
      }

    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = { text: "Error fetching response: '''javascript int test_code = 200 \r\n const api=(test_input)=>{return(<div>{test_input}</div>)} '''가나다\n\n 1. 예제입니다\n\n 2. 예제가 맞습니다\n\n", sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setUserInput('');
    setIsLoading(false)

  };

  const handleSubmit3 = (e) => {
    e.preventDefault()
    // const check=VAR_sse_.current.check();
    // if(check=='false'){
    // if(check==false){
    //   VAR_sse_.current = new API_SSE(sse_url.current, MANAGE_change_message, func_socket_end);
    // }
    connect(userInput)
  };

  const connect = (input = '') => {
    console.log(input)
    if (isLoading) return
    const input_file_data = fileComponent.current.func_get_file_datas();
    fileComponent.current.MANAGE_clear_file();
    setIsLoading(true);
    try {
      MANAGE_add_message(input_file_data + input, 'user');
      MANAGE_add_message('', 'bot');
      VAR_sse_.current.sendMessage(input)
      setIsLoading(true);

    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = { text: "서버 작업중 연결 불가합니다.", sender: 'bot' };
      
      MANAGE_add_message(errorMessage, 'bot');
      isLoading(false);
    }

    setUserInput('');
  }

  ///////////////////////////////////////////////file_setting

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {

      fileComponent.current.MANAGE_add_file_data(files);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // 기본 동작 방지
  };

  const handleButtonClick = () => {
    fileComponent.current.EXCUTE_click();
  };




  // useEffect(() => {
  //   VAR_socket_.current = new API_socket('ws://10.0.41.11/ws/code_assistant:',MANAGE_change_message,func_socket_end)
  //   return () => {
  //     VAR_socket_.current.disconnect();
  //   };

  // }, []);

  useEffect(() => {
    VAR_sse_.current = new API_SSE(sse_url.current, MANAGE_change_message, func_socket_end)

    if (messagesRef.current.length == 0) {
      setUserInput(props.message)
      connect(props.message);
    }
  }, []);



  useEffect(() => {
    // if (page_key) localStorage.setItem(page_key, JSON.stringify(messages));

    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  }, [messagesRef.current]);


  return (
    <div onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ display: 'flex', background: option.background, justifyContent: 'center', flexDirection: 'column', backgroundColor: option.backgoundcolor, textAlign: 'center', width: '100%', height: '100%', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '90%', textAlign: 'center' }}>
        <div ref={scrollableDivRef} style={{ display: 'flex', flexDirection: 'column', width: '60%',maxWidth: '60%', backgroundColor: option.boardcolor ? option.boardcolor : '#000000', border: option.boardborder ? option.boardborder : '', height: '100%', overflowY: 'scroll' , textAlign: 'center'}}>
          {messagesRef.current.map((msg, index) => (
            <Speech key={index} _text={msg.text} _text_color={option.speechtextcolor} _ui_color={option.speechcolor} _ui_alligin={msg.sender === 'user' ? true : false}></Speech>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', height: '10%', backgroundColor: 'transparent', width: '100%', textAlign: 'center', alignItems: 'center', borderRadius: '26px' }}>
        <div style={{ display: 'flex', width: '60%',height:'30px', backgroundColor: option.chatbackgoundcolor, padding: '5px', borderRadius: '26px', outlineWidth: option.chatoutline, outlineColor: option.chatoutlinecolor }}>
          <form onSubmit={handleSubmit3} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

            <div>
            
              <File_component ref={fileComponent}></File_component>
            </div>

            <div style={{ display: 'flex',alignItems:'center',borderBottom: '2px solid black', borderWidth: option.chatoutline, borderColor: option.chatoutlinecolor,zIndex:99 }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><img src={Icon_clip} disabled={isLoading} onClick={handleButtonClick} style={{ width: '20px', height: '20px', filter: option.filter ? option.filter : '', cursor: 'pointer' }}></img></div>
              <UI_Chat_Textarea _CALL_BACK_submit={handleSubmit3} _CALL_BACK_change={handleInputChange} _option={option}></UI_Chat_Textarea>
              {/* <textarea
  type="text"
  value={userInput}
  onChange={handleInputChange}
  placeholder="..."
  required
  style={{
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ffffff',
    fontSize: '15px',
    alignItems:'center',
    
    margin: '0px',
    maxHeight:'40px',
    width:'100%',
    color: option.submittextcolor ? option.submittextcolor : '#ffffff',
    resize: 'none',      
  }}
/> */}
              <button type="submit" disabled={isLoading} style={{width:'30px',height:'30px',
                paddingLeft: '10px', paddingRight: '10px', backgroundColor: option.submitcolor ? option.submitcolor : '#555555',
                color: option.submitarrowcolor ? option.submitarrowcolor : '#222222', fontSize: '20px', fontWeight: '900', border: 'none', borderRadius: '50%', cursor: 'pointer', justifyContent: 'center', alignItems: 'center', borderWidth: option.chatoutline, borderColor: option.chatoutlinecolor
              }}>
                {isLoading ?  <UI_CircleSpinner /> : '⬆'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );

});

export default Board;