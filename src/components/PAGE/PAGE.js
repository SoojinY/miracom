import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

class PAGE extends React.Component {
    constructor(props) {
        super(props);

        // this.state={
        //     page_key:props.page_key,
        //     page_type:props.page_type,
        //     message:props.message
        // }
        this.page_key = props.page_key;
        this.page_type = props.page_type;
        this.message = props.message;
    
    }

    get_serial = () => {
        return this.SERIAL_Code;
    };
    set_serial = (SERIAL_CODE) => { this.SERIAL_Code = SERIAL_CODE; };

}

export default PAGE;
