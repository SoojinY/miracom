import React, { useEffect, useRef, useState } from 'react';
import Board from '../UI/UI_chat/UI_Chat_Board.js';
import './../STYLE/scroll.css';
import PAGE from './PAGE.js';


class PAGE_MiraTalk extends PAGE {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Board _option={{
                boardborder: '1px solid #eeeeee11',
                boardcolor: 'rgb(254,254,254)',
                boardoutlinewidth: '1px',
                boardoutlinecolor: '#000000',

                backgroundcolor: '#ffffff',

                chatoutline: '0px',
                chatoutlinecolor: 'transparent',

                speechcolor: '#cccccc33',
                speechtextcolor: '#000000',

                chatbackgoundcolor: '#cccccc33',
                submitarrowcolor: '#ffffff',
                submitcolor: '#cccccc77',
                submittextcolor: '#000000',

            }}
                url={'http://10.0.33.11:4300/api_v2'}
                page_key={this.props.page_key} message={this.props.message}></Board>
        )
    }
    // _option={{
    //     background:  'linear-gradient(to top, #a8d8ff, #b0e0e6)',
    //     backgroundcolor:  'transparent',

    //     chatoutline:'1px',
    //     chatoutlinecolor:'#ffffff',

    //     speechcolor:'#ffff00',
    //     speechtextcolor:'000000',



    //     submitcolor:'transparent',
    //     submittextcolor:'#ffffff',

    // }}

    // render(){

    //     return(
    //           <Board page_key={this.props.page_key} message={this.props.message}></Board>
    //     )
    // };
};

export default PAGE_MiraTalk;