import React, { createContext, useContext, useRef } from 'react';

// Context 생성
const MANAGER_OPTION = createContext();

// Provider 컴포넌트
export const MANAGER_OPTION_ = ({ children }) => {
    const options = useRef({
        default_option: {
            boardborder:'1px solid #eeeeee11',
            boardcolor:'rgb(254,254,254)',
            boardoutlinewidth:'1px',
            boardoutlinecolor:'#000000',

            backgroundcolor:  '#ffffff',

            chatoutline:'0px',
            chatoutlinecolor:'transparent',

            speechcolor:'#cccccc33',
            speechtextcolor:'#000000',

            chatbackgoundcolor:'#cccccc33',
            submitarrowcolor:'#ffffff',
            submitcolor:'#cccccc77',
            submittextcolor:'#000000',
            
        }
    })

    return (
        <MANAGER_OPTION.Provider value={{ options }}>
            {children}
        </MANAGER_OPTION.Provider>
    );
};

export const _MANAGER_OPTION = () => {
    return useContext(MANAGER_OPTION);
};