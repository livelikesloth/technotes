VUE-CLI로 생성된 Template에 외부 라이브러리 추가하기
====
기본 준비
----
* [nodejs](https://nodejs.org/ko/) 4.x 혹은 6.x
* npm 3.x

진행 방안
----
* vue-cli 템플릿 중 **webpack** 템플릿을 기반으로 구성할 예정이며, 최대한 템플릿 수정 없이 그 환경 그대로 사용함을 규칙으로 하여 진행
* jQuery, bootstrap, less 및 custom js 파일을 추가하는 것으로 진행

vue-cli 설치
-----
* vue-cli Site : https://github.com/vuejs/vue-cli
* npm 3+ 이상 설치되어 있다면 바로 진행 가능
	* nodejs **최신 버전** 설치하면 바로 됨 (지금은 6.x 버전이 LTS라서 최신 혹은 LTS 버전 설치해도 문제 없음)

#### 설치
`$ npm install -g vue-cli`

webpack Template 설치
-----
`$ vue init webpack my-project`

* local에 Template 구성 시, **my-project**는 생성할 프로젝트 이름을 의미
* 실행하면 아래의 순서대로 초기화 설정 진행
	1. 프로젝트 명 입력
    	* 입력하지 않고, 그냥 엔터치면 이전에 정한 이름으로 자동 설정
    1. 프로젝트 설명 입력
    1. 작성자 입력
    1. runtime에 compiler 추가 여부 확인
	    * 키보드 위아래 키로 선택 가능
	1. vue-router 설치 여부
	1. ESLint 설치 여부
	1. ESLint 를 설치하면 적용할 규칙 셋을 선택
		* 키보드 위아래 키로 선택 가능
	1. 단위 테스트 도구 사용 여부
	1. e2e 테스트 도구 사용 여부
* Template 구성이 완료 되면, 모듈 다운로드 진행
	* 프로젝트 명으로 디렉토리는 생성
	* 프로젝트 디렉토리에서 모듈 설치
		* `$ npm install`
* 모듈이 다운로드 될 때 까지 차 한잔 마시면서 대기
* 설치가 완료 되면, **webpack** 개발 버전 실행
	* `$ npm run dev`
	* 실행이 완료되면, 기본 웹브라우져가 개발 템플릿 화면을 출력

주요 구조 팁
----
* `/index.html`은 vue를 출력하기 위한 그냥 껍데기
	* `<div id="app"></div>` 이 부분이 가장 중요하며, 이곳에 Vue가 들어가게 됨.
	* 차후 build하면 index.html에 js나 css등이 자동으로 inject되어 들어감.
* `/src/main.js` 가장 먼저 수행되는 스크립트
	* 추가되는 라이브러리 사용 등록 시, 이곳에 추가될 예정
* `/src/App.vue` 최상위 Vue. 이곳에 큰 Layout을 구성 가능
	* `<router-view></router-view>`은 **vue-router**가 url에 따라 변경되는 vue들을 삽입하는 곳
* `/src/router/index.js`는 url에 따라 출력될 vue 컴포넌트들을 등록하는 곳
	* vue-router : https://router.vuejs.org/kr/

jQuery 설치하기
-----
* npm을 통해 jquery 설치
	* `$ npm install --save jquery`
* `/src/main.js`에 jquery 등록
	* 최상위 위치에 `window.$ = window.jQuery = require('jquery')` 추가
	* **require**통해 jquery를 사용 등록한다.

bootstrap 설치하기
-----
* npm을 통해 bootstrap 설치
	* `$ npm install --save bootstrap`
* `/src/main.js`에 jquery 아래에 등록
	* `require('bootstrap')`
* **bootstrap**은 require만 하게 되면, js만 가져오니, import로 css 또한 가져와야 한다.
	* `import 'bootstrap/dist/css/bootstrap.min.css'`