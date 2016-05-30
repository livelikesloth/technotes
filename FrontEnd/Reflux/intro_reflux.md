Reflux Study Note
=====
Reactjs는 View만 구성하는 Framework이며, 이는 다른 부분은 직접 개발을 해야 한다는 의미를 가진다. 문제는 Reactjs를 사용하는 것 자체가 구조화 및 컴포넌트 기반의 개발을 하기 위한 것인데 직접 개발은 그것도 여러명이서 진행하는 개발은 필수적으로 문제점을 가지게 된다. 구조화된 개발은 제한적인 틀을 가지게 되고 그 안에서 개발자가 규칙을 강제하며 개발하게 된다. 이러한 구조화된 기능을 가진 Framework를 활용하여 Reactjs를 개발해야 한다. 또한 일반적인 MVC 모델은 Front-End에 적합하지 않는 구조다.
이에 Facebook 개발자들은 **Flux**라는 것을 개발하게 되고, 이를 통해 개발을 구조화 시키게 되었다.

**Flux**의 기본 아이디어는 데이터가 웹 앱에 적용되고 처리하는 것에 좀 더 기능적(Function)으로 접근하는 것이다.**Flux**의 개념은 앱에서 데이터와 이벤트를 `Action`과 `Data store`를 통해 처리하는 것이다. 이때 데이터의 흐름은 아래와 같다.

> **Action** --> **Data Store** --> Component

데이터의 변형은 **Action**을 통해서 일어난다. **Data Store**의 내용은 **Action**을 통해서만 변경된다. 이러한 평면적인 구조를 유지하는 것은 **View** 자체적으로 처리하여 일어나는 부작용을 제한하기 위함이다.
단방향의 강제적인 **Data-flow**는 **Action**에 의존하여 앱 전반적으로 영향을 미치는 데이터 변경에 대해 이해하기 쉽게 한다.

**reflux**는 **flux** 재 구현체이며, **flux**의 장점을 취하고, 단점을 제한하여 구성한 Framework다. **reflux**를 적용한 앱에서 어떠한 흐름으로 진행되는지 아래에 정리하였다.

* Content에 적용할 데이터를 위해 End point의 **JSON** 오브젝트를 **Store**에 적재
* Content에 적용할 데이터가 **Store**로 업데이트 되는 것을 **Component**가 감지
* **Component**는 **trigger**된 **Action**인 `updateStatus`를 통하여 업데이트 된 내용을 적용할 것인가 말 것인가에 대해 검증된 정보를 **store**에 남김
* **Component**는 **trigger**된 **Action**인 `submitReview`를 통하여 **store**에게 API에 대한 검증 정보를 제출하고, 다음 검증을 적재

예시
-----
#### Action 
```javascript
var Reflux = require('reflux');

var ContentReviewerActions = Reflux.createActions({  
 // Child actions 'completed' 와 'failed' 는 listenAndPromise 결과 이후 요청 위한 정의
 "loadReview": { children: ['completed', 'failed'] },
 "updateStatus": {},
 "submitReview": {}
});

// Reflux의 action에서 서버 호출에 대한 콘텐츠 데이터 정보 적재를 위해 검증을 트리거 셋팅 가능
ContentReviewerActions.loadReview.listenAndPromise( function() {  
 return $.ajax({
   type: "GET",
   url: Routes.content_reviews_path({ format: 'json' })
 });
});

module.exports = ContentReviewerActions;  
```

Store
----
```javascript
var Reflux = require('reflux');  
var ContentReviewerActions = require('../actions/content_reviewer_actions');

var ContentReviewerStore = Reflux.createStore({
 // 모든 콘텐츠 데이터 검증 action의 listening을 짧게 정의
 listenables: ContentReviewerActions,

 data: {},

 // store 초기화 시 적재할 검증 정의
 init: function() {
   ContentReviewerActions.loadReview();
 },

 // Clear out the current review and any errors while we load the next review
 // 다음 검토를 위해 기존 적재된 검증 데이터와 오류 데이터를 삭제
 onLoadReview: function() {
   this.data.review = null;
   this.data.loadError = null;

   this.trigger(this.data);
 },

 // ContentReviewerActions.loadReview.listenAndPromise 에서 호출
 onLoadReviewCompleted: function(res) {
   this.data.review = res.review;
   this.data.loadError = res.error;

   this.trigger(this.data);
 },

 // ContentReviewerActions.loadReview.listenAndPromise 에서 호출
 onLoadReviewFailed: function() {
   this.data.loadError = "Could not load review.";

   this.trigger(this.data);
 },

 // Update 상태, Component에게 다시 Update된 상태를 전달
 onUpdateStatus: function(status) {
   this.data.review.status = status;

   this.trigger(this.data);
 },

 // 다음 검증 정보를 적재할 동안 기존 검증 데이터를 제출
 onSubmitReview: function() {
   this.submitReview();
   ContentReviewerActions.loadReview();
 },

 // store 데이터를 서버로 작업 요청 시, action 대신 store에서 통신 처리를 손쉽게 작성 가능
 submitReview: function() {
   $.ajax({
     type: "PUT",
     url: Routes.review_path(this.data.review.review_id, { operation: this.data.review.status })
   }).done(function(res) {
     // Success notification
   }).fail(function(xhr) {
     // Error notification
   });
 }
});

module.exports = ContentReviewerStore; 
```

Component
-----
```javascript
var React = require('react');  
var Reflux = require('reflux');  
var ContentReviewerStore = require('../../stores/content_reviewer_store');  
var ContentReviewerActions = require('../../actions/content_reviewer_actions');

var ContentReviewer = React.createClass({
 // this.state를 component와 연결된 sotre 내 this.data를 연결
 mixins: [ Reflux.connect(ContentReviewerStore, "review") ],

 render: function () {
  // state 상태로 compoenet 구성을 변경 가능
  if (this.state.review) {
   return (
    <div>
     <h1>{ this.state.review.review_id }</h1>
     <button onClick={ this._markApproved }>Approve</button>
     <button onClick={ this._markRejected }>Reject</button>
     <button onClick={ this._submitReview }>Submit</button>
    </div>
   )
  } else if (this.state.loadError) {
   return (
    <h1 className="alert">{ this.state.loadError }</h1>
   )
  } else {
   return (
    <span>"Loading"</span>
   )
  }
 },

 _markApproved: function() {
  ContentReviewerActions.updateStatus("approved");
 },

 _markRejected: function() {
  ContentReviewerActions.updateStatus("rejected");
 },

 _submitReview: function() {
  ContentReviewerActions.submitReview();
 }
});

module.exports = ContentReviewer;
```

참고
-----
* [Deconstructing ReactJS's Flux](http://spoike.ghost.io/deconstructing-reactjss-flux/)
* [React and Reflux in 5 minutes](http://blog.mojotech.com/react-and-reflux-in-5-minutes/)