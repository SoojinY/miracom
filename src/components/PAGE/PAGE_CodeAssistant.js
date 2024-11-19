import React, { useEffect, useRef,useState } from 'react';
import Board from '../UI/UI_chat/UI_Chat_Board.js';
import './../STYLE/scroll.css'; 
import PAGE from './PAGE.js';


 class PAGE_CodeAssistant extends PAGE{

    constructor(props) {
        super(props);
        this._option=props._option?props._option:{
            boardborder:'1px solid #eeeeee11',
            boardcolor:'rgb(254,254,254)',
            boardoutlinewidth:'1px',
            boardoutlinecolor:'#000000',

            backgroundcolor:  '#ffffff',

            chatoutline:'0px',
            chatoutlinecolor:'transparent',

            speechcolor:'#eee',
            speechtextcolor:'#000000',

            chatbackgoundcolor:'#eaeaea',
            submitarrowcolor:'#ffffff',
            submitcolor:'#cccccc77',
            submittextcolor:'#000000',
            
        }
    }
    render() {
        return (
            <Board _option={this._option}
            url={'http://10.0.33.11:4300/api'}
            page_key={this.props.page_key} message={this.props.message}></Board>
        )}
    // render(){

    //     return(
    //           <Board page_key={this.props.page_key} message={this.props.message}></Board>
    //     )
    // };
};

export default PAGE_CodeAssistant;