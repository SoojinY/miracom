import React, { useState } from 'react';
import FileBox from './../UI/UI_norm/UI_FileBox.js';
import Table from './../UI/UI_norm/UI_Table.js';
import API_file from './../API/API_file.js';
import './../STYLE/scroll.css';
import PAGE from './PAGE.js';
import icons from './../UI/UI_mapper/UI_Mapper_Icon.js'

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
            isopen: false,
            datas: null,
            inited: false,
            activeTab: null,
            contentData: '',
        };
        this.current_directory = '/'
        this.default_file_tab = {
            '인사지원': 'intranet',           // 인사지원 -> intranet 디렉토리
            '프로젝트 지원': 'project_support', // 프로젝트 지원 -> project_support 디렉토리
            '솔루션': 'solution',              // 솔루션 -> solution 디렉토리
            '마케팅 및 영업': 'marketing_sales', // 마케팅 및 영업 -> marketing_sales 디렉토리
            '회의록': 'meeting_notes',         // 회의록 -> meeting_notes 디렉토리
        };
        this.API_file = new API_file();
    }
    set_data = (new_data) => {

        if (!new_data || new_data.length === 0) {
            new_data = null;
        } else {
            new_data = new_data.map(item => ({
                ...item,
                delete: (
                    <button
                        onClick={(event) => this.handleDelete(event, item)}
                        style={this.buttonStyle}
                    >
                        삭제
                    </button>
                ),
            }));
        }

        this.setState({ datas: new_data });
    };

    onoff = () => {
        this.setState({ isopen: !this.state.isopen })
    }

    handleFileChange = async (event) => {
        try {

            await this.API_file.handleUpload([event.target.files[0]],this.current_directory);


            const newData = await this.API_file.handleGet(this.default_file_tab[this.state.activeTab]);
            this.set_data(newData)
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    };



    handleTabClick = async (tabName) => {

        const directory = this.default_file_tab[tabName] || '/';
        this.current_directory = directory;

        this.setState({ activeTab: tabName, directory });

        const newData = await this.API_file.handleGet(this.default_file_tab[tabName]);

            this.set_data(newData);
    };
    handleDelete = async (event, value) => {
        event.stopPropagation();
        event.preventDefault();

        await this.API_file.handleDelete(this.current_directory + '/' + value.name);


        const newData = await this.API_file.handleGet(this.default_file_tab[this.state.activeTab]);

        this.set_data(newData)



    };

    buttonStyle = {
        backgroundColor: '#ef4c3c', // 버튼 배경색
        color: '#fff', // 텍스트 색
        border: 'none', // 테두리 없애기
        borderRadius: '12px', // 둥근 모서리
        fontSize: '1.2vw', // 글씨 크기
        cursor: 'pointer', // 마우스 커서 변경
        padding: '0.8vw 1.5vh',
        transition: 'background-color 0.3s ease, transform 0.2s ease', // 배경 색 변화와 버튼 크기 변화
    };

    render() {
        return (
            <div style={{
                width: '50%', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', backgroundColor: '#efefef',
                height: '100%', position: 'absolute',
                right: this.state.isopen ? '-50%' : 0,
                top: 0,
                transition: '0.3s ease',
                zindex: 10000,
                borderLeft:'1px solid #aaa'
            }}>
                <img src={icons.Icon_folder} style={{
                    position: 'fixed',transform: 'scale(0.5)',  width: '50px', height: '50px', top: 0, borderRadius: '30px',
                    right: 0, zIndex: 10001
                }} onClick={this.onoff}></img>

                <div style={{
                    display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', width: '100%', height: '50px' }}></div>
                    <div style={{
                        display: 'flex', width: '100%', height: '35px', borderBottom: '1px solid #eee', textAlign: 'center', justifyContent: 'space-evenly', gap: '4px'
                    }}>
                        {Object.keys(this.default_file_tab).map((tab, index) => (
                            <div className="shade-container">
                                <button
                                    key={index}
                                    style={{
                                        display:'flex',
                                        flex: 1,
                                        paddingTop: '8px',
                                        height:'100%',
                                        backgroundColor: this.state.activeTab === tab ? '#bbb' : '#efefef', // 선택된 탭에 색 적용
                                        color: this.state.activeTab === tab ? '#fff' : '#000', // 선택된 탭에 텍스트 색 적용
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                        textAlign: 'center', // 텍스트 중앙 정렬
                                        fontSize:'1.5vw'
                                    }}
                                    onClick={() => this.handleTabClick(tab)} // 클릭 시 탭 변경
                                >
                                    {tab}
                                </button></div>
                        ))}
                    </div>
                </div>

                <div style={{
                    display: 'flex', width: '100%', height: 'calc(90% - 3px)', marginTop: '3px', 
                    flexDirection: 'column',
                }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ddd',borderTop: '1px solid #ddd', alignItems: 'center', cursor: 'pointer' }}>
                        <label style={{ fontSize: '2rem', color: '#007bff', cursor: 'pointer' }}>
                            +
                            <input
                                type="file"
                                onChange={this.handleFileChange}
                                accept="*/*"
                                style={{ display: 'none' }} // 파일 input 숨기기
                            />
                        </label>
                    </div>
                    <div style={{
                        width: '100%', height: 'calc(80% - 10px)', display: 'flex', flexDirection: 'column', backgroundColor: '#efefef', borderRadius: '20px',overflow:'hidden'
                    }}>
                        {this.state.datas ? (
                            <Table
                                _main_color={'#efefef'}
                                style={{ display: 'flex' }}
                                _header_width={['85%', '15%']}
                                _DATA_setting={this.state.datas}
                                _CALL_BACK={this.handleContentUpdate}
                                _useheader={false}
                            />
                        ) : (
                            <div>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        );
    }
}

export default PAGE_FileUpload;
