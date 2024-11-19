import React from 'react';
import './../../STYLE/Table.css';

const Table = ({
  _DATA_setting,
  _header_height,
  _main_color,
  _CALL_BACK,
  _header_width = ['60%', '30%', '10%'],
  _useheader
}) => {
  if (!_DATA_setting || _DATA_setting.length === 0) {
    return <p>No data available</p>;
  }

  const headers = _DATA_setting && _DATA_setting.length > 0 ? Object.keys(_DATA_setting[0]) : [];
  const header_width_ = _header_width.length ? _header_width : ['50%', '40%', '10%'];
  const header_height_ = _header_height ? _header_height : '30px';
  const main_color_ = _main_color ? _main_color : '#eee';
  const CALL_BACK_ = _CALL_BACK ? _CALL_BACK : null;
  const useheader_=_useheader==false?_useheader:true;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {_DATA_setting && _DATA_setting.length > 0 && (
        <>
          {useheader_ && <div style={{ display: 'flex', width: '100%', height: header_height_ }}>
            { headers.map((header, index) => (
              header !== 'key' && (
                <div
                  key={index}
                  style={{
                    width: index !== headers.length - 1
                      ? `calc(${header_width_[index]} - 3px)`
                      : header_width_[index],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center', // 세로 중앙 정렬
                    backgroundColor: main_color_,
                    color: '#fff',
                    height: '100%',
                    marginRight: index < headers.length - 1 ? '3px' : '0px',
                  }}
                >
                  {header}
                </div>
              )
            ))}
          </div>}

          <div style={{ width: '100%', height: 'calc(100% - 3px)', overflowY: 'auto' }}>
            {_DATA_setting.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  height: '40px',
                  borderBottom: '1px solid #eee',
                  backgroundColor: '#efefef',
                  gap: '3px',
                  cursor: 'pointer', // 클릭 시 데이터 전달
                }}
                onClick={() => {
                  if (typeof CALL_BACK_ === 'function') {
                    CALL_BACK_(item);
                  } else {
                    console.warn('CALL_BACK_ is not a function');
                  }
                }}// 클릭 시 데이터 전달
              >
                {headers.map((header, idx) => (
                  header !== 'key' && (
                    <div
                      key={header}
                      style={{
                        width: idx !== headers.length - 1
                          ? `calc(${header_width_[idx]} - 3px)` // 마지막 header 제외하고 3px 뺌
                          : header_width_[idx], // 마지막 header는 그대로 사용// 데이터 셀에도 width 적용
                        display: 'flex',
                        fontSize: '1.5vw',
                        justifyContent: 'center', // 가로 중앙 정렬
                        alignItems: 'center', // 세로 중앙 정렬
                        textAlign: 'center',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item[header]}
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
