'use strict';
/**
 * require Libs
 * jquery, bxslider, lightbox
 */
var JgSlider = {};

JgSlider = (function(){
	var firstLoading = true; 
  var sampleDataSet = [
    {targetId:'DEV_SCR_001',link:'../image/manual/DEV_SCR_001/35.jpg', title:'가입자 정보 조회 1', thumb:'../image/manual/DEV_SCR_001/thumb/35.jpg'},
    {targetId:'DEV_SCR_002',link:'../image/manual/DEV_SCR_002/74.jpg', title:'청수미 1', thumb:'../image/manual/DEV_SCR_002/thumb/74.jpg'},
    {targetId:'DEV_SCR_002',link:'../image/manual/DEV_SCR_002/75.jpg', title:'청수미 2', thumb:'../image/manual/DEV_SCR_002/thumb/75.jpg'},
    {targetId:'DEV_SCR_002',link:'../image/manual/DEV_SCR_002/76.jpg', title:'청수미 3', thumb:'../image/manual/DEV_SCR_002/thumb/76.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/37.jpg', title:'QPS 가입 1', thumb:'../image/manual/DEV_SCR_003/thumb/37.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/38.jpg', title:'QPS 가입 2', thumb:'../image/manual/DEV_SCR_003/thumb/38.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/39.jpg', title:'QPS 가입 3', thumb:'../image/manual/DEV_SCR_003/thumb/39.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/40.jpg', title:'QPS 가입 4', thumb:'../image/manual/DEV_SCR_003/thumb/40.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/41.jpg', title:'QPS 가입 5', thumb:'../image/manual/DEV_SCR_003/thumb/41.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/42.jpg', title:'QPS 가입 6', thumb:'../image/manual/DEV_SCR_003/thumb/42.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/43.jpg', title:'QPS 가입 7', thumb:'../image/manual/DEV_SCR_003/thumb/43.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/45.jpg', title:'QPS 가입 8', thumb:'../image/manual/DEV_SCR_003/thumb/45.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/46.jpg', title:'QPS 가입 9', thumb:'../image/manual/DEV_SCR_003/thumb/46.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/47.jpg', title:'QPS 가입 10', thumb:'../image/manual/DEV_SCR_003/thumb/47.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/48.jpg', title:'QPS 가입 11', thumb:'../image/manual/DEV_SCR_003/thumb/48.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/49.jpg', title:'QPS 가입 12', thumb:'../image/manual/DEV_SCR_003/thumb/49.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/50.jpg', title:'QPS 가입 13', thumb:'../image/manual/DEV_SCR_003/thumb/50.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/51.jpg', title:'QPS 가입 14', thumb:'../image/manual/DEV_SCR_003/thumb/51.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/52.jpg', title:'QPS 가입 15', thumb:'../image/manual/DEV_SCR_003/thumb/52.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/53.jpg', title:'QPS 가입 16', thumb:'../image/manual/DEV_SCR_003/thumb/53.jpg'},
    {targetId:'DEV_SCR_003',link:'../image/manual/DEV_SCR_003/54.jpg', title:'QPS 가입 17', thumb:'../image/manual/DEV_SCR_003/thumb/54.jpg'}
  ];
  
  
  
  return {
	init:function(){
		if(firstLoading){
			$('head').append('<link rel="stylesheet" href="/websquare/admin/css/font-awesome.css" type="text/css" />');
			$('head').append('<link rel="stylesheet" href="/websquare/admin/css/lightbox.css" type="text/css" />');
			$('head').append('<link rel="stylesheet" href="/websquare/admin/js/bxslider/jquery.bxslider.css" type="text/css" />');
			$('head').append('<script src="/websquare/admin/js/lightbox.js"></script>');
			$('head').append('<script src="/websquare/admin/js/bxslider/jquery.bxslider.min.js"></script>');
			firstLoading = false;
		}
	},
    settingDiv:function(size, divId, targetId){
      var targetScr = $('#'+divId);
      if(this.isEmpty(size)){
          console.log('ERR :: Check Div.');
          return;
        }
      if(this.isEmpty(divId)){
        console.log('ERR :: Check Div.');
        return;
      }
      if(!targetScr.is('div')){
        console.log('ERR :: Only Div.');
        return;
      }
      if(this.isEmpty(targetId)){
        console.log('ERR :: Check target Id.');
        return;
      }

      //Screen ID 맞춰 메뉴얼 체크
      var imagesById = [];
      $.each(sampleDataSet, function(index, obj){
        if(obj.targetId == targetId){
          imagesById.push(obj);
        }
      });

      if(imagesById.length == 0){
        console.log('ERR :: Check target Id.');
        return;
      }

      var sliderTemp = '<ul class="bxslider">{0}</ul>';
      var objTemp = '<li><a href="{0}" data-lightbox="manual"><img src="{1}" /></a></li>';

      var makedHtml = '';
      var items = [];
      $.each(imagesById, function(index, obj){
        items.push(objTemp.format(obj.link, obj.thumb));
      });

      targetScr.html(sliderTemp.format(items.join('')));

      $('.bxslider').bxSlider({
        minSlides: 3,
        maxSlides: 3,
        slideWidth: size,
        slideMargin: 5,
        pager:false,
        infiniteLoop: false,
        hideControlOnEnd: true
      });


    },
    //기존 img를 a로 감싸서 gallery 형식으로 볼 수 있게 함.
    settingGallery:function(className, galleryName){
    	var targets = $('.'+className);
    	$.each(targets,function(index,obj){
    		var objTemp = '<a href="{0}" data-lightbox="{1}">{2}</a>';
    		var imgSrc = $(obj).attr('src');
    		var imgRawSrc = $(obj).attr('usemap');
    		
    		//console.log('Attr items',imgRawSrc,imgSrc,galleryName);
    		//targets.replaceWith();
    		var makedHtml = $(obj).clone().wrapAll('<div/>').parent().html();
    		console.log('maked items',makedHtml);
    		$(obj).replaceWith(objTemp.format(imgRawSrc,galleryName,makedHtml));
    		
    	});
    },
    settingImgeViewer:function(imgeList,index){
    	lightbox.imgeViewer(imgeList,index);
    },
    isEmpty:function(str){
      if(str==null)return true;
      if(str=='')return true;
      return false;
    }
  }
})();

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
