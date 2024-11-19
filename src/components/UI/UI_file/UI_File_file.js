import React, { forwardRef,useEffect, useState,useImperativeHandle } from 'react';
import Icon_File from './../../../Icon/Icon_file.png'

const File = forwardRef((props, ref) => {
// const File = ({ _file_name, _file_size = 'xMB', _file_data = null }) => {
    const DATA_file_name_ = props._file_name ? props._file_name : 'N'
    const DATA_file_data_ = props._file_data? props._file_data : 'WWWWWWWWWW'//useState(_file_data ? _file_data : '');
    
    useImperativeHandle(ref, () => ({
        func_get_file_data
    }));
    const func_get_file_data=()=>{
        return DATA_file_data_
    }
    const formatFileSize = (sizeInBytes) => {
        if (sizeInBytes < 1024) return `${sizeInBytes} B`;
        else if (sizeInBytes < 1024 ** 2) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        else if (sizeInBytes < 1024 ** 3) return `${(sizeInBytes / 1024 ** 2).toFixed(2)} MB`;
        else return `${(sizeInBytes / 1024 ** 3).toFixed(2)} GB`;
    };
    const DATA_file_size_ = props._file_size==='xMB'?'not_load':formatFileSize(props._file_size);

    return (<div style={{ display: 'flex', justifyContent: 'center', width: '80%',minWidth:'20%',maxWidth: '32%', height: '50px', backgroundColor: '#888888', margin: '5px', borderRadius: '5px' }}>
        <div style={{ display: 'flex', width: '20%', height: '100%' }}><img src={Icon_File} style={{display: 'flex',width: '100%', height: '80%' }}></img></div>
        <div style={{ display: 'flex', flexDirection: 'column',  width: '80%', height: '100%' ,padding:'1px'}}>
            <span style={{ flex: 3,padding:'1px', textAlign: 'left', fontSize: '3vh', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{DATA_file_name_}</span>
            <span span style={{ flex: 2,padding:'1px', textAlign: 'left', fontSize: '2vh', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{DATA_file_data_.slice(0, 20)}</span>
            <span span style={{ flex: 2,padding:'1px', textAlign: 'right', fontSize: '2vh', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{DATA_file_size_}</span>
        </div></div>);
});

export default File;