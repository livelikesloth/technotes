Vuex note
=========
`vue-cli`를 기반(`v3.0.0 beta`)으로 생성된 프로젝트 기반 vuex 사용을 정리

#### `store.js`
* 전체 서비스 내 싱글톤 형식의 상태를 관리하는 데이터가 정의되고 관리되는 곳
* 크게 세가지 정의해야 함
  * **state** : 상태 값 혹은 전체의 **데이터**, 이곳은 mutations만으로 통해 변경 되어야 한다.
  * **mutations** : 상태 값을 변경하는 함수 셋
  * **actions** :
* 예시
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    inc (state) {
      state.count++
    }
  },
  actions: {

  }
})
```

#### `main.js`에 **store** 사용 정의
* **vuex**를 사용하기 위해서는 `store.js`로 정의된 내역을 전역 **Vue**에 등록해야 한다.
```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

#### 어떤 Component에서 상태 값 사용하기
* 예시 내역 기준으로 `this.$store.state.count` 형식을 사용하여 접근 가능
* `computed`를 통해 접근하는 것이 좋음
```javascript
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p><b>Count : </b>{{ count }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>
```

#### 상태 접근을 쉽게, `mapState` 헬퍼
* `computed` 내에 getter 항목을 항상 만드는 건 귀찮다.
* 예시와 같이 접근 가능
```javascript
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p><b>Count : </b>{{ count }}</p>
    <!-- mapState로 정의된 내역을 접근 -->
    <p><b>countAlias : </b>{{ countAlias }}</p>
    <p><b>countPlusLocalState : </b>{{ countPlusLocalState }}</p>
  </div>
</template>

<script>
// 독립 실행 형 빌드에서 헬퍼가 Vuex.mapState로 노출됩니다.
import { mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  data: function () {
    return {
      fixVal: 50
    }
  },
  computed: mapState({
    // 화살표 함수는 코드를 매우 간결하게 만들어 줍니다!
    count: state => state.count,

    // 문자열 값 'count'를 전달하는 것은 `state => state.count`와 같습니다.
    countAlias: 'count',

    // `this`를 사용하여 로컬 상태에 액세스하려면 일반적인 함수를 사용해야합니다
    countPlusLocalState (state) {
      return state.count + this.fixVal
    }
  })
}
</script>
```

* 상태와 동일한 명을 사용할 경우 문자열만 작성해도 됨
```javascript
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p><b>Count : </b>{{ count }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  data: function () {
    return {
      fixVal: 50
    }
  },
  computed: mapState([
    // 같은 이름으로 사용할거면 문자열만 적어도 OK
    'count'
  ])
}
</script>
```

* 전개 연산자를 통해 기존 computed로 정의한 내역과 혼용 사용 가능
```javascript
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p><b>Count : </b>{{ count }}</p>
    <p><b>countAlias : </b>{{ countAlias }}</p>
    <p><b>countPlusLocalState : </b>{{ countPlusLocalState }}</p>
    <!-- 기본 Computed 방식과 혼용해서 사용가능 -->
    <p><b>loadFixVal : </b>{{ loadFixVal }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  data: function () {
    return {
      fixVal: 50
    }
  },
  computed: {
    loadFixVal: function () {
      return this.fixVal
    },
    // 전개 연산자를 이용해 마무리 셋팅하면 기존 computed와 혼용하여 사용 가능
    ...mapState({
      count: state => state.count,
      countAlias: 'count',
      countPlusLocalState (state) {
        return state.count + this.fixVal
      }
    })
  }
}
</script>
```

* vuex를 사용하는 가장 중요한 전략은 상태 관리에 모든 값이 들어갈 필요 없다는 것. 중요하거나 필요한 값만 넣어 사용하자.