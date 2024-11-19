import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';



class API_mongoDB {
    constructor(props) {
    }
    DB_get_division = async () => {
        try {
            const response = await axios.get('http://localhost:4305/DB/division/get');
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            console.error('데이터 가져오기 중 오류 발생:', error);;
            return null;
        }
        return []
    }
    DB_add_division = async (name, permission) => {
        if (!name || !permission || name.length < 2 || permission.length < 2) {
            return;
        }


        try {
            const response = await axios.post('http://localhost:4305/DB/division/new', {
                name: name,
                permission: permission
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (err) {
            console.log('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };



    DB_get_user_list = async (division) => {
        try {
            const response = await axios.get('http://localhost:4305/DB/permission/get_list', {
                params: {
                    division: division
                }
            });
            if (response.status === 200) {
                const data = response.data;

                const transformedData = data.map(item => ({
                    key: item.key,
                    성함: item.성함 || '',
                    부서: item.부서 || '',
                    메모: item.메모 || ''
                }));

                return transformedData;
            } else {
                console.error('서버 응답이 정상적이지 않습니다.', response.status);
                return null;
            }
        } catch (error) {
            console.error('데이터 가져오기 중 오류 발생:', error);
            return null;
        }
    }

    DB_get_permission = async (key) => {
        try {
            const response = await axios.get('http://localhost:4305/DB/permission/get', {
                params: {
                    key: key
                }
            });
            if (response.status === 200) {
                const data = response.data;

                const transformedData = {
                    data: data
                };

                return transformedData;
            } else {
                console.error('서버 응답이 정상적이지 않습니다.', response.status);
                return null;
            }
        } catch (error) {
            console.error('데이터 가져오기 중 오류 발생:', error);
            return null;
        }
    }

    DB_set_permission = async (key, name, division, permission) => {
        try {
            const response = await axios.get('http://localhost:4305/DB/permission/new', {
                params: {
                    key: key,
                    name: name,
                    division: division,
                    permission: permission
                }
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            console.error('데이터 가져오기 중 오류 발생:', error);;
            return null;
        }
        return []
    }

    DB_get_docudata = async (key) => {
        try {
          const response = await axios.get('http://localhost:4305/DB/document/get', {
            params: { key }, // key 값을 쿼리 파라미터로 전달
          });
          if (response.status === 200) {
            return response.data; // 문서 명과 번호를 포함하는 데이터 반환
          } else {
            return null;
          }
        } catch (error) {
          console.error('문서 데이터 가져오기 중 오류 발생:', error);
          return null;
        }
      };
}

export default API_mongoDB