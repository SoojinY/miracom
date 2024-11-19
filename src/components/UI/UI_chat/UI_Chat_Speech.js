import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactDOMServer from 'react-dom/server';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import {
    tomDark, base16AteliersulphurpoolLight, cb, coldarkCold, coldarkDark, coy, coyWithoutShadows, darcula, dark, dracula, duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea, duotoneSpace, funky, ghcolors, gruvboxDark, gruvboxLight, holiTheme, hopscotch,
    lucario, materialDark, materialLight, materialOceanic, nightOwl, nord, okaidia, oneDark, oneLight, pojoaque, prism, shadesOfPurple, solarizedDarkAtom, solarizedlight, synthwave84, tomorrow, twilight, vs, vscDarkPlus, xonokai, zTouch
} from 'react-syntax-highlighter/dist/esm/styles/prism';



import hljs from 'highlight.js';
import './../../STYLE/Speech.css';
import Icon_copy from './../../../Icon/Icon_copy.png'

const styles = {

    normal: {
        ol: {
            fontWeight: 'bold',
            margin: '10px 0',
            listStyleType: 'decimal',
        },
        'ol li': {
            marginLeft: '20px',
        },
        ul: {
            margin: '10px 0',
            listStyleType: 'disc',
        },
        'ul li': {
            marginLeft: '20px',
        },

    },
    numbered: {
        ol: {
            margin: '20px 0',
            listStyleType: 'decimal',
        },
        li: {
            marginBottom: '10px',
            listStyleType: 'none',
        },
        p: {
            fontSize: '16px',
            lineHeight: '1.5',
        },
    },
    bulleted: {
        ol: {
            margin: '20px 0',
            listStyleType: 'none',
        },
        li: {
            marginBottom: '10px',
            listStyleType: 'circle',
            paddingLeft: '20px', // 동그라미를 보이게 하기 위해 패딩 추가
        },
        p: {
            fontSize: '16px',
            lineHeight: '1.5',
        },
    },
};

const Speech = ({ _text = '', _ui_alligin = true, _text_color, _ui_color, _font_style = 'Roboto' }) => {


    let font_style_ = _font_style;
    let ui_height_ = '30px';

    const ui_color_ = _ui_color ? _ui_color : '#333333';
    let ui_alligin_ = _ui_alligin;

    //<div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', marginRight: '50px',height:'30px'}}>

    let text_style_ = 'Arial';
    let text_color_ = _text_color ? _text_color : '#ffffff';
    let text_size_ = '0.8em';
    let text_ = _text;

    const UI_CodeBlock = ({ language, value }) => {
        return (
            <div style={{ flexDirection: 'column', color: text_color_ ? text_color_ : '#ffffff', backgroundColor: ui_color_, width: '100%', paddingLeft: '1px', paddingRight: '1px', paddingBottom: '1px', marginBottom: '5px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', height: '30px', alignItems: 'center', justifyContent: 'space-between' }}><span key='cb6' style={{ hegiht: '100%', textAlign: 'left', paddingLeft: '8px', color: text_color_ ? text_color_ : '#ffffff', fontSize: '12px', fontFamily: font_style_ }}>{language}</span>
                    <div onClick={() => copyToClipboard(value)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            src={Icon_copy}
                            alt="아이콘"
                            style={{ width: '16px', height: '16px' }}
                        />
                        <button key='cb7' style={{ hegiht: '100%', backgroundColor: 'transparent', color: text_color_ ? text_color_ : '#ffffff', border: 'none', outline: 'none', cursor: 'pointer', textAlign: 'center', fontSize: '13px', fontFamily: font_style_ }}>코드 복사</button>
                    </div>
                </div>
                <div  >


                    {/* tomDark, base16AteliersulphurpoolLight, cb, coldarkCold, coldarkDark, coy, coyWithoutShadows, darcula, dark, dracula, duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea, duotoneSpace, funky, ghcolors, gruvboxDark, gruvboxLight, holiTheme, hopscotch, 
                lucario, materialDark, materialLight, materialOceanic, nightOwl, nord, okaidia, oneDark, oneLight, pojoaque, prism, shadesOfPurple, solarizedDarkAtom, solarizedlight, synthwave84, tomorrow, twilight, vs, vscDarkPlus, xonokai, zTouch */}

                    <SyntaxHighlighter language={language} style={solarizedlight} customStyle={{
                        backgroundColor: '#ffffff'
                        , borderRadius: '8px', margin: '1px', marginBottom: '3px', height: '100%'
                    }}>
                        {value}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    };
    const preserveBackticks = (text) => {
        // 텍스트를 ` ``` `로 나누기
        const parts = text.split('```');

        // 짝수 번 인덱스에는 양쪽에 백틱 3개 추가
        const result = parts.map((part, index) => {
            if (index % 2 === 1) {
                return `\`\`\`${part}\`\`\``;  // 짝수 인덱스는 코드 블록으로 처리
            }
            return part;
        });

        return result;
    };
    function splitStringByLength(str, maxLength = 60) {
        let result = [];
        let currentLine = '';
        let count=0;
      
        for (let i = 0; i < str.length; i++) {
          const char = str[i];
      
          // 현재 문자를 추가
          currentLine += char;
        if(/[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/.test(char)){
            count+=2;}
        else count+=1
      
          // 최대 길이에 도달하면 분리
          if (count >= maxLength) {
            result.push(currentLine);
            currentLine = '';
            count=0;
          }
      
          // 엔터를 만나면 분리하지 않고 그냥 넘어감
          if (char === '\n') {
            count=0
            continue;
          }
        }
      
        // 남아있는 문자열이 있으면 추가
        if (currentLine.length > 0) {
          result.push(currentLine);
        }
      
        return result;
      }
    const UI_make_view = (message) => {
        const temp_item_lst = [];
        if (typeof message === 'number') {
            message = String(message);
        }
        else if (typeof message !== 'string') { message = '' }
        const parts = preserveBackticks(message)//.split("```").filter(Boolean);
        //const parts = message.split(/(```[^']*```|[^']+)/).filter(Boolean);

        // 결과 배열을 초기화
        const result = [];

        // 각 부분을 trim하여 결과 배열에 추가
        parts.forEach(part => {
            // 빈 문자열이 아닐 경우 추가
            if (part.trim()) {
                result.push(part.trim());
            }
        });

        if (ui_alligin_) {
            // temp_item_lst.push(<div style={{ display: 'flex',justifyContent: 'space-between', textAlign: 'right',  fontFamily: font_style_  }}><span></span><span style={{  color: text_color_, backgroundColor: ui_alligin_ ? ui_color_ : 'transparent', padding: '10px', paddingLeft: '15px', paddingRight: '15px', marginBottom: '5px', borderRadius: '25px', overflowWrap: 'break-word' }}><ReactMarkdown>{text_}</ReactMarkdown></span></div>);
            temp_item_lst.push(
                <div
                    style={{
                        display: 'flex',

                        justifyContent: 'space-between',
                        fontFamily: font_style_,
                        width: '100%',
                        paddingRight: '1px'
                    }}
                >
                    <div style={{ width: '20%' }}></div>
                    <div
                        style={{
                            color: text_color_,
                            backgroundColor: ui_alligin_ ? ui_color_ : 'transparent',
                            padding: '5px',
                            margin: '1px',
                            paddingLeft: '5px',
                            paddingRight: '5px',
                            paddingBottom: '0px',
                            borderRadius: '25px',
                            maxWidth: '80%'
                        }}>
                        {splitStringByLength(_text).map((segment, index) => {
                            if (segment === '\n') {
                                return <br key={index} />;  // 엔터는 <br />로 처리
                            }
                            return <SyntaxHighlighter key={index}
                            style={coy}
                            customStyle={{
                                display:'flex',
                                width:'100%',
                                backgroundColor: 'transparent',
                                overflowWrap: 'break-word',
                                whiteSpace: 'pre-wrap',
                                wrapLines: true,
                                fontSize:'0.9em'
                            }}>{segment}</SyntaxHighlighter>;  // 40자씩 자른 텍스트는 <span>으로 감싸기
                        })}
                        {/* {_text.split(/([\n])/).filter(Boolean).map((part, index) => (
                                <SyntaxHighlighter
                                    key={index}
                                    style={coy}
                                    customStyle={{
                                        backgroundColor: 'transparent',
                                        overflowWrap: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                        wrapLines: true,
                                    }}
                                >
                                    {part}
                                </SyntaxHighlighter>
                            ))} */}
                        {/* {
                            _text && typeof _text === 'string' && _text.trim() !== "" // _text가 null이 아니고 문자열이며 빈 값이 아닐 때만 처리
                                ? _text.split('\n').map((line, lineIndex) => {
                                    // line.match(/.{1,40}/g)가 null일 경우 빈 배열을 반환하도록 처리
                                    const parts = line.match(/.{1,40}/g) || [];

                                    return parts.map((part, partIndex) => {
                                        // 괄호가 포함된 경우 <code> 태그 사용
                                        const isInParentheses = /[()]/.test(part);

                                        return isInParentheses ? (
                                            <SyntaxHighlighter
                                                key={`${lineIndex}-${partIndex}`}  // 고유한 key 생성
                                                style={coy}
                                                customStyle={{
                                                    textAlign: 'right',
                                                    margin: '5px',
                                                    backgroundColor: 'transparent',
                                                    overflowWrap: 'break-word',
                                                    whiteSpace: 'pre-wrap',
                                                    wrapLines: true,
                                                }}
                                            >
                                                {part}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <span
                                                key={`${lineIndex}-${partIndex}`}  // 고유한 key 생성
                                                style={coy}
                                                customStyle={{
                                                    textAlign: 'right',
                                                    margin: '5px',
                                                    backgroundColor: 'transparent',
                                                    overflowWrap: 'break-word',
                                                    whiteSpace: 'pre-wrap',
                                                    wrapLines: true,
                                                }}
                                            >
                                                {part}
                                            </span>
                                        );
                                    });
                                })
                                : null  // _text가 없거나 유효하지 않으면 null 반환
                        } */}
                        {/* <SyntaxHighlighter style={coy} customStyle={{
                            backgroundColor: 'transparent',
                            fontFamily: font_style_,
                            marginRight: 'auto',
                            whiteSpace: 'nowrap', // 텍스트가 줄 바꿈 없이 한 줄로 나가게 함
                            wordBreak: 'break-word',
                            maxWidth: '100%', // maxWidth를 없애서 너비 제한을 없앰
                            width: 'auto'}}>
                            {_text}</SyntaxHighlighter> */}
                    </div>
                </div >
            );
        }
        else {
            result.map((part, index) => {
                if (part.startsWith("```") && part.endsWith("```")) {
                    const temp_data = part

                    const firstSpaceIndex = part.indexOf('\n');
                    if (firstSpaceIndex == 0) {

                    }
                    const lang_type = firstSpaceIndex !== -1 ? part.slice(0, firstSpaceIndex) : part;

                    const data = temp_data.slice(firstSpaceIndex + 1);

                    temp_item_lst.push(<UI_CodeBlock key={index} language={lang_type.replace(/```/g, '')} value={data.replace(/```/g, '')}></UI_CodeBlock>);

                }
                else if (index === result.length - 1 && part.startsWith("```")) {
                    const firstSpaceIndex = part.indexOf(' ');
                    const lang_type = firstSpaceIndex !== -1 ? part.slice(0, firstSpaceIndex) : part;
                    const data = firstSpaceIndex !== -1 ? part.slice(firstSpaceIndex + 1) : '';

                    temp_item_lst.push(<UI_CodeBlock key={index} language={lang_type.replace(/```/g, '')} value={data.replace(/```/g, '')}></UI_CodeBlock>);

                }
                else {
                    const components = {
                        ol: ({ children }) => <ol style={styles['normal']['ol']}>{children}</ol>,
                        li: ({ children, parent }) => {
                            if (parent && parent.type === 'ol') {
                                return <li style={styles['normal']['ol li']}>{children}</li>;
                            } else {
                                return <li style={styles['normal']['ul li']}>{children}</li>;
                            }
                        },
                        ul: ({ children }) => <ul style={styles['normal'].ul}>{children}</ul>,
                    };
                    temp_item_lst.push(<div key={index} style={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left', fontFamily: font_style_ }}><span key={index} style={{ color: text_color_, backgroundColor: ui_alligin_ ? ui_color_ : 'transparent', padding: '10px', paddingLeft: '15px', paddingRight: '15px', marginBottom: '5px', borderRadius: '25px', overflowWrap: 'break-word' }}>

                        {/* <ReactMarkdown components={components}>{part}</ReactMarkdown> */}
                        <ReactMarkdown>{part}</ReactMarkdown>
                    </span></div>);


                }

            });
        }
        return temp_item_lst;
    }


    const copyToClipboard = (valueToCopy) => {
        const textArea = document.createElement('textarea');
        textArea.value = valueToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999);  // 모바일에서 선택 가능하도록

        try {
            // 텍스트를 복사
            const successful = document.execCommand('copy');
            if (successful) {
                console.log('텍스트가 클립보드에 복사되었습니다.');
            } else {
                console.error('복사 실패');
            }
        } catch (err) {
            console.error('복사 실패:', err);
        }

        // 임시 textarea 요소 삭제
        document.body.removeChild(textArea);

        // console.log("copy")
        // try {
        //     await navigator.clipboard.writeText(valueToCopy);
        // } catch (err) {console.log(err)
        // }
    };

    return (
        <div key='sp1' style={{
            display: 'flex',
            justifyContent: ui_alligin_ ? 'flex-end' : 'flex-start',
            backgroundColor: 'transparent',
            padding: '2px',
            margin: '2px',
            fontFamily: font_style_
        }}>
            <div key='sp2' style={{

                width: '95%',
                borderRadius: '8px'
                // backgroundColor: '#111111',
            }}>
                {UI_make_view(text_)}
            </div></div>
    );

};


export default Speech;





