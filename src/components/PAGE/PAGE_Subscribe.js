import React, { Component } from 'react';
import FileBox from './../UI/UI_norm/UI_FileBox.js';  // 파일 업로드 컴포넌트
import API_mongoDB from '../API/API_mongoDB.js';  // MongoDB API
import './../STYLE/scroll.css';

class PAGE_Subscribe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            department: '',
            files: [],  // 데이터를 저장할 배열
            data: [],  // 데이터를 저장할 배열
            selectedPermissions: {}, // 선택된 권한을 관리
        };
        this.API_mongoDB = new API_mongoDB();  // API 호출을 위한 인스턴스
        this.main_color_ = '#406bed';  // 기본 색상

        // 권한 목록
        this.DATA_PAGE_Permission = [
            '코드어시스턴트', '미라톡', '회사생활 가이드', '솔루션 가이드',
            '영업 가이드', '프로젝트 지원', '관리자 페이지', '파일 업로드'
        ];
    }

    // 이름과 부서 상태 업데이트
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    fetchData = async () => {
        try {
            const data = await this.API_mongoDB.DB_get_user_list(); // 예시 API 호출
            this.setState({ data: data || [] });
        } catch (error) {
            console.error('데이터 가져오기 실패:', error);
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    // 파일 변경 핸들러
    handleFileChange = (files) => {
        this.setState({ files });
    };

    // 권한 체크박스 상태 변경
    handlePermissionChange = (permission) => {
        this.setState((prevState) => {
            const newSelectedPermissions = { ...prevState.selectedPermissions };
            newSelectedPermissions[permission] = !newSelectedPermissions[permission]; // 체크 상태 토글
            return { selectedPermissions: newSelectedPermissions };
        });
    };

    render() {
        const { name, department, files, data, selectedPermissions } = this.state;

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: '#f3f3f3',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
                <div style={{width:'70%',height:'10%',backgroundColor:'#f3f3f3'}}></div>
                {/* 상위 컨테이너 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: '70%',
                    height: '40%',
                    overflow: 'hidden',
                    marginLeft: '30px',  // 좌측 간격 추가
                    marginRight: '30px',  // 우측 간격 추가
                }}>
                    <div style={{

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        height: '100%',
                        width: '30%',
                        marginRight: '3px',
                        padding: '3px',
                        borderRadius: '25px'
                    }}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'column',
                            marginBottom: '30px',  
                        }}>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.handleInputChange}
                                placeholder="이름"
                                disabled  // 수정 불가
                                style={{
                                    marginBottom: '15px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    width: 'calc(100% - 10px)',
                                    height: '40px',  // 높이 늘림
                                    marginTop: '15px',  // margin 사용
                                    fontSize: '16px',  // 글자 크기 조정
                                }}
                            />
                            <input
                                type="text"
                                name="department"
                                value={department}
                                onChange={this.handleInputChange}
                                placeholder="부서"
                                disabled  // 수정 불가
                                style={{
                                    marginBottom: '15px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    width: 'calc(100% - 10px)',
                                    height: '40px',  // 높이 늘림
                                    fontSize: '16px',  // 글자 크기 조정
                                }}
                            />
                        </div>


                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '70%',
                        height: '100%',
                        borderRadius: '10px',
                    }}>

                        <div style={{
                            backgroundColor: '#fff',
                            borderRadius: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            height: '100%',
                        }}>
                            <div style={{
                                fontWeight: 'bold',
                                fontSize: '22px',
                                marginBottom: '15px',
                            }}>
                                권한 선택
                            </div>

                            <div style={{
                                display: 'flex',
                                height: '60%',
                                flexWrap: 'wrap',  // 항목들이 두 줄로 자동 배치되도록 설정
                                gap: '10px',
                                padding: '5px'  // 항목 간 간격 설정
                            }}>
                                {this.DATA_PAGE_Permission.map((permission) => (
                                    <label key={permission} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '18px',
                                        width: '45%',  // 한 줄에 두 항목씩 배치되도록 설정
                                        marginBottom: '10px',  // 항목 간 간격
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedPermissions[permission] || false}
                                            onChange={() => this.handlePermissionChange(permission)}
                                            style={{
                                                width: '25px',  // 체크박스 크기
                                                height: '25px',
                                                marginRight: '10px',
                                                cursor: 'pointer',
                                                accentColor: this.main_color_,  // 커스터마이즈된 체크박스 색상
                                                borderRadius: '5px',  // 체크박스 둥글게 만들기
                                            }}
                                        />
                                        {permission}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
                <div style={{
                    backgroundColor: '#fff',
                    width:'70%',
                    height: '30%',
                    borderRadius: '10px',
                    marginTop: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '5px'
                }}>
                    {/* 파일 업로드 컴포넌트 */}
                    <FileBox
                        _directory="default"
                        message={'신청 문서를 이곳에 업로드 해주세요'}
                        _button={false}
                        _call_back_set_data={this.handleFileChange}
                    />

                    <button
                        onClick={() => alert('송신 기능 실행')}
                        style={{
                            backgroundColor: this.main_color_,
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            width: '100%',
                            height: '40px',
                            marginTop: '20px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}>
                        송신
                    </button>
                </div>
            </div>
        );
    }
}

export default PAGE_Subscribe;
