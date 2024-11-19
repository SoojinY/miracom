import React, { useEffect, useRef,useState } from 'react';
import './../STYLE/page.css';

const PAGE_Main_Index = (_PAGE,_CALLBACK) => {
  let PAGE_=_PAGE;
  let CALLBACK_=_CALLBACK;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('111111111111111111');
    console.log(_CALLBACK);
    if (_CALLBACK) _CALLBACK(PAGE_);
    return PAGE_;
  };

  return (
      <div className='index-page' style={{
        display:'flex',
        justifyContent:'center',
        flexDirection: 'column',
        backgroundColor: '#111111',
        textAlign: 'center',
        width:'100%',
        height:'100%', 
        // fontFamily: 'Arial, sans-serif'
        }}>
        <div>
          <span style={{ 
            height: '90px', 
            textAlign: 'center', 
            color: '#ffffff', 
            fontSize: '30px', 
            marginBottom:'40px' 
            }}>무엇을 도와드릴까요?</span>
        </div>
        <div style={{
          display:'flex',
          justifyContent:'center',
          fheight: '22%', 
          backgroundColor: '#111111',
          width: '100%', 
          textAlign: 'center',
          alignItems:'center' }}>
          <form onSubmit={handleSubmit} style={{ 
            display: 'flex',
            width: '60%',
            backgroundColor:'#222222', 
            padding: '10px',
            borderRadius: '26px' }}>
            <input
              type="text"
              color='#ffffff'
              placeholder="Ask a question..."
              required
              style={{ flex: 1, padding: '5px' ,background: 'none',
                border: 'none',
                outline:'none',
                color:'#ffffff',
                fontSize:'15px'
              }}

          
            />
            <button type="submit"  style={{ paddingLeft: '10px',paddingRight: '10px', backgroundColor: '#555555', color: '#222222',fontSize:'20px',fontWeight: '900', border: 'none', borderRadius: '50%', cursor: 'pointer', justifyContent: 'center', alignItems: 'center'}}>
              ⬆
            </button>
          </form>
        </div>
    </div>
  );



  
};

export default PAGE_Main_Index;