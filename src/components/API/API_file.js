// import React, { forwardRef,useEffect, useState,useImperativeHandle } from 'react';
// import axios from 'axios';

// const API_file=forwardRef((props, ref) => {
//     const SET_SERVER_ADDRESS='10.0.33.11:4303'
//     useImperativeHandle(ref, () => ({
//         handleUpload
//       }));

//     const handleUpload = async (file) => {
//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//           const response = await fetch('http://localhost:4303/upload', {
//             method: 'POST',
//             body: formData,
//           });
//           if (response.ok) {
//             alert('파일 업로드 성공');
//           } else {
//             alert('파일 업로드 실패');
//           }
//         } catch (error) {
//           alert('서버 오류');
//         }
//       };
// })
// export default API_file;


// import React, { forwardRef,useEffect, useState,useImperativeHandle } from 'react';
// import axios from 'axios';

// class API_file {
//     constructor(){
//         this.SET_SERVER_ADDRESS='10.0.33.11:4303'
//     }


//     handleUpload = async (file) => {
//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await axios.post('http://10.0.33.11:4304/upload', formData, {
//             });
//             if (response.status === 200) {
//                 alert('파일 업로드 성공');
//             } else {
//                 alert('파일 업로드 실패');
//             }
//         } catch (error) {
//           alert('서버 오류');
//         }
//       };
// }
// export default API_file;


// import axios from 'axios';

// class API_file {
//     constructor(directory_) {
//         this.SET_SERVER_ADDRESS = 'http://10.0.33.11:4304';  // 서버 주소 설정
//         this.directory=directory_
//     }
//     handleGet = async () => {
//         try {
//             const response = await axios.get(`${this.SET_SERVER_ADDRESS}/files?dir=./uploads/${this.directory}&format=json`);
//             if (response.status === 200) {
//                 console.log('데이터 가져오기 성공:', response.data);
//                 return response.data; // 서버에서 반환한 데이터를 반환
//             } else {
//                 alert('데이터 가져오기 실패');
//                 return null;
//             }
//         } catch (error) {
//             console.error('데이터 가져오기 중 오류 발생:', error);
//             alert('서버 오류');
//             return null;
//         }
//     };

//     handleUpload = async (file) => {
//         const formData = new FormData();
//         file.forEach(f => {
//             formData.append('file', f);  // 'file'은 서버에서 처리할 때 사용되는 폼 필드 이름
//           });
//         formData.append('directory', this.directory);

//         try {
//             const response = await axios.post(`${this.SET_SERVER_ADDRESS}/upload`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 }
//             });
//             if (response.status === 200) {
//                 alert('파일 업로드 성공');
//             } else {
//                 alert('파일 업로드 실패');
//             }
//         } catch (error) {
//             console.error('파일 업로드 중 오류 발생:', error);
//             alert('서버 오류');
//         }
//     };
// }

// export default API_file;






import axios from 'axios';

class API_file {
    constructor(directory_) {
        this.SET_SERVER_ADDRESS = 'http://10.0.33.11:4305';  // 서버 주소 설정
        this.directory = directory_
    }


    handleGet = async (directory) => {
        try {
            const response = await axios.get(`${this.SET_SERVER_ADDRESS}/files?dir=./uploads/${directory}&format=json`);
            if (response.status === 200) {
                console.log('서버에서 받은 데이터:', response.data);
    
                // 서버 응답이 객체이고 files라는 배열이 포함된 경우
                if (response.data && Array.isArray(response.data.files)) {
                    // files 배열을 { name: 파일명 } 객체 배열로 변환
                    const fileObjects = response.data.files.map(fileName => ({ name: fileName }));
                    console.log('변환된 파일 목록:', fileObjects);
                    return fileObjects;  // 변환된 객체 배열 반환
                } else {
                    console.error('서버 응답에서 files 배열을 찾을 수 없습니다:', response.data);
                    alert('서버 응답 데이터 형식이 잘못되었습니다.');
                    return null;
                }
            } else {
                alert('데이터 가져오기 실패');
                return null;
            }
        } catch (error) {
            console.error('데이터 가져오기 중 오류 발생:', error);
            alert('서버 오류');
            return null;
        }
    };



    handleUpload = async (file,directory) => {
        const formData = new FormData();
        file.forEach(f => {
            formData.append('file', f);  // 'file'은 서버에서 처리할 때 사용되는 폼 필드 이름
        });
        formData.append('directory', directory);

        try {
            const response = await fetch(`${this.SET_SERVER_ADDRESS}/upload`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('파일 업로드 성공');
            } else {
                alert('파일 업로드 실패');
            }
        } catch (error) {
            alert('서버 오류');
        }
    };

    handleDelete = async (directory) => {
        try {
            console.log('-------------------------------------')
            console.log(directory)
            const response = await axios.delete(`${this.SET_SERVER_ADDRESS}/delete?dir=./uploads/${directory}`, {
            });
            if (response.status === 200) {
                alert('파일 삭제 성공');
            } else {
                alert('파일 삭제 실패');
            }
        } catch (error) {
            console.error('파일 삭제 중 오류 발생:', error);
            alert('서버 오류');
        }
    };
}

export default API_file;
