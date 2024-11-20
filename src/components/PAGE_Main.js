// #F6F7F9

import React, { useEffect, useRef, useState } from 'react';

import PAGE_CodeAssistant from './PAGE/PAGE_CodeAssistant.js';
import PAGE_MiraTalk from './PAGE/PAGE_MiraTalk.js';
import PAGE_LifeGuide from './PAGE/PAGE_LifeGuide.js';
import PAGE_SolutionGuide from './PAGE/PAGE_SolutionGuide.js';
import PAGE_MiraSaleGuide from './PAGE/PAGE_MiraSaleGuide.js';
import PAGE_SupportProject from './PAGE/PAGE_SupportProject.js';
import PAGE_ADMIN_Permission from './PAGE/PAGE_ADMIN_Permission.js';
import PAGE_Subscribe from './PAGE/PAGE_Subscribe.js';

import PAGE_NewPage from './PAGE/PAGE_NewPage.js';

import Sidebar from './UI/UI_norm/UI_SideBar.js';
import TopMenu from './UI/UI_norm/UI_TopMenu.js';
import Tooltip from './UI/UI_norm/UI_ToolTip.js';
import Combobox from './UI/UI_norm/UI_ComboBox.js';
import UserInfo from './UI/UI_norm/UI_UserInfo.js';


import Icon_new_chat from './../Icon/Icon_new_chat.png';
import PAGE_FileUpload from './PAGE/PAGE_FileUpload.js';

import './STYLE/page.css';
import {ICON_newChat, ICON_sideBar}from './Icon.js';


const Page_Main = () => {
    const REF_Sidebar = useRef();
    const REF_TopMenu = useRef();


    const [VAR_CUR_PAGE_, VAR_CUR_PAGE] = useState('인덱스');
    //현재 보는 페이지 정보

    const DATA_PAGE_Infomation = {
        // '페이지 생성': <PAGE_NewPage></PAGE_NewPage>,
        '코드어시스턴트': '사용자가 입력하거나 업로드한 코드 파일을 검토하고 수정하며, 관련 질문에 대한 답변을 제공합니다.',
        '미라톡': '사용자가 문서를 업로드하면 해당 문서에 대한 요약과 정리, 그리고 질문에 대한 응답 기능을 제공합니다.',
        '회사생활 가이드': '회사생활가이드 회사생활 가이드 문서의 요약과 정리를 제공하며, 사용자 질문에 답변합니다.',
        '솔루션 가이드': '다양한 솔루션 관련 질문에 대한 답변과 정보를 제공합니다.',
        '영업 가이드': '영업 가이드 문서의 요약과 정리를 제공하고, 사용자 질문에 답변합니다.',
        '프로젝트 지원': '프로젝트 지원 문서에 대한 요약과 정리를 제공하며, 사용자 질문에 응답합니다.',
    }
    const DATA_PAGE_Permission = [
        '코드어시스턴트', '미라톡', '회사생활 가이드', '솔루션 가이드', '영업 가이드', '프로젝트 지원', '관리자 페이지'
    ]
    const DATA_DefaultPages_ = {
        // '페이지 생성': <PAGE_NewPage></PAGE_NewPage>,
        '코드어시스턴트': <PAGE_CodeAssistant></PAGE_CodeAssistant>,
        '미라톡': <PAGE_MiraTalk></PAGE_MiraTalk>,
        '회사생활 가이드': <PAGE_LifeGuide></PAGE_LifeGuide>,
        '솔루션 가이드': <PAGE_SolutionGuide></PAGE_SolutionGuide>,
        '영업 가이드': <PAGE_MiraSaleGuide></PAGE_MiraSaleGuide>,
        '프로젝트 지원': <PAGE_SupportProject></PAGE_SupportProject>,
    }
    const DATA_FixedPages_ = {
        // '파일업로드': <PAGE_FileUpload></PAGE_FileUpload>
    }
    let DATA_SavePages_ = useRef({
        '페이지 생성': <PAGE_NewPage></PAGE_NewPage>,
        '코드어시스턴트': <PAGE_CodeAssistant></PAGE_CodeAssistant>,
        '파일 업로드': <PAGE_FileUpload></PAGE_FileUpload>,
        '관리자 페이지': <PAGE_ADMIN_Permission _permissions={DATA_PAGE_Permission}></PAGE_ADMIN_Permission>,
        '신청 페이지': <PAGE_Subscribe _permissions={DATA_PAGE_Permission} ></PAGE_Subscribe>,
    });

    const MANAGE_create_page = (key_data, message = '', returns = 'page') => {
        let temp_key_num = function_find_end_number(key_data);

        const excludeKeys = [...Object.keys(DATA_FixedPages_), ...Object.keys(DATA_DefaultPages_)]
        const page_lst = Object.entries(DATA_SavePages_.current)
            .filter(([key]) => !excludeKeys.includes(key)) // 제외할 키 목록에 없는 경우만 남김
            .map(([key, value]) => [key, value.props.page_type]);

        if (key_data in DATA_DefaultPages_) {
            DATA_SavePages_.current[key_data + '_' + temp_key_num] = React.cloneElement(DATA_DefaultPages_[key_data], { key: key_data + '_' + temp_key_num, page_key: key_data + '_' + temp_key_num, page_type: key_data, message: message });

            if (REF_Sidebar.current) {
                REF_Sidebar.current.MANAGE_add_tab_e('신규 ' + VAR_CUR_INDEX_.current + temp_key_num, key_data + '_' + temp_key_num);
            }
            if (returns == 'page') return DATA_DefaultPages_[key_data];
            if (returns == 'key') return key_data + '_' + temp_key_num;
        }
        else {

        }
        return null;
    };
    const MANAGE_save_page = (key_data, data) => { DATA_SavePages_.current[key_data] = data; };

    const MANAGE_load_page = (key_data) => {
        return DATA_SavePages_.current[key_data];
    };

    const MANAGE_delete_page = (key_data) => {
        if (key_data in DATA_SavePages_.current) {
            delete DATA_SavePages_.current[key_data];
        }
    };
    const MANAGE_rename_page = (key_data, rename) => {
        if (key_data in DATA_SavePages_.current) {
            DATA_SavePages_.current[rename] = DATA_SavePages_.current[key_data];
            delete DATA_SavePages_.current[key_data];
        }
    };
    const MANAGE = (func, option) => {
        if (func == 'delete') MANAGE_delete_page(option.key)
        if (func == 'rename') MANAGE_delete_page(option.key, option.rename)
    }

    const function_find_end_number = (key_name) => {
        let temp_num = 0;

        while (key_name + '_' + temp_num in DATA_SavePages_.current) {
            temp_num = temp_num + 1;
        }
        return temp_num;
    }

    const MANAGE_change_current_tab = (clicked_page) => {
        // VAR_CUR_INDEX(clicked_page);
        VAR_CUR_PAGE(clicked_page);

    }

    const UI_paging = (page_key) => {
        if (page_key == '인덱스') {
            // if (REF_Sidebar.current) REF_Sidebar.current.VAR_CUR_PAGE(VAR_CUR_INDEX_ + ' 생성');
            return <PAGE_NewPage handleSubmit={handleSubmit} handleInputChange={handleInputChange} userInput={userInput}></PAGE_NewPage>;
        }
        else if (page_key in DATA_FixedPages_) {
            return MANAGE_load_page(page_key);
        }
        else if (page_key in DATA_SavePages_.current) {
            return MANAGE_load_page(page_key);
        }
        else {
            return MANAGE_load_page(page_key);

        }
    }

    useEffect(() => {
        func_load();
        if (REF_TopMenu && REF_TopMenu.current.MANAGE_setting_menu) {
            REF_TopMenu.current.MANAGE_setting_menu([
            <div key='tm1' style={{opacity: "0"}} className="shade-container text-token-text-secondary">
                <ICON_sideBar _className="icon-xl-heavy align-center" _size="24"></ICON_sideBar>
            </div>
            ,<div onClick={() => { VAR_CUR_PAGE('인덱스'); }} >
                <Tooltip key='tm2' onClick={() => { VAR_CUR_PAGE('인덱스') }} tooltipText='새 어시스턴트'>
                    <div key='tm3' style={{ display: 'inline-block' }} className="shade-container text-token-text-secondary">
                        <ICON_newChat key='tm4' _className="icon-xl-heavy align-center" _size="24"></ICON_newChat>
                    </div>
                </Tooltip>
            </div>
                // ,<div style={{ width: '50px', height: '50px' }}></div>
            ,<Combobox key='tm5' _information={DATA_PAGE_Infomation} _options=
                    {Object.entries({ ...DATA_DefaultPages_ }).map(([key, value]) => ({
                        label: key, // 표시할 텍스트
                        value: key // 실제 값
                    }))}
                    _CALL_BACK={VAR_CUR_INDEX}></Combobox>])

        }

        // 페이지를 떠날 때 데이터 저장
        window.addEventListener('beforeunload', func_save);

        return () => {
            window.removeEventListener('beforeunload', func_save);
        };
    }, []);





    const [userInput, setUserInput] = useState('');
    const VAR_CUR_INDEX_ = useRef('코드어시스턴트');
    const VAR_CUR_INDEX = (data, reset = false) => {
        VAR_CUR_INDEX_.current = data
        if (reset == true) VAR_CUR_PAGE('인덱스')
    }
    //생성 페이지 코드값

    useEffect(() => {
        console.log('VAR_CUR_INDEX has changed:', VAR_CUR_INDEX_.current);
    }, [VAR_CUR_INDEX_.current]);

    const handleSubmit = (message = '') => {
        console.log(VAR_CUR_INDEX_.current)
        const temp_key = MANAGE_create_page(VAR_CUR_INDEX_.current, message, 'key');
        setUserInput('')
        MANAGE_change_current_tab(temp_key)
    }

    const handleInputChange = (e) => {
        // setUserInput(e.target.value);
    };
    const [sidebar_open_, sidebar_open] = useState(true);
    const handlesidebar = (set) => {
        REF_TopMenu.current.MANAGE_visible_menu(1, set);
        sidebar_open(set);

    }
    const Index_Page = () => {
        return (
            <div class="index-page" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                flexDirection: 'column', 
                backgroundColor: '#111111', 
                textAlign: 'center', 
                width: '100%', 
                height: '100%', 
                // fontFamily: 'Arial, sans-serif' 
                }}>
                <div class='header1'>
                    <span 
                    // style={{ 
                    //     height: '70px', 
                    //     textAlign: 'center', 
                    //     color: '#ffffff', 
                    //     fontSize: '30px' 
                    //     }}
                        >무엇을 도와드릴까요?</span>
                </div>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    fheight: '22%', 
                    backgroundColor: '#111111', 
                    width: '100%', 
                    textAlign: 'center', 
                    alignItems: 'center' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', width: '60%', backgroundColor: '#222222', padding: '10px', borderRadius: '26px' }}>
                        <input
                            type="text"
                            color='#ffffff'
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="Ask a question..."
                            required
                            style={{
                                flex: 1, padding: '5px', background: 'none',
                                border: 'none',
                                outline: 'none',
                                color: '#ffffff',
                                fontSize: '15px'
                            }}


                        />
                        <button type="submit" style={{ paddingLeft: '10px', paddingRight: '10px', backgroundColor: '#555555', color: '#222222', fontSize: '20px', fontWeight: '900', border: 'none', borderRadius: '50%', cursor: 'pointer', justifyContent: 'center', alignItems: 'center' }}>
                            ⬆
                        </button>
                    </form>
                </div>
            </div>)
    }

    const func_load = () => {
        const data = JSON.parse(localStorage.getItem('page_data'));

        if (REF_Sidebar && REF_Sidebar.current.MANAGE_setting_tab) {

        //   localStorage.clear();
            let page_data = JSON.parse(localStorage.getItem('page_data'));

            if (page_data === null || page_data.length === 0 || page_data == []) {
            }
            else {
                page_data.forEach(([key, pageType]) => {
                    // 원하는 함수를 실행
                    MANAGE_create_page(pageType);
                });
            }

            REF_Sidebar.current.MANAGE_setting_tab(
                localStorage.getItem('side_list')
                    ?
                    JSON.parse(localStorage.getItem('side_list'))
                    :
                    [{
                        // '목록':
                        // {
                        //     '코드어시스턴트': '코드어시스턴트',
                        //     '표준 코드 가이드': '표준 코드 가이드',
                        //     'RAG 지식기반서비스': {
                        //         '일반 LLM':'일반 LLM'
                        //         ,'인사지원': '인사지원'
                        //         , '프로젝트 지원': '프로젝트 지원'
                        //         , '솔루션': '솔루션'
                        //         , '마케팅 및 영업': '마케팅 및 영업'
                        //         , '회의록': '회의록'
                        //     },
                        '목록': {
                             '관리자 페이지': '관리자 페이지'
                            , '신청 페이지': '신청 페이지'

                        }
                        // }
                    }]);

        }
    }
    const func_save = () => {
        const excludeKeys = [...Object.keys(DATA_FixedPages_), ...Object.keys(DATA_DefaultPages_)];; // 제외할 키 목록

        const page_lst = Object.entries(DATA_SavePages_.current)
            .filter(([key]) => !excludeKeys.includes(key)) // 제외할 키 목록에 없는 경우만 남김
            .map(([key, value]) => [key, value.props.page_type]);

        localStorage.setItem('page_data', JSON.stringify(page_lst));


        if (REF_Sidebar.current) REF_Sidebar.current.func_save();
    }
    return (
        <div 
        style={{ 
            display: 'flex', width: '100%', height: '100vh', 
            overflowX: 'hidden', backgroundColor: '#F6F7F9' 
            }}>
            {/* <div>
                <UserInfo initial="AB"  />
            </div> */}
            <Sidebar ref={REF_Sidebar} _CALLBACK_onclick={MANAGE_change_current_tab} _CALL_BACK_toggle={handlesidebar} _MANAGE={MANAGE}></Sidebar>
            {/* <PAGE_FileUpload></PAGE_FileUpload> */}
            <div className={`fade-in ${sidebar_open_ ? 'noshow' : 'show'}`} onClick={() => { VAR_CUR_PAGE('인덱스'); }} 
            style={{ position: 'absolute', top: '5px', left: '200px', width: '40px', height: '40px' }}>
                <Tooltip tooltipText='새 어시스턴트' >
                    <div style={{ display: 'inline-block' }} className="shade-container">
                        <img src={Icon_new_chat} className="shade-content" style={{ width: '40px', height: '40px' }}></img>
                    </div>
                </Tooltip>
            </div>
            {/* <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', backGroundColor: '#000000', width: '100%', height: '100%', padding: 0, margin: 0 }}> */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', padding: 0, margin: 0 }}>
                <div className='topmenu-container'
                // style={{ display: 'flex', height: '60px' }}
                >
                    <TopMenu ref={REF_TopMenu}></TopMenu>
                </div>
                <div 
                style={{ display: 'flex', 
                width: '100%', height: 'calc(100% - 60px)' }}
                >{UI_paging(VAR_CUR_PAGE_)}
                </div>
            </div>
        </div>
    )


};

export default Page_Main;