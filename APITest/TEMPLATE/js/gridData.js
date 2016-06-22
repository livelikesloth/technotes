'use strict';

if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
  }

var grids = 
[
 {
	 id:'userHist',
	 name:'유저 히스토리',
	 query:{
		 url:'/rfapi/utils.wsq',
		 params:[
			{id:'action',val:'retrieveUserHist',placeholder:'',required:true},
			{id:'count',val:'',placeholder:'조회될 히스토리 개수',required:false},
			{id:'userId',val:'',placeholder:'USER ID',required:false},
			{id:'histKdCd',val:'',placeholder:'조회될 히스토리 구분 코드',required:false},
			{id:'histNm',val:'',placeholder:'조회될 히스토리의 명명에 대한 like 검색 단어',required:false},
			{id:'targetId',val:'',placeholder:'히스토리 대상 ID',required:false},
			{id:'targetKdCd',val:'',placeholder:'히스토리 대상 구분 코드',required:false}
		  ]
	 },
	 columns:
		 [
		  {field:'rnum',header:'NUM',type:'numeric',width:'7%'},
		  {field:'userId',header:'ID'},
		  {field:'histKdCd',header:'히스토리 구분 코드',align:'center',headerAlign:'center'},
		  {field:'histNm',header:'히스토리 제목'},
		  {field:'targetId',header:'대상'},
		  {field:'targetKdCd',header:'대상 구분 코드',align:'center',headerAlign:'center'},
		  {field:'createDt',header:'히스토리 일시',order:'desc',visible:false},
		  {field:'st',header:'Time',align:'center',headerAlign:'center'}
	     ],
	 convert:
		 [
		  {from:'createDt',to:'st',type:'simpleTime'}
		 ]
 },
 {
	 id:'logNote',
	 name:'로그 노트',
	 query:{
		 url:'/rfapi/utils.wsq',
		 params:[
			{id:'action',val:'retrieveLogNote',placeholder:'',required:true},
			{id:'key',val:'',placeholder:'key',required:true},
			{id:'data1',val:'',placeholder:'data1',required:false,type:'textarea'},
			{id:'data2',val:'',placeholder:'data2',required:false,type:'textarea'},
			{id:'data3',val:'',placeholder:'data3',required:false,type:'textarea'},
			{id:'data4',val:'',placeholder:'data4',required:false,type:'textarea'},
			{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false,type:'number'},
			{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false,type:'number'}
		  ]
	 },
	 columns:
		 [
		  {field:'rnum',header:'NUM',type:'numeric',width:'7%'},
		  {field:'seq',header:'ID',visible:false},
		  {field:'key',header:'키'},
		  {field:'data1',header:'DATA 1'},
		  {field:'data2',header:'DATA 2',width:'25%'},
		  {field:'data3',header:'DATA 3',visible:false},
		  {field:'data4',header:'DATA 4',visible:false},
		  {field:'createDt',header:'히스토리 일시',order:'desc',visible:false},
		  {field:'st',header:'Time',align:'center',headerAlign:'center'}
	     ],
	 convert:
		 [
		  {from:'createDt',to:'st',type:'simpleTime'}
		 ]
 },
 {
	 id:'rateReport',
	 name:'만족도 리포트',
	 query:{
		 url:'/rfapi/rate.wsq',
		 params:[
			{id:'action',val:'getRateReport',placeholder:'',required:true},
			{id:'sysIds',val:'',placeholder:'시스템 ID 들',required:false},
			{id:'screenIds',val:'',placeholder:'화면 ID 들',required:false},
			{id:'allYn',val:'',placeholder:'전체 조회 여부. 기본 N(만족도 평가된 화면만 조회)',required:false},
			{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false,type:'number'},
			{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false,type:'number'}
		  ]
	 },
	 columns:
		 [
		  {field:'sysId',header:'ID',visible:false},
		  {field:'sysNm',header:'시스템 명'},
		  {field:'screenId',header:'화면 ID'},
		  {field:'screenNm',header:'화면 명'},
		  {field:'avg',header:'평균 만족도'},
		  {field:'totalCunt',header:'만족도 개수'},
		  {field:'data5',header:'5점'},
		  {field:'data4',header:'4점'},
		  {field:'data3',header:'3점'},
		  {field:'data2',header:'2점'},
		  {field:'data1',header:'1점'}
	     ]
 },
 {
	 id:'fileList',
	 name:'첨부파일 리스트',
	 query:{
		 url:'/rfapi/file.wsq',
		 params:[
			{id:'action',val:'retrieveFile',placeholder:'',required:true},
			{id:'hposId',val:'TEMP',placeholder:'',required:true}
		  ]
	 },
	 columns:
		 [
		  {field:'id',header:'ID',visible:false},
		  {field:'fileId',header:'파일 ID',visible:false},
		  {field:'fileName',header:'파일 명'},
		  {field:'filePath',header:'파일 경로',visible:false},
		  {field:'fileKdCd',header:'파일 유형'},
		  {field:'owner',header:'소유자'},
		  {field:'hposId',header:'소속 ID'},
		  {field:'hposKdCd',header:'소속 유형'},
		  {field:'createDt',header:'생성일',order:'desc',visible:false},
		  {field:'fileStreamPath',header:'다운로드 링크',visible:false},
		  {field:'st',header:'Time',align:'center',headerAlign:'center'}
	     ],
	 convert:
		 [
		  {from:'createDt',to:'st',type:'simpleTime'}
		 ]
 }
];

var gridData = (function(){
	var panelTemplate = '<div class="panel panel-default req-section">'
		+'<div class="panel-heading">REQUEST - PARAMS</div>'
		+'<div class="panel-body">'
		+'<form url="{1}" {3}>'
		+'{2}'
		+'<div class="col-md-12"><a type="button" class="btn btn-default wsq-grid-btn">실행</a><div>'
		+'</form>'
		+'</div></div></div>'
		+'<div id="grid-section" class="col-md-12" style="margin-top:20px;">[GRID SECTION] DATA 조회 대기 중...</div>';
	
	var inputTempate = '<div class="form-group col-md-6">'
		+'<label for="{0}">{5}</label>'
		+'<input type="{6}" class="form-control" id="{0}" name="{1}" value="{2}" placeholder="{3}" {4}></input>'
		+'</div>';
	
	var textareaTemplate = '<div class="form-group col-md-6">'
		+'<label for="{0}">{5}</label>'
		+'<textarea type="{6}" class="form-control" id="{0}" name="{1}" value="{2}" placeholder="{3}" {4}></textarea>'
		+'</div>';
	
	var menuTemplate = '<li><a class="grid-menu" data-target="{0}">{1}</a></li>';
	var menuBtnTemplate = '<a type="button" class="btn btn-default grid-menu" data-target="{0}">{1}</a>';
	
	var tableTemplate = '<table id="grid-view" class="table table-condensed table-hover table-striped">'
		+'<thead><tr>{0}</tr></thead><tbody></tbody></table>';
	var tableHeadTemplate = '<th data-column-id="{0}" {1}>{2}</th>';
	
	
	return {
		getPanelTemplate:function(){
			return panelTemplate;
		},
		getInputTemplate:function(){
			return inputTempate;
		},
		getModelById:function(griId){
			var resObj = null;
			$.each(grids,function(index, obj){
				if(obj.id == griId){
					resObj = obj;
					return;
				}
			});
			return resObj;
		},
		getGridSectionById:function(griId){
			var gridObj = this.getModelById(griId);
			var paramSet = [];
			var panelSet = [];
			var paramCunt = 0;
			
			var htmlObj = '';
			
			
			paramSet = [];
			var targetObj = gridObj.query;
			var cuntParams = targetObj.params.length;
			var encType='';
			for(var j=0;j<cuntParams;j++){
				var typeChker = 'text';
				if(typeof targetObj.params[j].type != 'undefinded'){
					if(targetObj.params[j].type == 'file'){
						typeChker = 'file';
						encType = 'enctype="multipart/form-data" action="'+targetObj.url+'" method="POST"';
					}
					
					if(targetObj.params[j].type == 'number')typeChker='number';
					if(targetObj.params[j].type == 'textarea')typeChker='textarea';
				}
				var sectionTemplate = '';
				if(typeChker == 'textarea'){
					sectionTemplate = textareaTemplate;
				}else{
					sectionTemplate = inputTempate;
				}
				var str_temp = sectionTemplate.format(targetObj.params[j].id+'_'+paramCunt
						,targetObj.params[j].id
						,targetObj.params[j].val,targetObj.params[j].placeholder
						,targetObj.params[j].required?'required':''
						,targetObj.params[j].id+(targetObj.params[j].required?'(<span style="color:red">required</span>)':'')
						,typeChker);
				paramSet.push(str_temp);
			}
			
			panelSet.push(panelTemplate.format(gridObj.name
					,targetObj.url
					,paramSet.join('')
					,encType));
		
			
			return panelSet.join('');
		},
		getGridPrepareSectionById:function(gridId){
			var gridObj = this.getModelById(gridId);
			var columns = [];
			var thSet = [];
			var columnsCount = 0;
			var order = '';
			
			var htmlObj = '';
			columns = gridObj.columns;
			columnsCount = columns.length;
			
			
			for(var i=0;i<columnsCount;i++){
				order = '';
				if(columns[i].order != null){
					order = order + 'data-order="{0}" '.format(columns[i].order);
				}
				if(columns[i].type != null){
					order = order + 'data-type="{0}" '.format(columns[i].type);
				}
				if(columns[i].width != null){
					order = order + 'data-width="{0}" '.format(columns[i].width);
				}
				if(columns[i].visible != null){
					order = order + 'data-visible="{0}" '.format(columns[i].visible);
				}
				if(columns[i].align != null){
					order = order + 'data-align="{0}" '.format(columns[i].align);
				}
				if(columns[i].headerAlign != null){
					order = order + 'data-header-align="{0}" '.format(columns[i].headerAlign);
				}
				thSet.push(tableHeadTemplate.format(columns[i].field,order,columns[i].header));
			}
			
			return tableTemplate.format(thSet.join(''));
		},
		getGridMenus: function(){
			var cuntGrids = grids.length;
			var menuSet = [];
			for(var i=0;i<cuntGrids;i++){
				menuSet.push(menuTemplate.format(grids[i].id,grids[i].name));
			}
			
			return menuSet.join('');
		},
		getGridMenuBtns: function(){
			var cuntGrids = grids.length;
			var menuSet = [];
			for(var i=0;i<cuntGrids;i++){
				menuSet.push(menuBtnTemplate.format(grids[i].id,grids[i].name));
			}
			
			return menuSet.join('');
		},
		setGridNumericColumn: function(gridId, rows){
			$.each(this.getModelById(gridId).columns,function(index,obj){
				if(obj.type != 'numeric')return;
				var id = obj.field;
				$.each(rows,function(index2,obj2){
					obj2[id] = parseInt(obj2[id]);
				});
			});
		},
		setGridDataConvert: function(gridId, data){
			if(this.isEmpty(data))return;
			if(data.constructor != Array)return;
			var convertRules =  this.getModelById(gridId).convert;
			if(this.isEmpty(convertRules))return;
			if(convertRules.constructor != Array)return;
			
			$.each(data,function(idx1,obj1){
				$.each(convertRules,function(idx2,obj2){
					var from = obj2.from;
					var to = obj2.to;
					var type = obj2.type;
					
					if(type == 'simpleTime'){
						obj1[to] = moment(obj1[from]).fromNow();
					}
				});
			});
		},
	    isEmpty:function(str){
	    	if(typeof str == undefined)return true;
	        if(str==null)return true;
	        if(str=='')return true;
	        return false;
	    }
	};
})();