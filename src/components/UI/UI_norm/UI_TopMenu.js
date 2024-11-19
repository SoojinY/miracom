import React, { useEffect, useRef,useState,useImperativeHandle,forwardRef } from 'react';
import '../../STYLE/page.css'

const TopMenu= forwardRef((props, ref) => {
    const [DATA_setting_,DATA_setting]=useState([]);
    const [UI_height_,UI_height]=useState(props._UI_height?props._UI_height:50);
    const [UI_Visible_,UI_Visible]=useState([]);
    const [UI_background_,UI_background]=useState(props._UI_background?props._UI_background:'#F6F7F9')

    if(props.setting_menu){
        MANAGE_setting_menu(props.setting_menu);
    }

    const MANAGE_visible_menu=(num,set)=>{
        // UI_Visible_.current[num]=set;
        UI_Visible(prevState => {
            // 배열의 불변성을 유지하면서 특정 인덱스의 값을 변경
            const newArray = [...prevState]; // 기존 배열을 복사
            newArray[num] = set; // n번째 요소를 새 값으로 업데이트
            return newArray;
          });

    }
    
    const MANAGE_setting_menu=(new_menu)=>{
        DATA_setting(new_menu);
        UI_Visible(new Array(new_menu.length).fill(true))

    }
    
    const MANAGE_add_menu=(new_menu_item)=>{
        DATA_setting(prevItems => [...prevItems, new_menu_item]);
    }

    const Click_menu=(value)=>{
        return value;
    }
    const UI_make_view=(data)=>{
        const return_lst=[];
        for (let i = 0; i < data.length; i++) {
            if(UI_Visible_.length>0){
                if(!UI_Visible_[i]) continue;
            }
            if(typeof(data[i])==='string'){
                return_lst.push(<button key={i} onClick={()=>Click_menu(data[i])}>{data[i]}</button>)}
            else{return_lst.push(data[i])}
        }
        return return_lst;
    }
    
    

    useImperativeHandle(ref, () => ({
        MANAGE_setting_menu,
        MANAGE_add_menu,

        MANAGE_visible_menu,
    }))

    return (
    <div className='topmenu' 
    style={{    height:{UI_height_}+'px',}}
    >
        {UI_make_view(DATA_setting_)}

    </div>);
});
export default TopMenu;
