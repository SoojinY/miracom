import React from 'react';
import Board from '../UI/UI_chat/UI_Chat_Board.js';
import './../STYLE/scroll.css'; 
import './../STYLE/page.css'; 
import PAGE from './PAGE.js';

import {ICON_newChat, ICON_submitChat}from '../Icon.js';

class PAGE_NewPage extends PAGE {
    constructor(props) {
        super(props);
        this.handleSubmit = props.handleSubmit; 
        this.handleInputChange = props.handleInputChange;
        this.state = {
            userInput: ''
        };
    }

    func_handleInputChange = (e) => {
        e.preventDefault();
        this.setState({ userInput: e.target.value });
    };

    func_handleSubmit = (e) => { 
        e.preventDefault();
        if (this.handleSubmit) {
            this.handleSubmit(this.state.userInput);
        }
        this.setState({ userInput: '' });
    }

    render() {
        return (
            <div className='index-page'>
                <div><span className='header1'>
                    무엇을 도와드릴까요?
                </span></div>
                <div className='index-input-wrapper'>
                    <form className='index-input-form' onSubmit={this.func_handleSubmit} >
                        <input
                        className='index-input-text text-base'
                            type="text"
                            value={this.state.userInput}
                            onChange={this.func_handleInputChange}
                            placeholder="Ask a question..."
                            required
                        />
                        
                        <button className='chat-submit' type="submit">
                            <ICON_submitChat _className="icon-2xl" _size="32"></ICON_submitChat>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default PAGE_NewPage;
