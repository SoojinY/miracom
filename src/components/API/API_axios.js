// import React, { useState } from 'react';

// // const API_axios = () => {
//     const API_URL='http://165.132.144.52:8000'

//     const API_axios = async (data, callback=null) => {
//         try {
//             const response = await fetch(API_URL, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const result = await response.json();
//             if (callback)callback( result); 
//             return result;
//         } catch (error) {
//             if (callback)callback( 'error 발생'); 
//             return null;
//         }
//     };
// // }
// export default API_axios;

// import React, { useState } from 'react';
// const { createProxyMiddleware } = require("http-proxy-middleware");

// // const API_axios = () => {
//     const API_URL='http://localhost:4300/api'
//     const API_model="Qwen/Qwen2-7B-Instruct"

//     const API_axios = async (data, callback=null) => {

//         module.exports = function (app) {
//         app.use(
//             "/api1",
//             createProxyMiddleware({
//               target: API_URL,
//               changeOrigin: true,
//             })
//           );
//         }
//         try {
//             const response = await fetch(API_URL, {
//                 method: 'get',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'api_key':"",
//                     'model': API_model
//                 },
//                 body: JSON.stringify(data),
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const result = await response.json();
//             if (callback)callback( result); 
//             return result;
//         } catch (error) {
//             if (callback)callback( 'error 발생'); 
//             return null;
//         }
//     };
// // }
    
// export default API_axios;


import React, { useState } from 'react';
import axios from 'axios';
// const API_axios = () => {
    const API_URL='http://10.0.33.11:4300/api'
    const API_model="Qwen/Qwen2-7B-Instruct"


    const API_axios = async (data, callback=null) => {
        try {
        const response = await axios.post(API_URL, {
        text: data
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
        console.log(response)

        const result =response.data.translation ;
        // translation 데이터 추출
        
        return result;
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            // const result = await response.json();    
            // const translation = result.data.translation;
            // if (callback)callback( result);
            // return translation;  

            // const result =response.data.translation ;
            // // translation 데이터 추출
            
            // return result;
            // if (callback)callback( result);
            // return result;
        } catch (error) {
            if (callback)callback( 'error 발생');
            return null;
        }
    };
// }
export default API_axios;