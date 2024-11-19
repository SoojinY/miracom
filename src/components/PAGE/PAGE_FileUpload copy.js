import React, { useState } from 'react';
import FileBox from './../UI/UI_norm/UI_FileBox.js';
import Table from './../UI/UI_norm/UI_Table.js';
import API_file from './../API/API_file.js';
import './../STYLE/scroll.css';
import PAGE from './PAGE.js';

class PAGE_FileUpload extends PAGE {
    constructor(props) {
        super(props);
        this.default_directory = '/';
        this.example_data = [
            { 'name': 'data1' },
            { 'name': 'data2' },
            { 'name': 'data3' },
            // 추가 데이터...
        ];

        this.state = {
            current_directory: '/',
            datas: this.example_data,
            inited: false,
            activeTab: null,
            contentData: '',
        };
        this.default_file_tab = {
            '인사지원': 'intranet',           // 인사지원 -> intranet 디렉토리
            '프로젝트 지원': 'project_support', // 프로젝트 지원 -> project_support 디렉토리
            '솔루션': 'solution',              // 솔루션 -> solution 디렉토리
            '마케팅 및 영업': 'marketing_sales', // 마케팅 및 영업 -> marketing_sales 디렉토리
            '회의록': 'meeting_notes',         // 회의록 -> meeting_notes 디렉토리
        };
        this.API_file = new API_file();
    }
    set_data = async (new_data) => {
        // 데이터가 없으면 null로 설정
        if (!new_data || new_data.length === 0) {
            new_data = null;
        } else {
            // 데이터가 있을 경우, 각 항목에 "삭제" 버튼 추가
            new_data = new_data.map(item => ({
                ...item,
                delete: (
                    <button
                        onClick={(event) => this.handleDelete(event, item.key)}
                        style={this.buttonStyle}
                    >
                        삭제
                    </button>
                ),
            }));
        }

        this.setState({ datas: new_data });
    };

    //   set_data = async (new_data) => {


    //     const updatedData = new_data.map(item => ({
    //       ...item,
    //       delete: (
    //         <button
    //           onClick={(event) => this.handleDelete(event, item.key)} 
    //           style={this.buttonStyle}
    //         >
    //           삭제
    //         </button>
    //       ),
    //     }));


    //     this.setState({ datas: updatedData }, () => {
    //     });
    //   };

    componentDidMount() {
        this.set_data(this.state.datas);  // 초기 데이터 세팅
    }
    handleContentUpdate = (content) => {
        this.setState({ contentData: content.content });
    };
    handleTabClick = async (tabName) => {
        this.setState({ current_directory: tabName })
        const directory = this.default_file_tab[tabName] || '/';

        this.setState({ activeTab: tabName, directory });

        const newData = await this.API_file.handleGet(this.default_directory[tabName]);

        if (newData !== null) {
            this.set_data(newData);
        } else {
            this.setState({ datas: null });
        }
    };
    handleDelete = (event, key) => {
        event.stopPropagation(); // 이벤트 전파를 막음
        event.preventDefault(); // 기본 동작을 막음

        // 데이터에서 해당 key를 가진 항목 삭제
        const updatedData = this.state.datas.filter(item => item.key !== key);
        this.set_data(updatedData);
    };

    // 버튼 스타일 정의
    buttonStyle = {
        backgroundColor: '#e74c3c', // 버튼 배경색
        color: '#fff', // 텍스트 색
        border: 'none', // 테두리 없애기
        borderRadius: '12px', // 둥근 모서리
        padding: '8px 16px', // 여백
        fontSize: '14px', // 글씨 크기
        cursor: 'pointer', // 마우스 커서 변경
        transition: 'background-color 0.3s ease, transform 0.2s ease', // 배경 색 변화와 버튼 크기 변화
    };

    render() {
        return (
            <div style={{
                display: 'flex', width: '100%', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',
                height: '100%', paddingBottom: '20px', position: 'relative'
            }}>
                <div style={{
                    display: 'flex', width: '80%', justifyContent: 'space-between'
                }}>
                    <div style={{
                        display: 'flex', width: '100%', justifyContent: 'space-evenly', gap: '10px'
                    }}>
                        {Object.keys(this.default_file_tab).map((tab, index) => (
                            <button
                                key={index}
                                style={{
                                    flex: 1,
                                    padding: '10px 0',
                                    backgroundColor: this.state.activeTab === tab ? '#406bed' : '#ddd', // 선택된 탭에 색 적용
                                    color: this.state.activeTab === tab ? '#fff' : '#000', // 선택된 탭에 텍스트 색 적용
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                    textAlign: 'center', // 텍스트 중앙 정렬
                                }}
                                onClick={() => this.handleTabClick(tab)} // 클릭 시 탭 변경
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{
                    display: 'flex', width: '80%', height: 'calc(90% - 3px)', marginTop: '3px', justifyContent: 'space-between',
                    flexDirection: 'column', padding: '10px'
                }}>
                    {/* 좌측 테이블 영역 */}
                    <div style={{
                        width: '100%', height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'column', margin: '4px', backgroundColor: '#fff', borderRadius: '20px',
                    }}>
                        {/* 데이터가 있을 때만 테이블 렌더링 */}
                        {this.state.datas ? (
                            <Table
                                _main_color={'#406bed'}
                                style={{ display: 'flex' }}
                                _header_width={['85%', '15%']}
                                _DATA_setting={this.state.datas}
                                _CALL_BACK={this.handleContentUpdate}
                                _useheader={false}
                            />
                        ) : (
                            <div style={{
                                textAlign: 'center', padding: '20px', fontSize: '16px', color: '#999'
                            }}>
                            </div>
                        )}
                    </div>
                    <div style={{
                        height: 'calc(50% - 30px)', backgroundColor: '#fff', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        margin: '4px', padding: '10px'
                    }}>
                        {/* <FileBox _directory={this.state.current_directory} _directorymap={this.default_file_tab} _call_back_set_data={this.set_data} style={{ width: '100%' }} /> */}
                    </div>
                    {/* <div style={{
                        width: '30%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10px', paddingBottom: '20px'
                    }}>
                        <div style={{
                            height: 'calc(50% - 4px)', backgroundColor: '#fff', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            padding: '20px', marginBottom: '4px',
                            overflow: 'scroll',
                            whiteSpace: 'nowrap'
                        }}>
                            {this.state.contentData ? (
                                <div>{this.state.contentData}</div>
                            ) : (
                                <div style={{
                                    textAlign: 'center', fontSize: '16px', color: '#999'
                                }}>
                                    자료를 선택해주세요.
                                </div>
                            )}
                        </div>

                        
                    </div> */}
                </div>
            </div>
        );
    }
}

export default PAGE_FileUpload;
