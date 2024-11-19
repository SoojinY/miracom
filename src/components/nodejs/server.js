const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Client } = require('ssh2');
const iconv = require('iconv-lite');
const cors = require('cors');
const WebSocket = require('ws');

// Express 앱 설정
const app = express();
app.use(cors());

const port = 4305;
app.use((req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
});
// Multer 설정 (메모리에 파일을 임시로 저장)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// HTML 폼 페이지와 Node.js 서버 코드가 합쳐짐
app.get('/file_select', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>파일 업로드</title>
      </head>
      <body>
        <h1>파일 업로드</h1>
        <form action="/upload" method="POST" enctype="multipart/form-data" accept-charset="UTF-8">
          <label for="file">파일 선택:</label>
          <input type="file" name="file" id="file" required />
          <button type="submit">업로드</button>
        </form>
      </body>
      </html>
    `);
});
app.get('/files', (req, res) => {
    const dirPath = req.query.dir;  // 쿼리 파라미터로 디렉토리 경로를 받음
    const format = req.query.format || 'html';  // 기본 형식은 HTML

    if (!dirPath) {
        return res.status(400).json({ error: '경로를 입력해 주세요.' });
    }

    const fullPath = path.join(__dirname, dirPath);

    // 경로가 실제 디렉토리인지 확인
    fs.readdir(fullPath, (err, items) => {
        if (err) {
            console.error('디렉토리 읽기 오류:', err);
            return res.status(500).json({ error: '디렉토리 읽기 오류' });
        }

        // 파일만 필터링하기 위해 각 항목이 파일인지 폴더인지를 확인
        const fileListPromises = items.map(item => {
            return new Promise((resolve, reject) => {
                const itemPath = path.join(fullPath, item);

                fs.stat(itemPath, (err, stats) => {
                    if (err) {
                        reject(err);
                    } else {
                        // 파일인 경우만 배열에 추가
                        if (stats.isFile()) {
                            resolve(item);  // 파일이면 파일 이름을 반환
                        } else {
                            resolve(null);  // 폴더는 제외
                        }
                    }
                });
            });
        });

        // 모든 항목에 대해 처리 후 파일만 남기기
        Promise.all(fileListPromises)
            .then(files => {
                // null 값을 필터링하여 실제 파일만 남긴다
                const fileNames = files.filter(file => file !== null);

                // 파일명만 반환
                return res.json({ files: fileNames });
            })
            .catch(err => {
                console.error('파일 필터링 오류:', err);
                res.status(500).json({ error: '파일 필터링 오류' });
            });
    });
});
// app.get('/files', (req, res) => {
//     const dirPath = req.query.dir;  // 쿼리 파라미터로 디렉토리 경로를 받음
//     const format = req.query.format || 'html';  // 기본 형식은 HTML

//     if (!dirPath) {
//         return res.status(400).json({ error: '경로를 입력해 주세요.' });
//     }

//     const fullPath = path.join(__dirname, dirPath);

//     // 경로가 실제 디렉토리인지 확인
//     fs.readdir(fullPath, (err, items) => {
//         if (err) {
//             console.error('디렉토리 읽기 오류:', err);
//             return res.status(500).json({ error: '디렉토리 읽기 오류' });
//         }

//         // 파일만 필터링하기 위해 각 항목이 파일인지 폴더인지를 확인
//         const fileListPromises = items.map(item => {
//             return new Promise((resolve, reject) => {
//                 const itemPath = path.join(fullPath, item);

//                 fs.stat(itemPath, (err, stats) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         // 파일인 경우만 배열에 추가
//                         if (stats.isFile()) {
//                             resolve(item);  // 파일이면 파일 이름을 반환
//                         } else {
//                             resolve(null);  // 폴더는 제외
//                         }
//                     }
//                 });
//             });
//         });

//         // 모든 항목에 대해 처리 후 파일만 남기기
//         Promise.all(fileListPromises)
//             .then(files => {
//                 // null 값을 필터링하여 실제 파일만 남긴다
//                 const fileNames = files.filter(file => file !== null);

//                 // 각 파일의 내용을 읽어오는 비동기 함수
//                 const fileContentsPromises = fileNames.map(file => {
//                     return new Promise((resolve, reject) => {
//                         const filePath = path.join(fullPath, file);

//                         // 파일의 처음 30글자만 읽기
//                         const buffer = Buffer.alloc(200);  // 앞의 30바이트를 읽을 버퍼를 준비
//                         fs.open(filePath, 'r', (err, fd) => {
//                             if (err) {
//                                 reject(err);
//                                 return;
//                             }
//                             // 처음 30바이트만 읽음
//                             fs.read(fd, buffer, 0, 200, 0, (err, bytesRead, buffer) => {
//                                 if (err) {
//                                     reject(err);
//                                 } else {
//                                     const content = buffer.toString('utf8', 0, bytesRead);  // 읽은 내용을 UTF-8로 변환
//                                     resolve({ name: file, content: content });
//                                 }
//                                 fs.close(fd, (err) => {
//                                     if (err) {
//                                         reject(err);
//                                     }
//                                 });
//                             });
//                         });
//                     });
//                 });

//                 // 모든 파일 내용을 읽어들인 후 처리
//                 return Promise.all(fileContentsPromises)
//                     .then(fileContents => {
//                         // "name"과 "content"로 구성된 객체 배열을 반환
//                         return res.json({ files: fileContents });
//                     })
//                     .catch(err => {
//                         console.error('파일 내용 읽기 오류:', err);
//                         res.status(500).json({ error: '파일 내용 읽기 오류' });
//                     });
//             })
//             .catch(err => {
//                 console.error('파일 필터링 오류:', err);
//                 res.status(500).json({ error: '파일 필터링 오류' });
//             });
//     });
// });

app.post('/upload', upload.array('file'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('파일이 없습니다.');
    }

    let directory = req.body.directory ? req.body.directory : '';
    if (directory && directory.length === 0) {
        directory = '';
    } else if (directory && !directory.endsWith('/')) {
        directory += '/';
    }

    let uploadPromises = req.files.map((file) => {
        // 로컬 저장 경로 설정
        let localFilePath = path.join(__dirname, 'uploads', directory, iconv.decode(file.originalname, 'utf-8'));

        // 경로에 불필요한 괄호 제거
        localFilePath = localFilePath.replace(/[()]/g, '');

        return new Promise((resolve, reject) => {
            // 업로드할 디렉토리가 없다면 생성
            const dirPath = path.dirname(localFilePath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            // 메모리 상의 파일을 로컬 서버에 저장
            fs.writeFile(localFilePath, file.buffer, (err) => {
                if (err) {
                    console.error('파일 저장 오류:', err);
                    return reject('파일 저장 오류');
                }

                console.log(`파일이 ${localFilePath}로 성공적으로 저장되었습니다.`);

                // 업로드된 파일 이름을 결과 배열에 포함
                resolve({ name: file.originalname });
            });
        });
    });

    // 모든 업로드가 완료되면 응답
    Promise.all(uploadPromises)
        .then((results) => {
            // 업로드된 파일들의 이름을 배열로 반환
            res.json(results); // [{name: 'name1'}, {name: 'name2'}, ...]
        })
        .catch((err) => {
            res.status(500).send('파일 업로드 중 오류가 발생했습니다.');
        });
});
// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중`);
});



// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 로그인 페이지를 위한 정적 파일 서비스
app.use(express.static(path.join(__dirname, 'public')));


// 로그인 폼 처리
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    clientIp = clientIp.replace(/^::ffff:/, '');
    // WebSocket 서버와 연결


    let socket_url = `ws://${clientIp}:29282`
    const ws = new WebSocket(socket_url, { "rqtype": "getknoxsso", "data": "KCTEST0001", "token": "" }); // 수정된 clientIp 사용
    console.log('Attempting to connect to WebSocket server at ', socket_url);
    console.log('Attempting to connect to WebSocket server at ', socket_url);

    // WebSocket 연결이 열리면 처리 시작
    ws.on('open', () => {
        console.log('WebSocket connection opened');

        const message = {
            rqtype: password,   // 비밀번호를 rqtype에 담고
            data: username,     // 아이디를 data에 담아서 전송
            token: ''           // 토큰은 빈 문자열로 설정
        };

        console.log('Sending message to WebSocket server:', JSON.stringify(message));
        // 메시지 전송

        // ws.send(JSON.stringify(message));
        ws.send(JSON.stringify({ "rqtype": "getknoxsso", "data": "KCTEST0001", "token": "" }));
    });

    // WebSocket 서버로부터 응답을 받으면 처리
    ws.on('message', (response) => {
        console.log('Received from WebSocket server:', response);

        // 응답을 받은 후 연결 종료
        ws.close();
        console.log('WebSocket connection closed after receiving response');

        // 응답 처리 후 클라이언트 리디렉션
        if (response === 'success') {
            console.log('Login successful, redirecting to home page');
            res.redirect('http://localhost:4300/'); // 성공 시 리디렉션
        } else {
            console.log('Login failed, redirecting to login page with error');
            res.redirect('http://localhost:4300/login?error=true'); // 실패 시 리디렉션
        }
    });

    // WebSocket 오류 처리
    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
        res.status(500).send('WebSocket connection failed');
    });

    // WebSocket 연결 종료 후 클라이언트 응답
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
    // WebSocket 연결 오류 처리
    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
        res.status(500).send('WebSocket connection error');
    });
});



app.delete('/delete', (req, res) => {
    // 쿼리 파라미터에서 'dir'을 받음
    const { dir } = req.query;
    // 경로를 절대 경로로 변환 (보안상 파일 경로를 서버의 특정 디렉토리로 제한해야 할 수 있음)
    const fullPath = path.resolve(__dirname, dir);

    // 파일 삭제
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error('파일 삭제 실패:', err);
            return res.status(500).json({ message: '파일 삭제 실패', error: err });
        }
        console.log(`파일 삭제 성공: ${fullPath}`);
        return res.status(200).json({ message: '파일 삭제 성공' });
    });
});


// 기본 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

