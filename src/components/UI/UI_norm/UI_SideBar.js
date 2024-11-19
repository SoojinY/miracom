import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

import Sidebar_Tab from './UI_SideBar_Tab.js';
import '../../STYLE/SideBar_scroll.css';
import '../../STYLE/SideBar_ul.css';
import '../../STYLE/page.css';
import Icon_side_bar from './../../../Icon/Icon_side_bar.png';

import { ICON_sideBar } from '../../Icon.js';

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
            backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '10px', zIndex: 99,
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
            width: isOpen_ ? UI_width_ + 'px' : 0 + 'px', // 사이드바 너비
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
                        <svg class="menuItem"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z" fill="currentColor"></path></svg>
                        <div class="menuItem" >이름 바꾸기</div>
                    </div>
                    <div class="menu red" onClick={MANAGE_remove_tab} >
                        <svg class="menuItem" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z" fill="currentColor"></path></svg>
                        <div class="menuItem" >삭제</div>
                    </div>
                    </div>
                </div>
                // <div style={{
                //     display: 'flex',
                //     width:'100%',
                //     height:'100%',
                //     flexDirection: 'column',
                //     alignItems: 'flex-start',
                //     padding: '10px',
                //     backgroundColor: '#f4f4f4',
                //     borderRadius: '8px',
                //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                //     width: '60px'
                // }}>
                //     <button
                //         onClick={rename_open}
                //         style={{
                //             color: '#000',
                //             padding: '10px',
                //             width:'100%',
                //             border: 'none',
                //             borderRadius: '5px',
                //             cursor: 'pointer',
                //             marginBottom: '10px',
                //             transition: 'background-color 0.3s ease',
                //             fontSize:'1.2vw'
                //         }}
                //         onMouseOver={(e) => e.target.style.backgroundColor = '#fff'}
                //         onMouseOut={(e) => e.target.style.backgroundColor = '#eee'}
                //     >
                //         이름 변경
                //     </button>

                //     <button
                //         onClick={MANAGE_remove_tab}
                //         style={{
                //             backgroundColor: '#eee',
                //             color: '#000',
                //             width:'100%',
                //             padding: '10px',
                //             border: 'none',
                //             borderRadius: '5px',
                //             cursor: 'pointer',
                //             transition: 'background-color 0.3s ease',
                //             fontSize:'1.2vw'
                //         }}
                //         onMouseOver={(e) => e.target.style.backgroundColor = '#fff'}
                //         onMouseOut={(e) => e.target.style.backgroundColor = '#eee'}
                //     >
                //         삭제
                //     </button>
                // </div>
            }></Sidebar_menu>
            <div className='topmenu-container sidebar-background'>
                <div className='topmenu'>
                    <div className="shade-container text-token-text-secondary" onClick={toggleSidebar} 
                    style={{ 
                        zIndex: 9,
                        // position: 'fixed', top: '0px', left: '0px', 
                        // width: '40px', height: '35px', margin: '10px', 
                        // color: '#ffffff' 
                    }}
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
                width: UI_width_ + 'px',
                height: '90%',
                overflowY: 'scroll',
                backgroundColor: 'transparent',
                transform: `translatex(${VAR_position_x_}px)`,
                transition: '0.3s ease'
            }} >
                <div className='sidetab-wrapper'
                // style={{ 
                //     // backgroundColor: '#eee', 
                //     height: '90%', 
                //     padding: '0px', margin: '0px', 
                //     paddingRight: '10px' }}
                >
                    {Object.entries(DATA_Tabs_).map(([key, value]) => (
                        <Sidebar_Tab key={key} dataset={value} _CALLBACK_onclick={CALLBACK_onclick_} _CALLBACK_onclick_menu={CALLBACK_onclick_menu}></Sidebar_Tab>
                    ))}
                </div>
            </div>
        </div >
    );


});


export default Sidebar;