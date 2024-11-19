import React, {  forwardRef } from 'react';

const UI_modal = forwardRef((props, ref) => {
    const url=props.url?props.url:null;


    return (
        (url &&
        <div ariaHideApp={false}>
            <iframe
                src={url}
            ></iframe>
            <button>닫기</button>
        </div>
        )
    )
})
export default UI_modal;