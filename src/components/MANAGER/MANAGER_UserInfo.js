import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import API_mongoDB from './../API/API_mongoDB';  // MongoDB 관련 API 클래스

// 전역 상태 생성
const UserInfoContext = createContext();

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};

export const UserInfoProvider = ({ children }) => {
  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({
    name: '--',          // 이름
    position: '',      // 직위
    key: '',           // 사용자 고유 키
  });

  // 문서 데이터 상태
  const [documentData, setDocumentData] = useState({
    documentName: '',  // 문서명
    documentNumber: '',// 문서 번호
  });

  // 권한 정보 상태
  const [permissions, setPermissions] = useState({});

  // 로딩과 에러 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 사용자 데이터 가져오기
  const fetchUserData = async () => {
    try {
      // Step 1: SSO 연동하여 사용자 정보 가져오기
      const ssoResponse = await axios.get('SSO_API_URL'); // 여기에 SSO API 호출
      const userData = ssoResponse.data;  // 예시: { name, position, key }
      
      setUserInfo({
        name: userData.name,
        position: userData.position,
        key: userData.key,
      });

      // Step 2: MongoDB에서 문서 정보 가져오기 (사용자 키를 이용)
      const docData = await API_mongoDB.DB_get_docudata(userData.key);
      if (docData) {
        setDocumentData({
          documentName: docData.documentName,
          documentNumber: docData.documentNumber,
        });
      } else {
        setError('문서 데이터를 가져오는 데 실패했습니다.');
      }

      // Step 3: MongoDB에서 permission 정보 가져오기 (사용자 키를 이용)
      const permissionData = await API_mongoDB.DB_get_permissions(userData.key);
      if (permissionData) {
        setPermissions(permissionData);
      } else {
        setError('권한 데이터를 가져오는 데 실패했습니다.');
      }
    } catch (err) {
      setError('사용자 정보를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, documentData, permissions, loading, error }}>
      {children}
    </UserInfoContext.Provider>
  );
};
