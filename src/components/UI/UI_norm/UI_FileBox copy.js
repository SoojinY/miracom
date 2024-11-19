import React, { useEffect, useRef, useState } from 'react';
import './../../STYLE/FileBox.css'; // CSS 파일을 분리하여 스타일 관리
import API_file from './../../API/API_file.js'


import * as XLSX from 'xlsx';

const FileBox = () => {
  const [DATA_File_, DATA_File] = useState(null);
  const [VAR_FileName_, VAR_FileName] = useState('');
  const VAR_file_ = useRef();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      console.log(`선택된 파일의 확장자: ${fileExtension}`);

      // 파일 이름과 크기를 콘솔에 출력
      console.log(`파일 이름: ${selectedFile.name}`);
      console.log(`파일 크기: ${selectedFile.size} bytes`);
      console.log(`파일 타입: ${selectedFile.type}`);

      // // 엑셀 파일인 경우
      // if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      //   const reader = new FileReader();

      //   reader.onload = (e) => {
      //     // FileReader로 읽은 데이터를 이용해 xlsx 라이브러리로 파싱
      //     const data = new Uint8Array(e.target.result);
      //     const workbook = XLSX.read(data, { type: 'array' });

      //     // 첫 번째 시트의 데이터를 추출
      //     const sheetName = workbook.SheetNames[0];
      //     const worksheet = workbook.Sheets[sheetName];

      //     // 데이터를 JSON으로 변환 (시트의 데이터를 객체 배열로 변환)
      //     const jsonData = XLSX.utils.sheet_to_json(worksheet);
      //     console.log("엑셀 데이터:", jsonData);
      //   };

      //   // XLSX 파일을 바이너리 형식으로 읽기
      //   reader.readAsArrayBuffer(selectedFile);

      // } else {
      // 엑셀 파일이 아닌 경우 다른 방식으로 파일 처리
      // const reader = new FileReader();

      // reader.onload = (e) => {
      //   const textData = e.target.result;
      //   console.log("텍스트 파일 데이터:", textData);
      // };

      // // 다른 파일은 텍스트 파일로 가정하고 읽기 (예: .txt)
      // reader.readAsText(selectedFile);

    }
  // };

  //   const handleFileChange = (event) => {
  //     const selectedFile = event.target.files[0];
  //     console.log("XXX");
  //     if (selectedFile) {
  //         // 파일 이름과 크기를 콘솔에 출력
  //         console.log(`파일 이름: ${selectedFile.name}`);
  //         console.log(`파일 크기: ${selectedFile.size} bytes`);
  //         console.log(`파일 타입: ${selectedFile.type}`);

  //         // 파일의 내용을 출력하려면 FileReader 사용
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //             console.log(`파일 내용(첫 100자): ${reader.result.slice(0, 100)}`); // 파일 내용 일부 출력
  //         };
  //         reader.readAsText(selectedFile);  // 파일을 텍스트로 읽기
  //         // 또는 readAsDataURL을 사용할 수 있습니다. (이미지 등 이진 파일 처리)

  //         // 파일명과 파일 데이터를 처리하는 로직
           DATA_File(selectedFile);
           VAR_FileName(selectedFile.name);
  //     }
   };



  useEffect(() => {
    VAR_file_.current = new API_file()
  }, []);



  return (
    <div className="container">
      <label className="preview">
        <input type="file" className="file" onChange={handleFileChange} />
        <p className="preview_msg">클릭 혹은 파일을 이곳에 드롭하세요.</p>
        <p className="preview_desc">{VAR_FileName_}</p>
      </label>
      {/* onClick={handleUpload}  */}
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <button onClick={() => VAR_file_.current.handleUpload(DATA_File_)} className="upload_button">
          업로드
        </button>
        {(VAR_FileName_ != '') && ( // 파일이 선택된 경우에만 제거 버튼 표시
          // onClick={handleRemove}
          <button className="remove_button">
            전체 제거
          </button>
        )}
      </div>
    </div>
  );
}

export default FileBox;