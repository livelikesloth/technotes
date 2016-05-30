React 용어 정의
=====
Component
-----
#### props
* 컴포넌트가 외부에서 전달 받은 값
* Parameter
* 불변성, 상수 값 처럼 컴포넌트 내부에서 변경 X

#### PropTypes
* 외부에서 전달 받은 **props**의 Validation을 **PropTypes**를 통해 할 수 있음
* 검증 실패 시, `console.warn`로 출력

#### getDefaultProps()
* **props**로 받은 인자 값과 혼용하여 기본 값 정의
* 컴포넌트가 정의될 때 만 호출

#### setProps & replaceProps
* 새로운 **props** 구성하여 컴포넌트를 다시 렌더링 할 때 사용
* **setProps**는 **props**를 merge하고, **replaceProps**는 대체
* **replaceProps**는 제거 예정
* 두번째 입력 값에 Callback 함수 지정 가능

#### state
* 컴포넌트 내부 변수 영역
* **props**를 가공하고 싶으면, 받아서 여기에 넣어 사용
* **state** 내부 변수를 변경하고 싶으면 `this.setState()`를 사용해야 함
> **note:** **View**는 `this.setState()`를 통해 변경된 **state** 값을 반영
* **state** 가 변경 되면 **binding**된 **View**는 자동으로 변경
* `this.setState()`는 두번째 입력 값에 Callback 함수 지정 가능

#### getInitialState()
* **state** 초기 값 생성

> **tip1:** `undo` 구현을 위해, `setState()`간 배열 오브젝트 참조 시, `push()`보다는 `concat()`를 활용하는 것이 유리
> **tip2:** **state**를 가진 컴포넌트는 최소화 하고, **props**만 가지고 구현할 수 있게하는 것이 유리. 여러 컴포넌트가 함쳐질 경우 최상위만 **state**를 가지고, 하위는 **props**로 제공할 수 있게 하는 것이 유리