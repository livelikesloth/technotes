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
* jQuery가 설치 완료 되면, 버전을 가져와 설치됨을 확인한다.
	* 콘솔창에서 `jQuery.fn.jquery` 혹은, `$.fn.jquery`

bootstrap 설치하기
-----
* npm을 통해 bootstrap 설치
	* `$ npm install --save bootstrap`
* `/src/main.js`에 jquery 아래에 등록
	* `require('bootstrap')`
* **bootstrap**은 require만 하게 되면, js만 가져오니, import로 css 또한 가져와야 한다.
	* `import 'bootstrap/dist/css/bootstrap.min.css'`
* bootstrap이 설치됨을 확인 한다.
	* 콘솔 창에서 `typeof $().modal == 'function'`를 실행하여 `true`가 출력할 경우 설치가 된것이다. (modal은 bootstrap javascript 기능)
	* **DOM**부분에 `<button class='btn btn-primary'>TEST</button>` 만 넣어도 Bootstrap CSS가 적용됨을 확인 할 수 있다.

'$'가 정의되지 않았다고?
-----
* `require`를 통해 `window.$`에 **jquery**를 심어 넣으면, 어디서든 접근하는 것이 맞다. 그런데, 막상 스크립트 안에서 쓰려고 하면 '$'가 정의되지 않았다라는 에러가 ESLint에서 발생된다.
* **ESLint**는 스크립트 이렇게 개발하세요라는 어떤 규약인데, 이거 안해도 컴파일에는 이상이 없지만, **webpack 템플릿** 구성 시 ESLint를 사용하기로 했기 때문에 이 **규칙**을 따라야 한다.
* 각 Vue Component의 `<script>` 내 상단에 import를 하면된다.
	* `import $ from 'jquery'`
* 혹은, ESLint 설정에 '$'와 같이 전역으로 사용되는 기호 체크를 등록 가능하다.
	* `/.eslintrc.js` 내 설정 내역 중 아래의 내용 추가
```
globals:{
    '$': false
  }
```

Custom javascript lib 설치하기
-----
* `src` 디렉토리 밑에 적절한 위치를 선정하여 이전에 작성한(있다면...) javascript lib를 배치한다.
	* 가이드 진행 상, `/src/libs`라는 디렉토리를 생성하고, `jglibs.js`를 위치 시킴
	* ES6의 Module로 라이브러리가 적용되어야 하기 때문에, 모듈화 시키고, `export default`로 해당 모듈이 외부에서 사용할 수 있도록 해야 한다.
	* `require`로 사용하려면, 라이브러리내 `define` 함수 정의를 하면된다.
* `import`로 추가한 라이브러리를 사용할 **Vue**의 `<script>` 태그 안에 추가하면된다.
	* `import jg from '@/libs/jglibs.js'`
	* `@`는 src 디렉토리를 의미한다.
* jQuery와 같이 **전역**으로 사용하려면, `main.js`에 jQuery와 동일하게 등록하고, eslint 예외 설정도 추가해야 한다.

Custom css 추가
----
* 템플릿 구성을 그대로 사용한다면, 각 컴포넌트 단위로 **Style**을 구성할 수 있다.
	* `<style scoped>` 태그 내 **scoped**라고 정의하면, 그 컴포넌트 안에서만 동작하는 style이 되지만, scoped를 빼면 전체 적용된다.
	* Component 단위로 잘 쪼개서 만든다면 문제가 없는 구조이지만...
* CSS를 한 곳에 몰아 놓을 필요가 있다.
	* 퍼블리셔가 작업 할 수 있고, Class 단위로 관리 등을 위해서 필요성이 있을 수 있다.
	* `.css`로 파일을 만들어 스타일 정의해서 만들어 놓으면 됨.
	* `main.js`에서 추가 시, 전체에서 사용 가능.

less 추가
----
* webpack 템플릿 분석 간 less 및 scss 등 css 전처리기들을 지원하는데, 막상 설치될 때 설치되지 않는다.
	* `less`와 `less-loader`를 설치한다.
	* `$ npm install --save less less-loader`
* less는 두가지 형태로 사용가능하다.
	* `.less`파일을 만들고 `main.js`에서 등록
	* 각 Vue Component내 **style**에서 선언
		* `<style lang="less" scoped>`  

Webpack에서 Reverse Proxy 사용하기
-----
* **Restful API** 서버를 따로 구성해서 사용하기 때문에, Webpack에서 WAS로 접근 가능하기 위하여 **Reverse Proxy** 설정을 해야한다.
	* `/config/index.js`에 Webpack으로 dev나 build 명령을 사용 시 적용되는 설정 값을 정의
	* `proxyTable` 부분에 아래와 같이 추가
```
proxyTable: {
  '/jgapi': {
    target: 'http://localhost:3000',
    secure: false
  }
}
```
* URL을 기반으로 정의하며, `target`으로 Proxy 된다.
	* 예제는 `/jgapi`로 오는 접근은 `http://localhost:3000/jgapi`로 Proxy 접근 된다.


링크
----
* [VueJS 가이드](https://kr.vuejs.org/)
* [Vue-Router 가이드](https://router.vuejs.org/kr/)
* [Webpack dev 서버 설정](https://webpack.github.io/docs/webpack-dev-server.html)
* [ES6: Module 설명](http://ohgyun.com/588)
* [RequireJS 사용방법 정리](http://programmingsummaries.tistory.com/204)