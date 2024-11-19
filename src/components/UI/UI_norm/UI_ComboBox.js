
import { React, useState, useRef, useEffect } from 'react';
import './../../STYLE/norm_ComboBox.css'; // 스타일 파일을 따로 만들어서 임포트
import './../../STYLE/page.css';
import Icons from './../UI_mapper/UI_Mapper_Icon';


import {ICON_comboboxSide, ICON_newChat}from '../../Icon.js';

const Combobox = ({ _information, _options, _CALL_BACK }) => {
    const [selectedOption, setSelectedOption] = useState(_options ? _options[0] : null);
    const information_ = useRef(_information ? _information : {});

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (_CALL_BACK) {
            _CALL_BACK(option.value, true); // 콜백 호출
        }
    };





    const [isOpen, setIsOpen] = useState(false);
    const comboBoxRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // 콤보박스 외부를 클릭한 경우
            if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // 이벤트 리스너 등록
        document.addEventListener('click', handleClickOutside);

        // 컴포넌트 언마운트 시 리스너 제거
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);



    return (
        <div ref={comboBoxRef} className="combo-box-container" onClick={() => setIsOpen(!isOpen)} 
        // style={{ 
        //     position: 'relative', 
        //     minWidth: '100px', 
        //     height: '100%' }}
            >
            <div className="combo-box text-token-text-secondary" onClick={() => setIsOpen(!isOpen)} 
            // style={{ 
            //     display: 'flex', 
            //     justifyContent: 'center', 
            //     cursor: 'pointer', 
            //     textAlign: 'center', 
            //     lineHeight: '50px', 
            //     height: '90%', 
            //     alignItems: 'center', 
            //     borderRadius: '10px' }}
                >
                {selectedOption ? selectedOption.label : '-'}
                <ICON_comboboxSide _className="icon-md text-token-text-tertiary" _size="24"></ICON_comboboxSide>
                {/* <img src={Icons.Icon_combobox_side} alt="화살표" style={{ aspectRatio: 1, height: '50%', verticalAlign: 'middle' }}></img> */}
            </div>
            {isOpen && (
                <div className="shadowbox combo-box-option" 
                // style={{ position: 'absolute', 
                // width: '600px', 
                // top: '100%', 
                // backgroundColor: '#ffffff', 
                // border: '1px solid #ccc', 
                // zIndex: 1000 }}
                >
                    {_options && _options.map((option) => (
                        <div key={option.value} className="option" onClick={() => handleSelect(option)} style={{ height: '70px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <div
                                style={{
                                    borderRadius: '50%',
                                    backgroundColor: selectedOption && selectedOption.label === option.label ? '#00FF00' : '#333333',
                                    width: '2vw',
                                    aspectRatio: 1,
                                    margin: '10px',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex', // flexbox 사용
                                    justifyContent: 'center', // 수평 중앙 정렬
                                    alignItems: 'center', // 수직 중앙 정렬
                                }}
                            >
                                <ICON_newChat _className="icon-xl-heavy" _size="24"></ICON_newChat>
                            </div>
                            <div style={{ width: '70%' }}><div style={{ alignItems: 'center', fontSize: '0.8em', fontWeight: 'bold' }}>{option.label}</div>
                                {information_.current.hasOwnProperty(option.value) && (<div style={{ fontSize: '0.4em' }}>{information_.current[option.value]}</div>)}
                            </div>
                            {selectedOption && selectedOption.label === option.label && (<img src={Icons.Icon_check} alt={option.label} style={{ width: '15px', height: '15px', margin: '2px', marginLeft: '10px', marginTop: '2px', objectFit: 'cover' }} ></img>)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


// 사용 예시
// <Combobox _options={pageOptions} _CALL_BACK={handlePageChange} />
export default Combobox;
