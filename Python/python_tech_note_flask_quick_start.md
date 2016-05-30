Python Tech note - Flask Quick Start
=====
Prepare
-----
* IDE
	* PyDev - http://www.pydev.org/
	> 이클립스 기반, 무료 IDE인 이클립스에 플러그인으로 설치하여 사용
	> StandAlone 형태로 가벼운 [LiClipse](http://www.liclipse.com/)에 설치하여 쓸 수 있음. 기본적으로 pydev가 내장되어 있음.
	* PyCharm - https://www.jetbrains.com/pycharm/
	> Jetbrain 사의 제품. 가장 인기있고 많은 기능이 지원됨. Django 개발은 **유료 제품**에만 지원됨.
	* LiClipse - http://www.liclipse.com/
	> 가벼운 버전의 이클립스. 기본적으로 PyDev 모듈을 탑재하고 있음.

EDU Link
-----
* 파이썬을 배우는 최고의 방법 - https://nolboo.github.io/blog/2014/08/10/the-best-way-to-learn-python/
* 파이썬을 이용한 시스템 트레이딩 (기초편) - https://wikidocs.net/book/110
* [파이썬 플라스크로 배우는 웹 프로그래밍](http://abcds.kr/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%ED%94%8C%EB%9D%BC%EC%8A%A4%ED%81%AC%EB%A1%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EC%9B%B9%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/)
* 파이썬 빠르게 시작하기 - http://flask-docs-kr.readthedocs.org/ko/latest/quickstart.html
* 위키북스 : 점프 투 파이썬 - https://wikidocs.net/book/1

IDE 선정
-----
* **PyCharm**으로 진행
	* 대중적으로 사용하며, **Flask**을 웹프레임 웍으로 사용할 예정

* **Editor Font** 변경
	1. 상단 바 메뉴 중 File > **Settings...** 선택
	2. 좌측 Navi 바 메뉴 중 Editor > Colors & Fonts > **Font** 선택
	3. 기본 테마를 선택하고, **Save As...** 클릭 하고 테마 이름 지정
	4. 적절한 폰트로 변경 후 적용

REST Framework 준비 - FLASK
-----
* 마이크로 서비스 구성에는 거대한 몸집의 Django 보다 Flask가 유연하고 가벼움.
* 추가적으로 필요한 라이브러리들은 직접 추가하고 써보는 방법으로 진행.

#### 준비
* `pip`를 사용하기 위해서는 아래의 명령어를 실행
* (현재) 3.5 버전에서는 **easy_install**이 설치되어 있다.
	* **설치 명령** : `easy_install pip`

#### Virtualenv 설치
* 기존에 설치되어 있는 파이썬을 Fork하여 격리된 환경으로 구성한다.
* 라이브러리들을 각 프로젝트 별로 따로 설치할 수 있게 하며, 쉽게 복사 이전/관리 할 수 있게 한다.
* **설치 명령** : `pip install virtualenv`

#### 프로젝트 디렉토리 생성 후, 가상 환경 구성
* 프로젝트가 위치할 특정 위치에 워크스페이스 디렉토리 생성
* 프로젝트 디렉토리를 생성하면 그 안에 아래 명령을 실행하여 가상 환경을 구성한다.
* **설치 명령** : `virtualevn venv`
	* `venv`를 사용하면 PyCharm에서 자동 인식되는 것으로 확인

#### 가상 환경 진입
* `venv` 디렉토리 내부에 `Scripts`에 위치한 `activate` 실행
	* **windows**일경우 `activate.bat`로 실행

#### Flask 설치
* 가상환경 안에서 설치 진행
* **설치 명령** : `pip install flask`

> note: `could not find a version that satisfies the requirement flask`가 나올 경우, 네트워크 문제로 외부 라이브러리 저장소에 접근하지 못할 경우 나오는 문제. 직접 https://github.com/mitsuhiko/flask 위치로 가서 소스 받아 설치 해야 함.
> * 설치 방법 - `python setup.py install`

Hello Rest Example
-----
* `venv` 디렉토리의 부모 디렉토리를 PyCharm에서 로드하면 자동으로 `venv`를 파이썬 환경으로 인식함.
* **hello.py** 생성 및 작성

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'hello world!'

if __name__ == '__main__':
    app.debug = True
    app.run()
```

* 소스를 실행하고, `http://127.0.0.1:5000` 으로 접근

> note: Flask 설치 및 실행까지 되나, PyCharm에서 `unresolved reference flask` 이슈가 나오는 문제 해결 방안
> 1. 상단 바 메뉴 중 File > **Invalidate Caches/Restart...** 선택
> 1. **Invalidate and Restart** 클릭
> 1. 상단 바 메뉴 중 File > **Settings...** 선택
> 1. 좌측 Navi 바 메뉴 중 Project: ... > **Project Interpreter** 선택
> 1. Project Interpreter에 **venv** 설정 확인하고, 패키지 리스트에 **flask** 설치 확인
> 1. 설정 버튼 선택해서, Interpreter를 지우고 다시 등록

Flask 라우팅
-----
```python
# _*_ coding: utf-8 _*_

from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'hello world!'

@app.route('/main')
def main():
    return 'Main Page'

if __name__ == '__main__':
    app.debug = True
    app.run()
```
* `@app.route()`를 통해 URL 패턴과 POST Method를 정의하고, 바로 하단의 함수에서 URL 패턴 매칭되는 Action을 처리
* `app.debug`는 개발의 편의를 위해 존재하며, `True`값을 경우 코드를 변경하면 자동으로 서버가 재 실행 된다. 또한, 웹상에서 파이썬 코드를 수행할 수 있게 되므로, **운영환경**에서 **사용**을 **유의**해야 한다.
* 현재 접근은 개발 소스가 존재하는 로컬에서만 접근 가능하다. 외부에서도 접근을 가능하게 하려면 `app.run(host='0.0.0.0')`로 서버 실행 부를 변경해야 한다.

> note: `# _*_ coding: utf-8 _*_`는 한글과 같은 ascii 이외의 CharacterSet을 처리하기 위해 선언함.
> note: 리눅스에 실행되기 위해서는 쉘이 인식할 수 있도록 가장 상단에 `#!/usr/bin/python`과 같이 실행 위치를 지정해야 함.

```python
@app.route('/user/<username>')
def showUserProfile(username):
    return 'USER : %s' % username

@app.route('/user/id/<int:userId>')
def showUserProfileById(userId):
    return 'USER ID : %d' % userId

```
* `<>`로 URL 패턴을 변수로 처리 가능
	* `자료형:` 형식으로 URL 패턴 검증 가능. `int:`는 정수만 입력 가능을 의미

Flask 로깅
-----
```python
@app.route('/user/<username>')
def showUserProfile(username):
    app.logger.debug('RETRIEVE DATA - USER ID : %s' % username)
    app.logger.debug('RETRIEVE DATA - Check Compelete')
    app.logger.warn('RETRIEVE DATA - Warning... User Not Found.')
    app.logger.error('RETRIEVE DATA - ERR! User unauthenification.')
    return 'USER : %s' % username
```
* Flask 자체 `app.logger` 항목을 통해 로깅 가능

Flask 로그인 및 세션 생성
-----
* 예제를 하기 앞서 상단 **import**을 아래와 같이 추가/수정한다.
	* `from flask import Flask, request, session, render_template`

```python
@app.route('/account/login', methods=['POST'])
def login():
    if request.method == 'POST':
        userId = request.form['id']
        wp = request.form['wp']

        if len(userId) == 0 or len(wp) == 0:
            return userId+', '+wp+' 로그인 정보를 제대로 입력하지 않았습니다.'

        session['logFlag'] = True
        session['userId'] = userId
        return session['userId'] + ' 님 환영합니다.'
    else:
        return '잘못된 접근입니다.'

app.secret_key = 'sample_secreat_key'
```
* `@app.route('/account/login', methods=['POST'])` 내부에 **methods** 항목을 통해 받을 REST Action Type을 지정
	* 지정 이외의 Action Type을 사용하면 Flask가 **405 에러**를 출력
* **request** 모듈에서 POST 한 파라미터 값을 가져오기 위해서는 `request.form['id']`와 같이 사용
	* `request.form['id']`로 사용 시 `id` 파라미터가 없으면 Flask가 **400 에러**를 출력
* `app.secret_key`는 세션 키를 생성하며, 로그인과 같이 세션을 맺는 경우 필수적으로 넣어야 한다.
	* 세션 생성 시, `app.secret_key`로 키를 생성하지 않으면 Flask가 **500 에러**를 출력

#### 로그인 정보 가져오기
```python
@app.route('/user', methods=['GET'])
def getUser():

    if session.get('logFlag') != True:
        return '잘못된 접근입니다.'

    userId = session['userId']
    return '[GET][USER] USER ID : {0}'.format(userId)
```

#### 로그 아웃
* 예제를 하기 앞서 상단 **import**을 아래와 같이 추가/수정한다.
	* `from flask import Flask, request, session, render_template, redirect, url_for`

```python
@app.route('/account/logout', methods=['POST','GET'])
def logout():
    session['logFlag'] = False
    session.pop('userId', None)
    return redirect(url_for('main'))
```
* `redirect()`를 활용하면, 사용자의 조회 위치를 변경할 수 있다.
* `url_for()`는 route 주소로 이동하는 것이 아닌 정의된 **함수**를 호출한다. 위 예제에서 **main**을 호출하는 대상은 `main()`인 함수다.
* `session.clear()`를 사용하면 따로 설정 필요없이 session을 비울 수 있다.

Flask Error 처리
-----
```python
@app.errorhandler(400)
def uncaughtError(error):
    return '잘못된 사용입니다.'
```
* `@app.errorhandler()`를 통해 특정 에러를 Catch 및 처리 할 수 있다.

> note: `abort()`를 사용하면, 특정 error를 발생 시킬 수 있다. 예> `abort(401)` 물론 **abort** 모듈을 import 해야 된다.

#### abort 예시
```python
@app.route('/user', methods=['GET'])
def getUser():
    if 'userId' in session:
        return '[GET][USER] USER ID : {0}'.format(session['userId'])
    else:
        abort(400)
```
* session 안에 `userId` 항목이 없다면, abort를 통해 **400**에러가 출력되게 한다.

Flask 응답 처리
-----
```python
@app.errorhandler(404)
def not_found(error):
    resp = make_response(render_template('error.html'), 404)
    resp.headers['X-Something'] = 'A value'
    return resp
```
* `make_response()` 함수를 통해 반환 되는 Object를 만들고, 이를 처리 가능할 수 있게 된다.

Flask Redirect 처리
-----
특정 URL Alias 등 Redirect가 필요한데, Post 데이터를 같이 보내어서 Redirect를 하려면, `url_for()` 함수를 사용 시, 상태 코드 값을 같이 보내어야 한다.
```python
@app.route('/login', methods=['POST','GET'])
def login_direct():
    if request.method == 'POST':
        return redirect(url_for('login'), code=307)
    else:
        return redirect(url_for('login'))
```