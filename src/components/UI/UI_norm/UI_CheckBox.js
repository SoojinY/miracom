import React, { useState, useEffect, forwardRef,useImperativeHandle } from 'react';

const CheckBox = forwardRef((props, ref) => {

  const line_height_ = props._line_height ? props._line_height : '30px';
  const main_color_ = props._main_color ? props._main_color : '#2c48e8';
  const width_ = props._width ? props._width : ['80%', '20%'];

  const [items, setItems] = useState(props._datas ? props._datas : null);

  useImperativeHandle(ref, () => ({
    DATA_getitems: () => items
}))

  // const handleCheckboxChange = (index) => {
  //   const updatedItems = [...items];
  //   updatedItems[index].isActive = !updatedItems[index].isActive;
  //   setItems(updatedItems);
  // };

  useEffect(() => {

    if (props._datas) {
      setItems(props._datas);
    }
  }, [props._datas]);

  // const handleCheckboxChange = (key) => {

  //   const updatedItems = [...items];  
  //   updatedItems[key] = !updatedItems[key]
  //    setItems(updatedItems);
  // };
  const handleCheckboxChange = (key) => {
    setItems((prevItems) => ({
      ...prevItems,  // 기존 items 복사
      [key]: !prevItems[key],  // 해당 key의 값을 반전시킴
    }));
  };

  const checkboxContainerStyle = {
    display: 'flex',  // flexbox 사용
    alignItems: 'center', // 수평 정렬
    height: line_height_,
    marginBottom: '15px',
  };

  const checkboxStyle = (isActive) => ({
    position: 'relative',
    display: 'flex',
    width: '20px',
    height: '20px',

    border: '2px solid #2c48e8',
    borderRadius: '5px',
    backgroundColor: isActive ? main_color_ : '#fff',
  });

  const checkmarkStyle = {
    position: 'absolute',
    left: '4px',
    top: '0',
    color: 'white',
    fontSize: '0.8vw',
  };

  const labelStyle = (isActive) => ({
    fontSize: '0.8vw',
    marginRight: '20px',
    userSelect: 'none',
  });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items && Object.entries(items).filter(([key]) => key !== 'key')
          .map(([key, value]) => (
            <li key={key} style={{ width: '100%', alignItems: 'center' }}>
              <div style={checkboxContainerStyle} onClick={() => handleCheckboxChange(key)} >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: width_[0], height: '100%' }}>
                  <label
                    htmlFor={`checkbox-${key}`}
                    style={labelStyle(value)}
                  >
                    {key}
                  </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: width_[1], height: '100%' }}>
                  <input
                    type="checkbox"
                    id={`checkbox-${key}`}
                    checked={value}
                    onChange={() => handleCheckboxChange(key)}
                    style={{ position: 'absolute', visibility: 'hidden', width: '0px' }} // 체크박스를 숨길 때 다른 방식 사용
                  />
                  <span
                    style={{
                      ...checkboxStyle(value),
                      ...(value && { content: '"✔"' }),
                    }}
                  >
                    {value && <span style={checkmarkStyle}>✔</span>}
                  </span>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
});
export default CheckBox;