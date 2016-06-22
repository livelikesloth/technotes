'use strict';
    $.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    
    

    var mainCtrl = (function(){
    	var cnt = 1;
    	function log(str, obj){
    		//console.log('DEV ::: '+cnt+' ['+str+'] ',obj);
    		cnt++;
    	}
    	
    	//$('#appView').html(apiData.getApiSectionById('note'));
    	
    	return {
    		data:{
    			gridId:''
    		},
    		init:function(){
    			//초기화
    			$('#appView').html(apiData.getApiMenuBtns());
    			$('#api-list').html(apiData.getApiMenus());
    			$('#grid-list').html(gridData.getGridMenus());
    			this.eventHandler();
    		},
    		reset: function(apiId){
    			this.review(apiId);
    			this.eventHandler();
    		},
    		review: function(apiId){
    			$('#appView').html(apiData.getApiSectionById(apiId));
    			/*[START] 세로 사이즈 자동 조정*/
    	    	$('.api-section').each(function(index,obj){
    	    		log('section obj',obj);
    	    		var req = $(obj).find('.req-section').find('.panel-body');
    	    		var res = $(obj).find('.res-section').find('.panel-body');
    	    		if(req.height() > 500){
    	    			res.height(req.height());
    	    		}else{
    	    			res.height(500);
    	    		}
    	    		log('req.height',req.height());
    	    		log('res.height',res.height());
    	    	});
    	    	/*[ END ] 세로 사이즈 자동 조정*/
    		},
    		resetGrid: function(gridId){
    			this.reviewGrid(gridId);
    			this.eventHandler();
    			
    			this.data.gridId = gridId;
    		},
    		reviewGrid: function(gridId){
    			$('#appView').html(gridData.getGridSectionById(gridId));
    			
    		},
    		resetFoldBtn:function(){
    			//Fold 버튼 모두 삭제
    			$('.btn-fold').removeClass('fa-angle-down');
    			$('.btn-fold').removeClass('fa-angle-up');
    			
    			var btns = $('.btn-fold');
    			$.each(btns,function(idx, obj){
    				var parent = $(obj).parent();
    				var foldStts = parent.attr('fold');
    				
    				if(foldStts == "true"){
    					$(obj).addClass('fa-angle-up');
    					parent.parent().find('.panel-body').show();
    				}else{
    					$(obj).addClass('fa-angle-down');
    					parent.parent().find('.panel-body').hide();
    				}
    			});
    		},
    		eventHandler: function(){
    			//HTML DOM에 관련한 이벤트들을 처리한다.
    			$('.wsq-btn').off('click');
    	    	$('.wsq-btn').on('click',function(e){
    	    		log('EVENT CLICK TARGET',e.target);
    	    		/*[START]Validation*/
    	    		var form = $(e.target).parent();
    	    		var validationFlag = true;
    	    		$.each(form.find('input'),function(index, obj){
    	    			var required = $(obj).prop('required');
    	    			var objVal = $(obj).val();
    	    			var objName = $(obj).attr('name');
    	    			
    	    			if(required == true && objVal == ''){
    	    				$.toaster(objName+' 입력해야 합니다.','Validation 실패','danger');
    	    				validationFlag = false;
    	    			}
    	    		});
    	    		
    	    		if(!validationFlag)return;
    	    		
    	    		/*[END]Validation*/
    	    		
    	    		var reqObj = {data:$(e.target).parent().serializeObject()};
    	    		var url = $(e.target).parent().attr('url');
    	    		log('FROM',reqObj);
    	    		log('FORM - enctype',form.attr('enctype'));
    	    		if(form.attr('enctype') == 'multipart/form-data'){
    	    			form.attr('target','fileUpCallback');
    	    			form.submit();
    	    		}else{
    	    			postComm_impl(url,reqObj,function(data){
    	    				log($(e.target).parent().attr('url')+' RESULT',data);
    	    				var jsonViewer = $(e.target).parent().parent().parent().parent().parent().find('.json-viewer');
    	    				var status = new PrettyJSON.view.Node({ 
    	    	                el:jsonViewer,
    	    	                data: data,
    	    	                dateFormat:"DD/MM/YYYY - HH24:MI:SS"
    	    	            });
    	    			});
    	    		}
    	    	});
    	    	
    	    	$('.wsq-grid-btn').off('click');
    	    	$('.wsq-grid-btn').on('click',function(e){
    	    		log('EVENT CLICK TARGET',e.target);
    	    		/*[START]Validation*/
    	    		var form = $(e.target).parent().parent();
    	    		var validationFlag = true;
    	    		$.each(form.find('input'),function(index, obj){
    	    			var required = $(obj).prop('required');
    	    			var objVal = $(obj).val();
    	    			var objName = $(obj).attr('name');
    	    			
    	    			if(required == true && objVal == ''){
    	    				$.toaster(objName+' 입력해야 합니다.','Validation 실패','danger');
    	    				validationFlag = false;
    	    			}
    	    		});
    	    		
    	    		if(!validationFlag)return;
    	    		
    	    		/*[END]Validation*/
    	    		
    	    		var reqObj = {data:$(e.target).parent().parent().serializeObject()};
    	    		var url = $(e.target).parent().parent().attr('url');
    	    		log('FROM',reqObj);
    	    		log('FORM - enctype',form.attr('enctype'));
    	    		if(form.attr('enctype') == 'multipart/form-data'){
    	    			form.attr('target','fileUpCallback');
    	    			form.submit();
    	    		}else{
    	    			postComm_impl(url,reqObj,function(data){
    	    				log('postComm_impl',data);
    	    				//reviewGrid로 만들어진 View에 값이 주입
    	        			$('#grid-section').html(gridData.getGridPrepareSectionById(mainCtrl.data.gridId));
    	    				log('>>>>',gridData.getGridPrepareSectionById(mainCtrl.data.gridId));
    	        			//numeric 가공
    	        			gridData.setGridNumericColumn(mainCtrl.data.gridId,data.data);
    	        			//Simple Time 가공
    	        			gridData.setGridDataConvert(mainCtrl.data.gridId,data.data);
    	        			//grid 용 ID 셋팅
    	        			var indexer = 0;
    	        			$.each(data.data,function(idx,obj){
    	        				obj.id = indexer++;
    	        			});
    	        			
    	        			$('#grid-view').bootgrid("append",data.data);
    	        			
    	        			$('#grid-view').bootgrid().off('click.rs.jquery.bootgrid');
    	        	    	$('#grid-view').bootgrid().on('click.rs.jquery.bootgrid',function(e, cols, row){
    	        	    		 //console.log('bootgrid Click',row.fileStreamPath);
    	        	    		if(row.fileStreamPath){ //첨부파일 경로가 있는 경우
    	        	    			$('#fakeLoginView').attr('src', row.fileStreamPath);
    	        	    		}
    	        	    	});
    	    			});
    	    		}
    	    	});
    	    	
    	    	$('.login-btn').off('click');
    	    	$('.login-btn').on('click',function(e){
    	    		log('EVENT CLICK TARGET',e.target);
    	    		
    	    		jQuery.get('/websquare/websquare.jsp',function(data){
    	    			log('PAGE LOADED FOR LOGIN','OK');
    	    		});
    	    	});
    	    	
    	    	$('.api-menu').off('click');
    	    	$('.api-menu').on('click',function(e){
    	    		//log('EVENT CLICK TARGET',e.target);
    	    		var dataTarget = $(e.target).attr('data-target');
    	    		log('API - DATA TARGET',dataTarget);
    	    		mainCtrl.reset(dataTarget);
    	    	});
    	    	
    	    	$('.grid-menu').off('click');
    	    	$('.grid-menu').on('click',function(e){
    	    		//log('EVENT CLICK TARGET',e.target);
    	    		var dataTarget = $(e.target).attr('data-target');
    	    		log('GRID - DATA TARGET',dataTarget);
    	    		mainCtrl.resetGrid(dataTarget);
    	    	});
    	    	
    	    	$('.panel-heading').off('click');
    	    	$('.panel-heading').on('click',function(e){
    	    		var target = $(e.currentTarget);
    	    		var btn = target.find('.btn-fold');
    	    		var panel = target.parent().find('.panel-body');
    	    		
    	    		btn.removeClass('fa-angle-down');
    	    		btn.removeClass('fa-angle-up');
    	    		
    				var foldStts = target.attr('fold');
    				
    				if(foldStts == "true"){
    					target.attr('fold',"false");
    					btn.addClass('fa-angle-down');
    					panel.hide();
    				}else{
    					target.attr('fold',"true");
    					btn.addClass('fa-angle-up');
    					panel.show();
    				}
    	    	});
    	    	
    	    	$('.fake-login').off('click');
    	    	$('.fake-login').on('click',function(e){
    	    		$('#fakeLoginView').attr('src', '/websquare/devTest.jsp?mainScreenId=BARCDD01W&screenId=BARCDD01W&userId=dev_non'); 
    	    	});    	    	
    		}
    	};
    })();
    
    mainCtrl.init();
    
    function callbacks(){
    	$.toaster('서버 통신을 완료하였습니다.','성공');
    }
    
    function postComm_impl(url,reqObj, next){
    	jQuery.ajax({
			type: 'POST',
			url: url,
			data: JSON.stringify(reqObj),
			contentType:'application/json',
			beforeSend: function(xhr) {
				
			},
			success: function(data, textStatus, jqXHR) {
				//websqure에서는 1이 에러를 의미함.
				if(data.result.code == '1'){
					$.toaster(data.result.message,'조회실패 - '+data.data.err,'danger');
				}else{
					$.toaster('서버 통신을 완료하였습니다.','성공');
				}
				
				data.reqObj = reqObj;
				
				if(data.data){
					if(Array.isArray(data.data)){
						data.dataCount = data.data.length;
					}else{
						//배열이 아닐 경우 Object가 하나로 인식
						data.dataCount = 1;
					}
				}
				
				if(typeof next == 'function'){
					next(data);
				}
			},
			error: function(xhr, status, error){
				alert('AJAX ERROR\n\nERROR 001 xhr'+xhr+'\nERROR 002 status'+status+'\nERROR 003 error'+error);
			},
			dataType: 'json'
		});
    }