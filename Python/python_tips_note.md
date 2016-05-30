Python_Tips
=====
#### 세션 키 가져오는 방법
`session['key']`로 가져오는 것 보다, `session.get('key')`로 사용하는 것이 좋음. 전자의 경우 Exception Error를 발생시킴.

#### 문자열 형 변환
콘솔 등 출력하기 위해서 기존의 문자열 외 자료형을 사용한다면, C언어의  printf와 비슷한 문법인 파이썬 **문자열 포맷팅**을 사용한다. 아래의 예제는 **bool** 타입을 콘솔에 출력하는 것이다.
```python
app.logger.debug('logFlag in session %s' % session.get('logFlag'))
```
##### 다른 포맷팅 방법
* https://docs.python.org/2/library/string.html#formatstrings
```
>>> print('test {0} {1}'.format(an,bn))
test True False
```