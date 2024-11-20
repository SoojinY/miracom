import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

import Sidebar_Tab from './UI_SideBar_Tab.js';
import '../../STYLE/SideBar_scroll.css';
import '../../STYLE/SideBar_ul.css';
import '../../STYLE/page.css';
import Icon_side_bar from './../../../Icon/Icon_side_bar.png';

import { ICON_delete, ICON_edit, ICON_sideBar } from '../../Icon.js';

const Sidebar_rename = forwardRef((props, ref) => {
    const call_bak_ = props._call_bak
    const sideMenuRef = useRef();
    // const [text, setText] = useState('');  
    const textinputRef = useRef('');
    const text = useRef('');

    const change_object = useRef();


    const updatePosition = (top, left) => {
        const sideMenu = sideMenuRef.current;
        if (sideMenu) {
            sideMenu.style.top = `${top}px`;
            sideMenu.style.left = `${left}px`;
        }
    }
    const out = () => {
        call_bak_(null, text.current)
        updatePosition(-9999, -9999);
        change_object.current.setAttribute('data-key', text.current);
        change_object.current = null;
        // setText('')
    }
    const focusing = () => {
        if (textinputRef.current) textinputRef.current.focus()
    }
    const setting = (object) => {
        change_object.current = object

        text.current = object.getAttribute('data-key')
        if (textinputRef.current) textinputRef.current.value = text.current

    }
    useImperativeHandle(ref, () => ({
        updatePosition,
        focusing,
        setting
    }));


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
                updatePosition(-9999, -9999)
            }
        };

        const handleKeyDown = (event) => {
            if (change_object.current != null) {
                if (event.key === 'Enter') {
                    out()

                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);  // Enter 키 이벤트 리스너 추가

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);  // 이벤트 리스너 제거
        };
    }, []);

    return (<div ref={sideMenuRef} style={{ position: 'absolute', top: '-9999px', left: '-9999px', height: '20px', width: '180px', zIndex: 98 }}><input style={{ zIndex: 99 }}
        type="text"
        onChange={(e) => { text.current = e.target.value; }}
        ref={textinputRef}>
    </input></div>)

});

const Sidebar_menu = forwardRef((props, ref) => {
    const sideMenuRef = useRef();

    const updatePosition = (top, left) => {
        const sideMenu = sideMenuRef.current;
        if (sideMenu) {
            sideMenu.style.top = `${top}px`;
            sideMenu.style.left = `${left}px`;
        }
    }
    useImperativeHandle(ref, () => ({
        updatePosition,
    }));
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
                const rect = sideMenuRef.current.getBoundingClientRect();

                // 요소의 위치가 -9999, -9999일 때는 이벤트가 발동하지 않도록
                if (rect.top === -9999 && rect.left === -9999) {
                    return;
                }
                updatePosition(-9999, -9999)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (<div
        ref={sideMenuRef}
        style={{
            position: 'absolute', top: '-9999px', left: '-9999px',
            //  width: '100px', height: '100px',
            // backgroundColor: '#fff', 
            // border: '1px solid #ccc', 
            // borderRadius: '10px', 
            // zIndex: 99,
        }}>
        {props.menus}
    </div>)

});


const Sidebar = forwardRef((props, ref) => {
    const sidebarmenuRef = useRef();
    const sidebarrenameRef = useRef();
    const VAR_clicked_object = useRef('');
    const VAR_clicked_object_y = useRef('');

    const [DATA_Tabs_, DATA_Tabs] = useState({});

    const func_find_data_tab = (name, func, add = null) => {
        DATA_Tabs((prevData) => {
            let data = { ...prevData };
            console.log(data)
            data = func_find_data_tab_loop(data, name, func, add);
            return data; // 삭제 후 새로운 객체를 반환하여 상태 업데이트
        });
    }
    const func_find_data_tab_loop = (dict, name, func, add = null) => {
        for (const [key, value] of Object.entries(dict)) {
            if (value.constructor.name == 'Object') {
                dict[key] = func_find_data_tab_loop(value, name, func, add)
            }
            else if (Array.isArray(value)) {
            }
            else if (typeof (value) === 'string') {

                if (value == name) {
                    console.log(name)
                    console.log(add)
                    if (func == 'delete') delete dict[key];
                    if (func == 'rename') {
                        dict[add] = dict[key];
                        delete dict[key]
                    }
                }
            }
            else {
            }
        }
        return dict;
    }
    const CALLBACK_onclick_ = (insert_data) => {

        if (props._CALLBACK_onclick) {
            props._CALLBACK_onclick(insert_data);
        }
    }
    const option = props._option ? props._option : {
        filter: '',
        backgoundcolor: '#111111',
        chatbackgoundcolor: '#222222',
        speechcolor: '#333333',
        chatoutline: 'none',
        chatoutlinecolor: 'transparent',
        speechtextcolor: '#ffffff',
    }

    const menuStyle = {
        flex: 1,
        margin: '10px',
    };


    useImperativeHandle(ref, () => ({
        // VAR_CUR_PAGE,
        func_save,
        MANAGE_setting_tab: (insert_data) => {
            DATA_Tabs(insert_data);
        },
        MANAGE_add_tab_e: (key, data) => {

            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            DATA_Tabs(prevData => {

                const newData = { ...prevData };

                if (newData[year + '_' + month]) {
                    if (newData[year + '_' + month]) {
                        newData[year + '_' + month][key] = data
                    }
                    else {
                        newData[year + '_' + month] = {}
                        newData[year + '_' + month][key] = data
                    }
                }
                else {
                    newData[year + '_' + month] = {}
                    newData[year + '_' + month][key] = data
                }
                return newData;
            })
        },

    }))
    const MANAGE_remove_tab = (e) => {
        e.stopPropagation();
        if (VAR_clicked_object.current) {
            const key = VAR_clicked_object.current.getAttribute('data-key')
            func_find_data_tab(key, 'delete')
            MANAGE_('delete', { 'key': key })
            localStorage.removeItem(key);
        }
        func_save()
    }
    const MANAGE_rename_tab = (e, input) => {
        if (e) e.stopPropagation();
        if (VAR_clicked_object.current) {
            const key = VAR_clicked_object.current.getAttribute('data-key')
            func_find_data_tab(key, 'rename', input)
            MANAGE_('rename', { 'key': key, 'rename': input })
        }
        func_save()
    }

    const [isOpen_, isOpen] = useState(false);
    const sidebarRef = useRef();

    let [UI_width_, UI_width] = useState(props._UI_width ? props._UI_width : 200);
    let [VAR_position_x_, VAR_position_x] = useState(props._UI_width ? -props._UI_width : -200)

    const white_text = {
        color: '#ffffff'
    };

    const MANAGE_ = props._MANAGE;
    const CALL_BACK_toggle_ = props._CALL_BACK_toggle;

    const toggleSidebar = () => {
        if (isOpen_) {
            VAR_position_x(-UI_width_);
        }
        else {
            VAR_position_x(0);
        }
        isOpen(!isOpen_);
        if (CALL_BACK_toggle_) CALL_BACK_toggle_(isOpen_);
    };
    const CALLBACK_onclick_menu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        VAR_clicked_object.current = e.target;//.getAttribute('data-key');

        const object = e.target;
        const rect = object.getBoundingClientRect();
        if (sidebarmenuRef.current) {
            sidebarmenuRef.current.updatePosition(rect.top + 10, rect.left + 10);

            VAR_clicked_object_y.current = rect.top;
        }
    };
    const rename_open = (e) => {
        e.stopPropagation();
        console.log("이름 변경 클릭")
        console.log(e.target.getAttribute('data-key'))
        if (sidebarrenameRef.current) {
            sidebarrenameRef.current.updatePosition(VAR_clicked_object_y.current, 0);
            sidebarrenameRef.current.setting(VAR_clicked_object.current);
            sidebarrenameRef.current.focusing()
        }
    };

    const func_save = () => {
        localStorage.setItem('side_list', JSON.stringify(DATA_Tabs_));
    }
    return (
        <div className='sidebar-background sidebar-wrapper' ref={sidebarRef} style={{
            width: isOpen_ ? UI_width_+ 60 + 'px' : 0 + 'px', // 사이드바 너비
            // width: isOpen_ ? UI_width_ + 'px' : 0 + 'px', // 사이드바 너비
            // width:'200px',
            // backgroundColor: '#eee',
            // transition: '0.3s ease',
            // height: '100%',
            // borderRight: '1px solid #aaa',
        }}  
        >
            <Sidebar_rename ref={sidebarrenameRef} _call_bak={MANAGE_rename_tab}></Sidebar_rename>
            <Sidebar_menu ref={sidebarmenuRef} menus={
                <div class="menuList shadowbox">
                    <div>
                        <div class="menu" onClick={rename_open}>
                            <ICON_edit _className="menuItem" _size="24"></ICON_edit>
                            <div class="menuItem" >이름 바꾸기</div>
                        </div>
                        <div class="menu red" onClick={MANAGE_remove_tab} >
                            <ICON_delete _className="menuItem" _size="24"></ICON_delete>
                            <div class="menuItem" >삭제</div>
                        </div>
                    </div>
                </div>
            }></Sidebar_menu>
            <div className='topmenu-container sidebar-background'>
                <div className='topmenu'>
                    <div className="shade-container text-token-text-secondary" onClick={toggleSidebar} 
                    style={{ zIndex: 9,}}
                    >
                        <ICON_sideBar 
                            style={{filter: option.filter, 
                                transition: 'filter 0.3s'}}
                            _className="icon-xl-heavy align-center" _size="24"></ICON_sideBar>

                    </div>
                </div>
            </div>
            
            <div style={{ height: '10%'}}></div>
            <div style={{
                // width: UI_width_ + 'px',
                width: '100%',
                height: '90%',
                overflowY: 'scroll',
                backgroundColor: 'transparent',
                transform: `translatex(${VAR_position_x_}px)`,
                transition: '0.3s ease'
            }} >
                <div className='sidetab-wrapper'>
                    {Object.entries(DATA_Tabs_).map(([key, value]) => (
                        <Sidebar_Tab key={key} dataset={value} _CALLBACK_onclick={CALLBACK_onclick_} _CALLBACK_onclick_menu={CALLBACK_onclick_menu}></Sidebar_Tab>
                    ))}
                </div>
            </div>
        </div >
    );

});


export default Sidebar;