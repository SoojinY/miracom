import React, { useState, useRef } from 'react';

const UserInfo = () => {

  const defaultName = '오성'; // 이름
  const defaultPosition = '데이터마이닝'; // 부서 (직책 자리 대신)

  const [isBoxOpen, setIsBoxOpen] = useState(false);  // 정보 박스를 열거나 닫는 상태 관리
  const [boxPosition, setBoxPosition] = useState({ left: 0, top: 0 });  // 박스의 위치 상태
  const boxRef = useRef(null);  // 정보 박스를 참조할 ref
  const iconRef = useRef(null);  // 프로필 아이콘을 참조할 ref

  // 클릭 시 정보 박스를 열고 닫는 핸들러
  const handleProfileClick = (e) => {
    setIsBoxOpen(!isBoxOpen);  // 박스 열기/닫기

    const rect = iconRef.current.getBoundingClientRect();  // 아이콘의 위치 계산
    const boxWidth = 250;  // 정보 박스 너비

    // 박스의 위치를 아이콘의 중심에 맞추어 설정
    setBoxPosition({
      left: rect.left + rect.width / 2 - boxWidth,  // 아이콘 중심을 기준으로 왼쪽 위치 설정
      top: rect.top + rect.height + 10,  // 아이콘 바로 아래에 위치 설정
    });
  };

  return (
    <div style={{ }}>
      {/* 사용자 프로필 아이콘 */}
      <div
        ref={iconRef}  // 프로필 아이콘에 ref 연결
        style={{
          position: 'absolute',        // 화면 고정
          top: '10px',              // 상단 10px
          right: '10px',            // 우측 10px
          width: '50px',            // 아이콘 크기
          height: '50px',
          borderRadius: '50%',      // 동그랗게
          backgroundColor: '#E3D3F7', 
          display: 'flex',          // 가운데 정렬
          justifyContent: 'center', // 가로 중앙 정렬
          alignItems: 'center',     // 세로 중앙 정렬
          color: 'white',           // 글자색
          fontSize: '0.7vw',        // 글자 크기
          fontWeight: 'bold',       // 글자 두께
          cursor: 'pointer',       // 클릭 가능 표시
          boxSizing: 'border-box',
          zIndex:9999
        }}
        onClick={handleProfileClick}  // 클릭 시 정보 박스 열기
      >
        {defaultName.slice(0, 3).toUpperCase()}  {/* 이니셜 표시 */}
      </div>

      {/* 사용자 정보 박스 */}
      {isBoxOpen && (
        <div
          ref={boxRef}  // 박스에 ref 연결
          style={{
            position: 'fixed',
            left: `${boxPosition.left}px`,  // 아이콘 중심을 기준으로 왼쪽 위치 설정
            top: `${boxPosition.top}px`,    // 아이콘 바로 아래에 위치 설정
            border: '1px solid #ccc',
            backgroundColor:'#fff',
            borderRadius: '8px',
            width: '250px',  // 박스 너비를 조금 넓힘
            padding: '15px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.3s ease-in-out', // 애니메이션 추가
            zIndex: 9999,  // 다른 요소들보다 앞에 나오도록 z-index 설정
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: '10px',
            borderRadius: '8px',  // 둥근 모서리
            padding: '10px 20px',  // 내부 여백
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              fontSize: '1.1vw',  // 텍스트 크기
              color: '#333',  // 텍스트 색
              marginBottom: '8px',  // 텍스트 간 간격
            }}>
              <span>{defaultName}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              fontSize: '1.1vw',  // 텍스트 크기
              color: '#555',  // 텍스트 색
            }}>
              <span>{defaultPosition}</span>
            </div>
          </div>

        </div>
      )}

      {/* 애니메이션 스타일 */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default UserInfo;
