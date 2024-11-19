import React, { useEffect, useRef, useState, Component } from 'react';
import CheckBox from './../UI/UI_norm/UI_CheckBox.js'
import Table from './../UI/UI_norm/UI_Table.js'
import Combobox from './../UI/UI_norm/UI_ComboBox.js'

import API_mongoDB from '../API/API_mongoDB.js';

import './../STYLE/scroll.css';
import PAGE from './PAGE.js';
// class AddDivisionModal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: '',
//             permit: '',
//         };
//     }

//     handleInputChange = (e) => {
//         const { name, value } = e.target;
//         this.setState({ [name]: value });
//     }

//     handleSubmit = () => {
//         const { name, permit } = this.state;
//         if (!name || !permit) {
//             alert("모든 필드를 입력해주세요.");
//             return;
//         }
//         this.props.onSubmit(name, permit);
//         this.setState({ name: '', permit: '' }); // 제출 후 입력 초기화
//         this.props.onClose(); // 모달 닫기
//     }

//     render() {
//         const { name, permit } = this.state;
//         const { isOpen, onClose } = this.props;

//         if (!isOpen) return null; // 모달이 열려 있을 때만 렌더링

//         return (
//             <div style={modalStyles.overlay}>
//                 <div style={modalStyles.modal}>
//                     <h2>새로운 Division 추가</h2>
//                     <div style={modalStyles.inputContainer}>
//                         <label>Division Name:</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={name}
//                             onChange={this.handleInputChange}
//                             placeholder="Enter division name"
//                             style={modalStyles.input}
//                         />
//                     </div>
//                     <div style={modalStyles.inputContainer}>
//                         <label>Permission:</label>
//                         <input
//                             type="text"
//                             name="permit"
//                             value={permit}
//                             onChange={this.handleInputChange}
//                             placeholder="Enter permission"
//                             style={modalStyles.input}
//                         />
//                     </div>
//                     <div style={modalStyles.buttons}>
//                         <button onClick={this.handleSubmit} style={modalStyles.button}>제출</button>
//                         <button onClick={onClose} style={modalStyles.button}>닫기</button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }




class PAGE_ADMIN_Permission extends PAGE {
    constructor(props) {
        super(props);
        this.default_directory = '/';
        this.example_data =
            [{'key':'temp', '성함': '이세돌', '부서': '데이터수집', '문서번호': '1' },
            {'key':'test1', '성함': '하나둘', '부서': '화면', '문서번호': '2' },
            { 'key':'test2','성함': '아침', '부서': '품질검사', '문서번호': '3' },
            {'key':'temp', '성함': '이세돌', '부서': '데이터수집', '문서번호': '4' },
            {'key':'test1', '성함': '하나둘', '부서': '화면', '문서번호': '5' },
            { 'key':'test2','성함': '아침', '부서': '품질검사', '메모': '신규' },
            {'key':'temp', '성함': '이세돌', '부서': '데이터수집', '메모': '신규' },
            {'key':'test1', '성함': '하나둘', '부서': '화면', '메모': '신규' },
            { 'key':'test2','성함': '아침', '부서': '품질검사', '메모': '신규' },
            {'key':'temp', '성함': '이세돌', '부서': '데이터수집', '메모': '신규' },
            {'key':'test1', '성함': '하나둘', '부서': '화면', '메모': '신규' },
            { 'key':'test2','성함': '아침', '부서': '품질검사', '메모': '신규' },
            {'key':'temp', '성함': '이세돌', '부서': '데이터수집', '메모': '신규' },
            {'key':'test1', '성함': '하나둘', '부서': '화면', '메모': '신규' },
            { 'key':'test2','성함': '아침', '부서': '품질검사', '메모': '신규' },
            {'key':'temp', '성함': '이세돌', '부서': '데이터수집', '메모': '신규' },
            {'key':'test1', '성함': '하나둘', '부서': '화면', '메모': '신규' },
            { 'key':'test2','성함': '아침', '부서': '품질검사', '메모': '신규' },
            ]
        this.state = {
            datas: [],
            inited: false,
            division: {'신규 신청 목록':'신규 신청 목록'},
            permission: null,
            data_origin: null,
            isModalOpen: false,

            data_select_key:'',
        };
        this.API_mongoDB = new API_mongoDB();
        this.main_color_ = '#406bed'
        this.default_permissions_ = props._permissions

        this.checkBoxRef = React.createRef();
        // #2c48e8
    }



    set_data = async (new_data) => {

        this.setState({ datas: new_data }, () => {
        });
    }


    DB_get_division = async () => {
        return this.API_mongoDB.DB_get_division();
    }
    DB_add_division = async (name, permit) => {
        this.API_mongoDB.DB_add_division(name, permit);
    }

    DB_set_permission= async(key)=>{
        console.log(this.checkBoxRef.current.DATA_getitems())
    }
    // openModal = () => {
    //     this.setState({ isModalOpen: true });
    // }

    // closeModal = () => {
    //     this.setState({ isModalOpen: false });
    // }
    UI_user_list= async (item) => {
        const data=this.API_mongoDB.DB_get_user_list()
        if (!data){
            return this.example_data;
        }
        return data

    }
    componentDidMount() {
        const data = this.UI_user_list(); 
        this.setState({ datas: data.length>0?data:this.example_data }); 
    }
   

    UI_select_user = async (item) => {
        if (item.length < 2) {
            console.error("Invalid item array");
            return;
        }

        if (item) {
            const permissionsObject = this.default_permissions_.reduce((acc, permission) => {
                acc[permission] = false;
                return acc;
            }, {});


            const newPermissions = { ...permissionsObject };
            this.setState({ permission: newPermissions, data_origin: newPermissions }, () => {
            });
        }

        const temp = Object.values(item);
        const data = await this.API_mongoDB.DB_get_permission(temp[0]);
        this.setState({data_select_key:temp[0]})
        if (data) {
            const permissionsObject = this.default_permissions_.reduce((acc, permission) => {
                acc[permission] = false;
                return acc;
            }, {});
            const newPermissions = { ...permissionsObject, ...item };
            this.setState({ permission: newPermissions, data_origin: newPermissions }, () => {
            });
        }
        
    }
    UI_permission_remove_all = () => {
        this.setState(prevState => {
            const updatedPermissions = {};
            Object.keys(prevState.permission).forEach(key => {
              updatedPermissions[key] = false;
            });
            return { permission: updatedPermissions };
          });
    }
    UI_permission_cancel = () => {
        this.setState({ permission: this.state.data_origin }, () => {
        });
    }

    UI_paging = async () => {
        // this.DB_get_division()
    }
    render() {
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
                <div style={{
                    alignItems: 'center',
                    width: '80%',
                    height: '97%',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'flex', width: 'calc(100% - 6px)', height: 'calc(5% - 6px)',
                        margin: '3px',
                        marginBottom: '3px',
                        alignItems: 'center', justifyContent: 'left',
                        borderBottom: '1px solid #ddd',
                    }}>
                        <Combobox _information={this.state.division} _options=
                    {Object.entries({ ...this.state.division }).map(([key, value]) => ({
                        label: key, // 표시할 텍스트
                        value: key // 실제 값
                    }))} _CALL_BACK={this.UI_user_list}></Combobox>
                    </div>
                    {/* 상단 메뉴 */}


                    <div style={{
                        display: 'flex', width: '100%', height: '100%',
                        alignItems: 'center', justifyContent: 'center',
                        boxSizing: 'border-box'
                    }}>


                        <div style={{
                            alignItems: 'center',
                            backgroundColor:'#fff',
                            width: 'calc(45% - 9px)',
                            height: 'calc(100% - 6px)',
                            margin: '3px',
                            marginRight: '6px',
                            borderRadius: '10px',
                            overflowY: 'scroll',
                            boxSizing: 'border-box'

                        }}>
                            <Table _header_height='5%' _header_width={['0px','30%', '40%', '40%']} _main_color={this.main_color_} _DATA_setting={this.state.datas} _CALL_BACK={this.UI_select_user}></Table>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '45%',
                            height: 'calc(100% - 6px)',
                            margin: '3px',
                            marginLeft: '0px',
                            boxSizing: 'border-box',
                            borderRadius: '10px',
                        }}>
                            {/* <div style={{ height: 'calc(5% - 6px)', width: 'calc(100% - 6px)', margin: '3px' }}>권한 목록</div> */}
                            <div style={{ display: 'flex', height: '5%', width: '100% ' }}>
                                <div style={{ display: 'flex', width: 'calc(80% - 3px)', height: '100%', borderRadius: '10px 0px 0px 0px', marginRight: '3px', color: '#fff', justifyContent: 'center', alignItems: 'center', backgroundColor: this.main_color_ }}>권한명</div>
                                <div style={{ display: 'flex', width: '20%', height: '100%', borderRadius: '0px 10px 0px 0px', color: '#fff', justifyContent: 'center', alignItems: 'center', backgroundColor: this.main_color_ }}>권한</div>
                            </div>
                            <div style={{ display: 'flex', height: 'calc(95% - 3px)', width: 'calc(100% )', marginTop: '3px', borderRadius: '0px 0px 10px 10px', backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                                <CheckBox ref={this.checkBoxRef}  _line_height='30px' _main_color={this.main_color_} _datas={this.state.permission}></CheckBox></div>
                        </div>

                        <div style={{
                            alignItems: 'center',
                            width: 'calc(10% - 9px)',
                            height: 'calc(100% - 6px)',
                            margin: '3px',
                            marginRight: '6px',
                            borderRadius: '10px',
                            overflowY: 'scroll',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            gap: '10px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                borderRadius: '10px',
                                backgroundColor: this.main_color_, 
                                padding: '2px',
                                cursor: 'pointer',
                                boxSizing: 'border-box',
                                color: '#fff',
                                textAlign: 'center',
                                height: '50px',
                                fontSize: '1vw',
                                transition: 'background-color 0.3s ease',
                            }} onClick={this.DB_set_permission}>
                                확인
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                borderRadius: '10px',
                                backgroundColor: '#f44336', 
                                padding: '2px',
                                cursor: 'pointer',
                                boxSizing: 'border-box',
                                color: '#fff',
                                textAlign: 'center',
                                height: '50px',
                                fontSize: '0.8vw',
                                transition: 'background-color 0.3s ease',
                                whiteSpace: 'normal',  
                             wordWrap: 'break-word'
                            }} onClick={this.UI_permission_remove_all}>
                                모두 끄기
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                borderRadius: '10px',
                                backgroundColor: '#f44336',
                                padding: '2px',
                                cursor: 'pointer',
                                boxSizing: 'border-box',
                                color: '#fff',
                                textAlign: 'center',
                                height: '50px',
                                fontSize: '0.8vw',
                                transition: 'background-color 0.3s ease', 
                                   whiteSpace: 'normal',  
                                wordWrap: 'break-word'
                            }} onClick={this.UI_permission_cancel}>
                                변경 취소
                            </div>

                            {/* <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                borderRadius: '10px',
                                backgroundColor: '#f44336', // 빨간색으로 버튼 배경색 지정
                                padding: '10px',
                                cursor: 'pointer',
                                boxSizing: 'border-box',
                                color: '#fff',
                                textAlign: 'center',
                                height: '50px',
                                transition: 'background-color 0.3s ease',
                            }} onClick={this.openModal} >새로운 Division 추가

                                <AddDivisionModal
                                    isOpen={this.state.isModalOpen}
                                    onClose={this.closeModal}
                                    onSubmit={this.DB_add_division}
                                />
                            </div> */}
                        </div>
                    </div>

                </div>
                <div style={{ width: '100%', height: '3%', borderTop: '1px solid #ccc' }}></div>
            </div>
        )
    };
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    inputContainer: {
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#406bed',
        color: 'white',
        cursor: 'pointer',
    }
};


export default PAGE_ADMIN_Permission;