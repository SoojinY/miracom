import React, { useEffect, useRef, useState } from 'react';
import './../../STYLE/FileBox.css'; // CSS 파일을 분리하여 스타일 관리
import API_file from './../../API/API_file.js';

const FileBox = (props) => {
  const directorymap_ = props._directorymap ? props._directorymap : {}; // 디렉토리 맵을 받아옵니다.
  const directory_ = props._directory ? props._directory : ''; // 기본 디렉토리
  console.log('---------------',props._directory)
  const call_back_set_data_ = props._call_back_set_data ? props._call_back_set_data : null;
  const customMessage = props.message || '클릭 혹은 파일을 이곳에 드롭하세요.'; // 외부 메시지
  const button_ = props._button !== false ?true:false;

  const [DATA_File_, DATA_File] = useState([]);
  const VAR_file_ = useRef();

  // 파일 선택 처리
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      console.log(`선택된 파일의 확장자: ${fileExtension}`);

      // 파일 이름과 크기를 콘솔에 출력
  console.log('button',props._button )
      console.log(`파일 이름: ${selectedFile.name}`);
      console.log(`파일 크기: ${selectedFile.size} bytes`);
      console.log(`파일 타입: ${selectedFile.type}`);

      DATA_File(prevData => [...prevData, selectedFile]); // 선택된 파일 상태에 추가
    }
  };

  // 디렉토리 이름에 따라 API 호출
  const handleGetFiles = async (directory) => {
    try {
      // `directory`에 맞는 API 호출
      VAR_file_.current = new API_file(directory);
      const response = await VAR_file_.current.handleGet();
      console.log(response); // API에서 받은 데이터 확인용
      console.log("Data Fetch Completed");

      const filesList = response.files.map(file => ({
        name: file.name,
        content: file.content
      }));

      // 부모 컴포넌트의 콜백으로 데이터 전달
      if (call_back_set_data_) {
        call_back_set_data_(filesList); // 부모 컴포넌트로 데이터 전달
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // API 호출 시 디렉토리 값을 바꾸어 데이터 가져오기
  useEffect(() => {
    console.log(directory_)
    if (directory_ && directorymap_[directory_]) {
      handleGetFiles(directorymap_[directory_]);
    }
  }, [directory_]);

  // 파일 업로드 처리
  const handleUpload = () => {
    console.log(directory_,'              : ',directorymap_[directory_])
    if (directory_ && directorymap_[directory_]) {
      // 업로드 시 해당 디렉토리로 파일 업로드
      VAR_file_.current = new API_file(directorymap_[directory_]);
      VAR_file_.current.handleUpload(DATA_File_);
      DATA_File([]); // 업로드 후 파일 목록을 비웁니다.
    } else {
      alert("디렉토리가 설정되지 않았습니다.");
    }
  };

  // 파일 목록 제거 처리
  const handleRemove = () => {
    // 모든 파일 목록을 지웁니다.
    DATA_File([]); // 상태 초기화
    console.log("전체 파일이 제거되었습니다.");
  };

  return (
    <div className="container">
      <label className="preview" style={{height:button_?'80%':'100%'}}>
        <input type="file" className="file" onChange={handleFileChange} />
        <p className="preview_msg" style={{fontSize:'0.9vw'}} >{customMessage}</p>
        <ul>
          {DATA_File_.length > 0 ? (
            DATA_File_.map((file, index) => (
              <li key={index} style={{fontSize:'0.9vw'}}>{file.name}</li>
            ))
          ) : (
            <p style={{fontSize:'0.9vw'}}>선택된 파일이 없습니다.</p>
          )}
        </ul>
      </label>
  
  
      {button_ && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center', 
            width: '80%', 
            height:'20%'
          }}
        >
          <button
            onClick={handleUpload}
            className="upload_button"
            style={{ width: '45%' ,fontSize:'0.9vw',padding:'1px'}} // 너비 40%
          >
            업로드
          </button>
  
          {VAR_file_.current !== '' && ( // 파일이 선택된 경우에만 제거 버튼 표시
            <button
              onClick={handleRemove}
              className="remove_button"
              style={{ width: '45%',fontSize:'0.9vw',padding:'1px' }} // 너비 40%
            >
              전체 제거
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FileBox;
