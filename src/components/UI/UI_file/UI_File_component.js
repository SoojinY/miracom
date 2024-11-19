import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import File from './UI_File_file.js';
import UI_modal from './../UI_norm/UI_modal.js';

const File_component = forwardRef((props, ref) => {
    const [DATA_file_list_, DATA_file_list] = useState([]);

    const childRef = useRef(null);

    useImperativeHandle(ref, () => ({
        MANAGE_add_file,
        MANAGE_delete_file,
        MANAGE_add_file_data,
        MANAGE_set_file,
        EXCUTE_click,
        handleFileChange,
        func_get_file_datas,
        MANAGE_clear_file
    }));
    
    const func_get_file_datas = () => {
        let data = ""; // 초기화
        DATA_file_list_.map((item) => {
            console.log(DATA_file_list_)
            data += item['content'] + '         ';  
        });
        return data; 
    };
    const MANAGE_clear_file = () => {
        DATA_file_list([]);
    };

    const MANAGE_add_file_data = (_file_name,_file_size, _file_data) => {
        // 새로운 데이터를 DATA_file_list에 추가
        DATA_file_list((prevList) => [...prevList, <File _file_name={_file_name} _file_size={_file_size} _file_data={_file_data}></File>]);
    };
    const MANAGE_set_file = (file_data) => {

        const files = Array.from(file_data);
        const fileReadPromises = files.map((file, index) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    // 파일이 성공적으로 읽히면 제목과 내용을 포함하는 객체를 resolve
                    resolve({
                        순서: [index + 1, file.name],
                        내용: event.target.result, // 파일 내용
                        사이즈: file.size
                    });
                };
                
                reader.readAsText(file); // 파일을 텍스트로 읽음
            });
        });

        Promise.all(fileReadPromises).then((formattedFiles) => {
            DATA_file_list(formattedFiles);
        });

    };
    const MANAGE_add_file = (newData) => {
        // 새로운 데이터를 DATA_file_list에 추가
        DATA_file_list((prevList) => [...prevList, newData]);
    };

    const MANAGE_delete_file = (index) => {
        // 새로운 데이터를 DATA_file_list에 추가
        DATA_file_list((prevList) => prevList.filter((_, i) => i !== index));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(file.name);
                console.log(file.size);
                console.log(e.target.result);
                const fileData = {
                    file_name: file.name,
                    content: e.target.result,
                    file_size:file.size
                };
                DATA_file_list((prevContents) => [...prevContents, fileData]);
            };
            reader.readAsText(file);
        }
        // DATA_file_list_.map((item, index) => {
        //     console.log(index); // 인덱스 출력
        //     console.log(item);  // 요소 출력
        // });
    }

    const EXCUTE_click = () => {
        if (childRef.current) {
            childRef.current.click(); // 자식 요소 클릭 이벤트 발생
        }
    };

    return (<div onClick={EXCUTE_click}>
        <input
            type="file"
            id="fileInput"
            ref={childRef}
            onChange={handleFileChange}
            style={{ display: 'hidden', opacity: 0, position: 'absolute', zIndex: -1 ,pointerEvents: 'none'}}
            
        >

        </input>
        <div    style={{display: 'flex', flexWrap: 'wrap'}}>
            {DATA_file_list_.map((value, index) => (

                <File _file_name={value.file_name} _file_size={value.file_size} _file_data={value.content}>
                    <button
                        style={{ position: 'absolute', top: 0, left: 0 }}
                        onClick={() => MANAGE_delete_file(index)} // 파일 삭제 함수 호출
                    >
                        X
                    </button></File>
            ))}
        </div>
    </div>);
});

export default File_component;