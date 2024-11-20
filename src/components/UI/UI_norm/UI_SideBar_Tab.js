import React, { useState,useRef,forwardRef,useImperativeHandle, useEffect } from 'react';
import '../../STYLE/SideBar_ul.css'; 
import Icons from './../UI_mapper/UI_Mapper_Icon';

import './../../STYLE/page.css'; 
import {ICON_dotMenu} from '../../Icon.js';
                  
const Sidebar_Tab = forwardRef((props, ref) => { //({_DATA_name='X',dataset={'temp':'set'}}) => {
    let CALLBACK_onclick_= props._CALLBACK_onclick?props._CALLBACK_onclick:null;
    let CALLBACK_onclick_menu_= props._CALLBACK_onclick_menu?props._CALLBACK_onclick_menu:null;

    let [DATA_setting_,DATA_setting]=useState(props.dataset?props.dataset:{});
    const [isOpen_, isOpen] = useState({});

    const func_UI_make_view=(data)=>{
        const elements = [];
        for (const [key, value] of Object.entries(data)) {
            try{
                if(value.constructor.name == 'Object' ){
                    if(isOpen_[key]){
                        elements.push(
                        <li key={key}  className='no-hover' onClick={()=>toggleSidebar(key)}>
                            {key}
                            <Sidebar_Tab key={key} dataset={value} _CALLBACK_onclick={CALLBACK_onclick_}  _CALLBACK_onclick_menu={CALLBACK_onclick_menu_}></Sidebar_Tab>
                        </li>
                        );
                    }
                    else{
                        elements.push(<li key={key}  className='side_tab' onClick={()=>toggleSidebar(key)}>{key}</li>)
                    }
                }
                else if (Array.isArray(value)){
                }
                else if (typeof(value)==='string'){
                    console.log(value)
                    if(['파일업로드 인사지원','파일업로드 프로젝트 지원','파일업로드 솔루션','파일업로드 마케팅 및 영업','파일업로드 회의록'].includes(value)) elements.push(
                    <div className='hoverfade-container' 
                    style={{display:'flex',flexDirection:'row', justifyContent: 'space-between',height:'30px',alignItems:'center'}}>
                        <li key={key} 
                        style={{width:'90%',fontSize:'0.8em',alignContent:'center'}} 
                        className='side_tab' onClick={() => handleClick(value)}>
                            {key}
                        </li>
                    </div>);
                    else elements.push(
                    <div className='hoverfade-container' 
                    style={{display:'flex',flexDirection:'row', justifyContent: 'space-between',height:'30px',alignItems:'center'}}>
                        <li key={key} 
                        style={{width:'90%',fontSize:'0.8em',alignContent:'center'}} 
                        className='side_tab' onClick={() => handleClick(value)}>
                            {key}
                        </li>
                        <div className='shade-container' 
                        style={{width:'10%',height:'20px'}} data-key={value} onClick={ handleClickmenu } 
                        >
                            <ICON_dotMenu _className="shade-content icon-md" _size="24"
                             onClick={ handleClickmenu } ></ICON_dotMenu>
                            {/* <img className='shade-content' 
                            data-key={value}  
                            src={Icons.Icon_dot_menu} 
                            onClick={ handleClickmenu } 
                            style={{height:'100%',marginRight:'10px',zIndex:99}}></img> */}
                        </div>
                    </div>
                    );
                }
                else{
                }
            }catch(error){

            }
        }
        if(elements.length==0){
            return null;
        }
        return elements;
    }

    useImperativeHandle(ref, () => ({
        handleClick
    }))



    const handleClick = (value) => {
        if (CALLBACK_onclick_) CALLBACK_onclick_(value);
        return value;
      };
    const toggleSidebar = (key) => {
        isOpen({ ...isOpen_, [key]: !isOpen_[key] });        
    };

    const handleClickmenu = (event) => {
        event.stopPropagation();
        if(props._CALLBACK_onclick_menu) props._CALLBACK_onclick_menu(event);
      };

      
    // useEffect(() => {
    //     const initialVisibility = {};
    //     for (const [key, value] of Object.entries(DATA_setting_)) {
    //         if(value.constructor.name == 'Object' ){
    //             initialVisibility[key]=true;
    //         }
    //     }
    //     isOpen(initialVisibility);
    // }, []); 

    return (
        <div style={{display:'inline-block',textAlign:'left',alignItems:'left',width:'100%'}}>
            <ul className='side_tab' onClick={(e)=> e.stopPropagation()}>
                {func_UI_make_view(DATA_setting_)}               
            </ul>
        </div>
    )
});

export default Sidebar_Tab;
