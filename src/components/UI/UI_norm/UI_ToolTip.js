import React, { useEffect, useRef,useState } from 'react';

import './../../STYLE/tooltip.css'; 

const Tooltip = ({ children, tooltipText }) => {
    return (
        <div className="tooltip" style={{display:'flex'}}>
            {children}
            <div className="tooltiptext">{tooltipText}</div>
        </div>
    );
};


export default Tooltip;