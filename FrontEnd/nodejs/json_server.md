Express 내 JSON-SERVER 설치하기
=====
**JSON-SERVER**는 nodejs 기반으로 단순히 RestAPI를 Mockup 형태로 사용할 수 있게 제공하는 서버이다. **lowdb** 라이브러리 기반으로 관리 되며, `.json` 타입으로 파일에 저장되기도 한다.

JSON-SERVER를 Express 기반에 도입하고, **URL**에 따라 분리되어 사용할 수 있게 구성하는 것을 목표로 한다.

준비
----
* nodejs 6.X 이상 설치
* [Express Generator 설치하기](https://expressjs.com/en/starter/generator.html)

설치
-----
#### Express Generator 로 프로젝트 구성
* Express로 프로젝트 원형 설치 (View 엔진은 큰 의미 없음.)
  * `express --view=pug JsonServer`
  * `JsonServer`라는 디렉토리가 생기고 그안에 원형이 생성됨.
* 프로젝트 초기화
  * `cd JsonServer`
  * `npm install`
  * 라이브러리들을 다운로드
* [Json-Sever 설치](https://github.com/typicode/json-server)
  * `npm install json-server --save-dev`

Express 설정에 JsonServer를 연결
-----
* `app.js`에 Json-Server 연결 추가
  * 상단 선언 부에 한줄 추가
    * `var jsonServer = require('json-server');`
  * 중단 `app.use('/users', users);` 아래에 한줄 추가
    * `app.use('/rfapi', jsonServer.router('db.json'));`
    * 가장 상위 디렉토리에 db.json 파일을 기본 DB 파일로 사용

DB 구성
-----
`db.json`을 가장 상위에 생성하고, 아래와 같이 생성한다.

```json
{
  "tests": [],
  "goods": []
}
```

DB 내역이 들어갈 위치를 먼저 사전에 정의를 해야 접근할 수 있다.

사용법
-----
https://github.com/typicode/json-server