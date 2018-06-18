어썸 링크
=====
### Nodejs
* [2018년에 더 나은 Node.js App을 만들기 위한 8가지 팁](http://tech.javacafe.io/2018/01/11/Tips-to-Build-Better-Node/) : 필요한 것들만 정리되어 있고, 각각 항목들은 링크로 접근하여 바로 정보를 확인 할 수 있게 적용했다.
* [ExpressJS에서 Sequelize 사용하기](http://webframeworks.kr/tutorials/expressjs/expressjs_orm_one/) : Nodejs에서 `ORM`을 사용하기 위해 중요한 **Sequelize**의 사용을 잘 정리했으며, 정말 필요한 컬럼 정의에 대한 정보가 깔끔하게 정리해 놓았다.
* [npm 사용 시 ssl 문제 처리](https://stackoverflow.com/questions/13913941/how-to-fix-ssl-certificate-error-when-running-npm-on-windows) : 사내 망과 같이 프록시나 자체 인증서를 사용하는 경우 ssl 접근이 어려워 `npm install`이 제대로 동작하지 않는다. 이럴 경우 ssl 엄격 모드를 해제하거나 인증서 파일을 직접 지정하는 방법이 있는데, 이 이슈를 해결한 내용이다.

### javascript
* [jquery보다 먼저 알았으면 좋은 것들](http://blog.jeonghwan.net/2018/01/25/before-jquery.html) : jQuery를 사용하지 않아도 기본 javascript만으로도 많은 것을 할 수 있다. 그것들을 간단한 예시를 통해 정리해 놓았다.
* [자바스크립트 this 바인딩 우선순위](http://blog.jeonghwan.net/2017/10/22/js-context-binding.html) : Javascript에서 이해하기 힘든 것 중 한가지가 바로 `this`이다. 이를 우선순위에 맞게 잘 설명하였으며, 마지막에 4줄 요약으로 간단히 볼 수 있게 설명하였다. 물론 예외상황들은 항상 존재하지만...

### ECMA 6
* [Check out these useful ECMAScript 2015 (ES6) tips and tricks](https://medium.freecodecamp.org/check-out-these-useful-ecmascript-2015-es6-tips-and-tricks-6db105590377)

### Vuejs
* [vue-router와 vuex를 이용한 SPA 내 인증설명](http://blog.jeonghwan.net/2018/03/26/vue-authentication.html) : `vue-router`와 `vuex`를 활용하여 인증 기능을 만드는 예제를 과정과 같이 잘 설명해 놓았다.

### Version Management
* **[GIT 활용하기](https://khbrst.github.io/2017/07/30/handy-git/)** : GIT 도구들에 대한 소개가 잘 되어 있다. 일반적인 Client 만 소개하지 않고 diff 툴등 여러가지를 직접 써보고 소개하고 있다.
* [What are the best Git clients for Windows?](https://www.slant.co/topics/2089/~git-clients-for-windows) : 윈도우에서 사용되는 많은 GIT Client 툴에 대한 소개와 평가를 다중 지식 개념으로 구성하였고, 각 툴에 대한 금액 및 무료 여부와 Link 정보를 알기 쉽게 구현했다.

### Python
* [Proxy 환경에서 PIP 설정하기](https://m.blog.naver.com/PostView.nhn?blogId=ajkun&logNo=220562953700&proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F) : 회사 사내 망은 자체적인 프록시와 인증서를 가지고 SSL을 접근한다. 그럴 경우 PIP가 제대로 수행되지 못하는데, 이 방법을 통하면 회사 인증서로 PIP 원격 서버에 접근할 수 있다.
* [Why Anaconda? How to control Anaconda?](https://gzupark.github.io/articles/Why-Anaconda-How-to-control-Anaconda/#2-0) : 아나콘다는 데이터 사이언스 개발을 위하여 많은 관련 라이브러리들을 한셋으로 만들고 이를 통해 가상화 환경을 만들어 준다. 이 아나콘다는 무엇이고, 어떻게 사용하는지 자세히 설명되었다.