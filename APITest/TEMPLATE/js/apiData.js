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

var apis = 
	[
        {
        	id:'note',
        	name:'공지사항',
        	sets:[
        	      {
        	    	  name:'가져오기',
        	    	  url:'/rfapi/note.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAllNote',placeholder:'',required:true},
						{id:'screenIds',val:'',placeholder:'화면 ID 들',required:false},
						{id:'screenGrpId',val:'',placeholder:'검색 시, 조건 검색으로 사용될 화면 그룹 ID, screenIds와 같이 있을 경우 같이 적용',required:false},
						{id:'noteId',val:'',placeholder:'공지 사항 단건 조회를 위한 노트 ID',required:false},
						{id:'noteKdCd',val:'',placeholder:'NT1:개선요청, NT2:배포문의, NT3:공지사항',required:false},
						{id:'noteTitle',val:'',placeholder:'like 검색 용 공지 제목',required:false},
						{id:'noteDetl',val:'',placeholder:'like 검색 용 공지 내용',required:false},
						{id:'noteLvl',val:'',placeholder:'검색 시, 조건 검색으로 사용될 노트 레벨. 1은 긴급 공지, 2는 일반 공지',required:false},
						{id:'useYn',val:'',placeholder:'공지 사용 여부',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'추가하기',
        	    	  url:'/rfapi/note.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'insertNote',placeholder:'',required:true},
						{id:'noteTitle',val:'',placeholder:'Note 제목',required:true},
						{id:'noteKdCd',val:'',placeholder:'Note 유형',required:true},
						{id:'noteLvl',val:'',placeholder:'노트 레벨',required:false},
						{id:'screenId',val:'',placeholder:'Note 배치되는 화면. #을 넣을 경우, 모든 화면에서 출력되는 공지로 인식',required:false},
						{id:'screenGrpId',val:'',placeholder:'screenId와 screeGrpId는 둘 중 하나는 무조건 들어와야 함. 그룹 공지를 위해 사용되며, 우선 적용된다.',required:false},
						{id:'noteDetl',val:'',placeholder:'Note 내용',required:true,type:'textarea'},
						{id:'noteDetlHTML',val:'',placeholder:'Note HTML 내용',required:true,type:'textarea'},
						{id:'useYn',val:'',placeholder:'Note 사용 여부',required:true},
						{id:'fileIds',val:'',placeholder:'공지사항에 추가할 첨부파일 셋. " "를 기준으로 여러개가 들어감, 입력된 첨부파일은 게시글이 아닌 메인글(cntntId)로 소속된다.',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'수정하기',
        	    	  url:'/rfapi/note.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'updateNote',placeholder:'',required:true},
						{id:'noteId',val:'',placeholder:'Note ID',required:true},
						{id:'screenId',val:'',placeholder:'화면 ID',required:false},
						{id:'screenGrpId',val:'',placeholder:'그룹 공지를 위해 사용되며, 우선 적용된다.',required:false},
						{id:'noteTitle',val:'',placeholder:'Note 제목',required:false},
						{id:'noteLvl',val:'',placeholder:'노트 레벨',required:false},
						{id:'noteDetl',val:'',placeholder:'Note 내용',required:false,type:'textarea'},
						{id:'noteDetlHTML',val:'',placeholder:'Note HTML 내용',required:false,type:'textarea'},
						{id:'useYn',val:'',placeholder:'Note 사용 여부',required:false},
						{id:'fileIds',val:'',placeholder:'공지사항에 추가할 첨부파일 셋. " "를 기준으로 여러개가 들어감, 입력된 첨부파일은 게시글이 아닌 메인글(cntntId)로 소속된다.',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'삭제하기',
        	    	  url:'/rfapi/note.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'deleteNote',placeholder:'',required:true},
						{id:'noteId',val:'',placeholder:'Note ID',required:true}
        	    	  ]
        	      }
        	]
        },
        {
        	id:'aticle',
        	name:'게시글',
        	sets:[
					{
						  name:'가져오기 - 단건',
						  url:'/rfapi/atcl.wsq',
						  //method:'',
						  params:[
							{id:'action',val:'getAtcl',placeholder:'',required:true},
							{id:'atclId',val:'',placeholder:'게시글ID',required:true}
						  ]
					},
        	      {
        	    	  name:'가져오기 - 화면 기반',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAtclByScreen',placeholder:'',required:true},
						{id:'screenIds',val:'UCTFM001 BARCDD01W',placeholder:'화면 ID들. " " 를 구분자로 하여 여러개를 입력해야 함',required:true},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'receiptStts',val:'',placeholder:'접수 상태. Y는 접수가 되어있는 상태, N은 접수가 되지 않는 상태의 게시글 조회',required:false},
						{id:'cntntStts',val:'',placeholder:'답변글 있는 여부. Y는 답변글 달린 상태 만, N은 답변글이 달리지 않는 상태 만 게시글 조회',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'search_screenId',val:'',placeholder:'화면 ID',required:false},
						{id:'search_flag',val:'',placeholder:'ALL - 전체 검색(시스템), CATGS - 현재 범위 검색',required:false},
						{id:'search_rangeFlag',val:'',placeholder:'COMMON - 일반 검색, DETL - 상세 검색',required:false},
						{id:'search_detlOwner',val:'',placeholder:'상세 검색 시, 작성자의 ID 혹인 이름을 Like 검색으로 사용할 단어',required:false},
						{id:'search_detlWord',val:'',placeholder:'상세 검색 시, 본문을 Like 검색으로 사용할 단어',required:false},
						{id:'search_deltStartDate',val:'',placeholder:'상세 검색 시, 검색 시작 일시(YYYY-MM-DD)',required:false},
						{id:'search_deltEndDate',val:'',placeholder:'상세 검색 시, 검색 종료 일시(YYYY-MM-DD)',required:false},
						{id:'workKdCds',val:'',placeholder:'WKC_COM - 기업, WKC_HOM - 홈, WKC_MOB - 모바일',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'가져오기 - 특정 사용자 기준',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAtclByOwner',placeholder:'',required:true},
						{id:'catgIds',val:'DEV_CATG_001 DEV_CATG_002 DEV_CATG_003',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'waitYn',val:'',placeholder:'Y로 값을 넣을 경우 답변 채택 대기 중인 것만 조회',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 0부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함. ',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
						{id:'search_screenId',val:'',placeholder:'화면 ID',required:false},
						{id:'search_flag',val:'',placeholder:'ALL - 전체 검색(시스템), CATGS - 현재 범위 검색',required:false},
						{id:'search_rangeFlag',val:'',placeholder:'COMMON - 일반 검색, DETL - 상세 검색',required:false},
						{id:'search_detlOwner',val:'',placeholder:'상세 검색 시, 작성자의 ID 혹인 이름을 Like 검색으로 사용할 단어',required:false},
						{id:'search_detlWord',val:'',placeholder:'상세 검색 시, 본문을 Like 검색으로 사용할 단어',required:false},
						{id:'search_deltStartDate',val:'',placeholder:'상세 검색 시, 검색 시작 일시(YYYY-MM-DD)',required:false},
						{id:'search_deltEndDate',val:'',placeholder:'상세 검색 시, 검색 종료 일시(YYYY-MM-DD)',required:false},
						{id:'workKdCds',val:'',placeholder:'WKC_COM - 기업, WKC_HOM - 홈, WKC_MOB - 모바일',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'입력하기',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'insertAtcl',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'화면 ID',required:true},
						{id:'catgIds',val:'',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'linkScreens',val:'',placeholder:'연결되는 화면 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'cntntDevice',val:'DT1',placeholder:'메인 글 작성 위치 (DT1:PC 페이지, DT2:모바일 페이지, DT3:헬프 데스크 작성)',required:true},
						{id:'accessGrpIds',val:'GRP_01_001 GRP_01_002 GRP_01_003 GRP_02_001 GRP_02_002',placeholder:'조회 권한을 부여할 그룹 ID 리스트, " " 를 구분자로 하여 여러개를 입력해야 함.',required:true},
						{id:'workKdCds',val:'WKC_COM WKC_HOM WKC_MOB',placeholder:'업무 구분 ID 리스트, " " 를 구분자로 하여 여러개를 입력해야 함. WKC_COM - 기업, WKC_HOM - 홈, WKC_MOB - 모바일',required:false},
						{id:'atclGrp',val:'GR1',placeholder:'게시글 그룹 (GR1 : 개인이 올린 글, GR2 : 헬프 데스크에서 올린 글, GR3 : 업무 담당자 or 화면 관리자, GR4 : 관리자)',required:true},
						{id:'atclKdCd',val:'QA1',placeholder:'게시글 타입 (QA1 : 질문글, QA2 : 정보글)',required:true},
						{id:'title',val:'',placeholder:'게시글 제목',required:false},
						{id:'detl',val:'',placeholder:'게시글 메인 글',required:true,type:'textarea'},
						{id:'detlHTML',val:'',placeholder:'게시글 메인 글 HTML',required:false,type:'textarea'},
						{id:'detlKdCd',val:'TT1',placeholder:'게시글 메인 글의 입력 형식 (TT1:일반글, TT2:HTML태그를 사용한 글)',required:true},
						{id:'selectedNoticeYn',val:'N',placeholder:'공지사항 선택 여부 (N : 공지사항 선택 전, Y : 공지사항 선택 후)',required:true},
						{id:'selectedSecretYn',val:'N',placeholder:'비밀글 여부',required:true},
						{id:'imgeIds',val:'',placeholder:'게시글에 추가할 이미지 셋. " "를 기준으로 여러개가 들어감, 입력된 첨부파일은 게시글이 아닌 메인글(cntntId)로 소속된다.',required:false},
						{id:'fileIds',val:'',placeholder:'게시글에 추가할 첨부파일 셋. " "를 기준으로 여러개가 들어감, 입력된 첨부파일은 게시글이 아닌 메인글(cntntId)로 소속된다.',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'수정하기',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'updateAtcl',placeholder:'',required:true},
						{id:'atclId',val:'',placeholder:'게시글 ID',required:true},
						{id:'screenId',val:'',placeholder:'화면 ID',required:true},
						{id:'catgIds',val:'',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'linkScreens',val:'',placeholder:'연결되는 화면 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'cntntDevice',val:'',placeholder:'메인 글 작성 위치 (DT1:PC 페이지, DT2:모바일 페이지, DT3:헬프 데스크 작성)',required:true},
						{id:'accessGrpIds',val:'',placeholder:'조회 권한을 부여할 그룹 ID 리스트, " " 를 구분자로 하여 여러개를 입력해야 함.',required:true},
						{id:'workKdCds',val:'',placeholder:'업무 구분 ID 리스트, " " 를 구분자로 하여 여러개를 입력해야 함. WKC_COM - 기업, WKC_HOM - 홈, WKC_MOB - 모바일',required:false},
						{id:'atclGrp',val:'',placeholder:'게시글 그룹 (GR1 : 개인이 올린 글, GR2 : 헬프 데스크에서 올린 글, GR3 : 업무 담당자 or 화면 관리자, GR4 : 관리자)',required:false},
						{id:'atclKdCd',val:'',placeholder:'게시글 타입 (QA1 : 질문글, QA2 : 정보글)',required:false},
						{id:'title',val:'',placeholder:'게시글 제목',required:false},
						{id:'detl',val:'',placeholder:'게시글 메인 글',required:true,type:'textarea'},
						{id:'detlHTML',val:'',placeholder:'게시글 메인 글 HTML',required:false,type:'textarea'},
						{id:'detlKdCd',val:'',placeholder:'게시글 메인 글의 입력 형식 (TT1:일반글, TT2:HTML태그를 사용한 글)',required:true},
						{id:'selectedNoticeYn',val:'',placeholder:'공지사항 선택 여부 (N : 공지사항 선택 전, Y : 공지사항 선택 후)',required:false},
						{id:'selectedSecretYn',val:'',placeholder:'비밀글 여부',required:false},
						{id:'imgeIds',val:'',placeholder:'게시글에 추가할 이미지 셋. " "를 기준으로 여러개가 들어감, 입력된 첨부파일은 게시글이 아닌 메인글(cntntId)로 소속된다.',required:false},
						{id:'fileIds',val:'',placeholder:'게시글에 추가할 첨부파일 셋. " "를 기준으로 여러개가 들어감, 입력된 첨부파일은 게시글이 아닌 메인글(cntntId)로 소속된다.',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'가져오기 - 카테고리 기반',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAtclByCatg',placeholder:'',required:true},
						{id:'catgIds',val:'8a40cfdb-9f84-4eb2-b653-2851c0e40669',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'receiptStts',val:'',placeholder:'접수 상태. Y는 접수가 되어있는 상태, N은 접수가 되지 않는 상태의 게시글 조회',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'search_screenId',val:'',placeholder:'화면 ID',required:false},
						{id:'search_flag',val:'',placeholder:'ALL - 전체 검색(시스템), CATGS - 현재 범위 검색',required:false},
						{id:'search_rangeFlag',val:'',placeholder:'COMMON - 일반 검색, DETL - 상세 검색',required:false},
						{id:'search_detlOwner',val:'',placeholder:'상세 검색 시, 작성자의 ID 혹인 이름을 Like 검색으로 사용할 단어',required:false},
						{id:'search_detlWord',val:'',placeholder:'상세 검색 시, 본문을 Like 검색으로 사용할 단어',required:false},
						{id:'search_deltStartDate',val:'',placeholder:'상세 검색 시, 검색 시작 일시(YYYY-MM-DD)',required:false},
						{id:'search_deltEndDate',val:'',placeholder:'상세 검색 시, 검색 종료 일시(YYYY-MM-DD)',required:false},
						{id:'workKdCds',val:'',placeholder:'WKC_COM - 기업, WKC_HOM - 홈, WKC_MOB - 모바일',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'가져오기 - 카테고리 기반 [답변글이 없는 경우]',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAtclByCatgToWait',placeholder:'',required:true},
						{id:'catgIds',val:'8a40cfdb-9f84-4eb2-b653-2851c0e40669',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'receiptStts',val:'',placeholder:'접수 상태. Y는 접수가 되어있는 상태, N은 접수가 되지 않는 상태의 게시글 조회',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함. ',required:false},
						{id:'workKdCds',val:'',placeholder:'WKC_COM - 기업, WKC_HOM - 홈, WKC_MOB - 모바일',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'가져오기 - 카테고리 기반 [답변글이 있는 경우]',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAtclByCatgToUsed',placeholder:'',required:true},
						{id:'catgIds',val:'8a40cfdb-9f84-4eb2-b653-2851c0e40669',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'receiptStts',val:'',placeholder:'접수 상태. Y는 접수가 되어있는 상태, N은 접수가 되지 않는 상태의 게시글 조회',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함. ',required:false},
						{id:'workKdCds',val:'',placeholder:'WKC_COM - 기업, WKC_HOM - 홈, WKC_MOB - 모바일',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'가져오기 - 사용자가 스크랩한 게시글',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAtclByUserScrap',placeholder:'',required:true},
						{id:'catgIds',val:'',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'search_flag',val:'',placeholder:'ALL - 전체 검색(시스템), CATGS - 현재 범위 검색',required:false},
						{id:'search_rangeFlag',val:'',placeholder:'COMMON - 일반 검색, DETL - 상세 검색',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 및 사용자를 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
				        {id:'search_detlOwner',val:'',placeholder:'상세 검색 시, 작성자의 ID 혹인 이름을 Like 검색으로 사용할 단어',required:false},
						{id:'search_detlWord',val:'',placeholder:'상세 검색 시, 본문을 Like 검색으로 사용할 단어',required:false},
						{id:'search_deltStartDate',val:'',placeholder:'상세 검색 시, 검색 시작 일시(YYYY-MM-DD)',required:false},
						{id:'search_deltEndDate',val:'',placeholder:'상세 검색 시, 검색 종료 일시(YYYY-MM-DD)',required:false}
        	    	  ]
        	      },
        	      {
					  name:'재 개시 하기',
					  url:'/rfapi/atcl.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'republishAtcl',placeholder:'',required:true},
						{id:'atclId',val:'',placeholder:'게시글ID',required:true}
					  ]
        	      },
        	      {
					  name:'접수 하기',
					  url:'/rfapi/atcl.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'receiptAtcl',placeholder:'',required:true},
						{id:'atclId',val:'',placeholder:'게시글ID',required:true},
						{id:'selectYn',val:'',placeholder:'글 접수 여부 (Y:접수, N:비접수)',required:true}
					  ]
        	      },
        	      {
					  name:'이관 하기',
					  url:'/rfapi/atcl.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'moveAtcl',placeholder:'',required:true},
						{id:'atclId',val:'',placeholder:'게시글ID',required:true},
						{id:'screenId',val:'',placeholder:'이관 대상이 되는 화면ID',required:true}
					  ]
        	      },
        	      {
					  name:'내부공유 하기',
					  url:'/rfapi/atcl.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'symbolicLinkAtcl',placeholder:'',required:true},
						{id:'atclId',val:'',placeholder:'게시글ID',required:true},
						{id:'userIds',val:'',placeholder:'공유 대상 사용자ID들. " " 를 구분자로 하여 여러개 입력가능.',required:true}
					  ]
        	      },
        	      {
					  name:'내부공유 해제 하기',
					  url:'/rfapi/atcl.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'symbolicUnlinkAtcl',placeholder:'',required:true},
						{id:'atclId',val:'',placeholder:'게시글ID',required:true}
					  ]
        	      },
        	      {
        	    	  name:'가져오기 - 사용자에게 내부공유된 게시글',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAtclBySymbolicLink',placeholder:'',required:true},
						{id:'catgIds',val:'',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'search_flag',val:'',placeholder:'ALL - 전체 검색(시스템), CATGS - 현재 범위 검색',required:false},
						{id:'search_rangeFlag',val:'',placeholder:'COMMON - 일반 검색, DETL - 상세 검색',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 및 사용자를 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
				        {id:'search_detlOwner',val:'',placeholder:'상세 검색 시, 작성자의 ID 혹인 이름을 Like 검색으로 사용할 단어',required:false},
						{id:'search_detlWord',val:'',placeholder:'상세 검색 시, 본문을 Like 검색으로 사용할 단어',required:false},
						{id:'search_deltStartDate',val:'',placeholder:'상세 검색 시, 검색 시작 일시(YYYY-MM-DD)',required:false},
						{id:'search_deltEndDate',val:'',placeholder:'상세 검색 시, 검색 종료 일시(YYYY-MM-DD)',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'가져오기 - 업무 담당자 TO-DO LIST 답변을 기다리는 게시글',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAticlesByTODOWatingAtcl',placeholder:'',required:true},
						{id:'screenIds',val:'',placeholder:'업무 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'catgIds',val:'',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'search_flag',val:'',placeholder:'ALL - 전체 검색(시스템), CATGS - 현재 범위 검색',required:false},
						{id:'search_rangeFlag',val:'',placeholder:'COMMON - 일반 검색, DETL - 상세 검색',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 및 사용자를 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
				        {id:'search_detlOwner',val:'',placeholder:'상세 검색 시, 작성자의 ID 혹인 이름을 Like 검색으로 사용할 단어',required:false},
						{id:'search_detlWord',val:'',placeholder:'상세 검색 시, 본문을 Like 검색으로 사용할 단어',required:false},
						{id:'search_deltStartDate',val:'',placeholder:'상세 검색 시, 검색 시작 일시(YYYY-MM-DD)',required:false},
						{id:'search_deltEndDate',val:'',placeholder:'상세 검색 시, 검색 종료 일시(YYYY-MM-DD)',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'가져오기 - 업무 담당자 TO-DO LIST 접수한 게시글',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAticlesByTODOReceiptAtcl',placeholder:'',required:true},
						{id:'screenIds',val:'',placeholder:'업무 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'catgIds',val:'',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'search_flag',val:'',placeholder:'ALL - 전체 검색(시스템), CATGS - 현재 범위 검색',required:false},
						{id:'search_rangeFlag',val:'',placeholder:'COMMON - 일반 검색, DETL - 상세 검색',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 및 사용자를 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
				        {id:'search_detlOwner',val:'',placeholder:'상세 검색 시, 작성자의 ID 혹인 이름을 Like 검색으로 사용할 단어',required:false},
						{id:'search_detlWord',val:'',placeholder:'상세 검색 시, 본문을 Like 검색으로 사용할 단어',required:false},
						{id:'search_deltStartDate',val:'',placeholder:'상세 검색 시, 검색 시작 일시(YYYY-MM-DD)',required:false},
						{id:'search_deltEndDate',val:'',placeholder:'상세 검색 시, 검색 종료 일시(YYYY-MM-DD)',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'게시글 - 메일 발송',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'sendMailByAtcl',placeholder:'',required:true},
						{id:'atclId',val:'',placeholder:'게시글 ID.',required:false},
						{id:'userIds',val:'',placeholder:'메일 수신자 ID들, " " 를 구분자로 하여 여러개를 입력 가능.',required:false}
	       	    	  ]
        	      },
        	      {
        	    	  name:'게시글 - MMS 발송',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'sendMmsByAtcl',placeholder:'',required:true},
						{id:'atclId',val:'',placeholder:'게시글 ID.',required:false},
						{id:'userIds',val:'',placeholder:'MMS 수신자 ID들, " " 를 구분자로 하여 여러개를 입력 가능.',required:false}
	       	    	  ]
        	      },
				  {
        	    	  name:'게시글 개수 가져오기 - 카테고리 기반',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAtclByCatgCount',placeholder:'',required:true},
						{id:'catgIds',val:'8a40cfdb-9f84-4eb2-b653-2851c0e40669',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'receiptStts',val:'',placeholder:'접수 상태. Y는 접수가 되어있는 상태, N은 접수가 되지 않는 상태의 게시글 조회',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함. ',required:false},
						{id:'workKdCds',val:'',placeholder:'WKC_COM - 기업, WKC_HOM - 홈, WKC_MOB - 모바일',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'게시글 개수 가져오기 - 카테고리 기반 [답변글이 없는 경우]',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAtclByCatgToWaitCount',placeholder:'',required:true},
						{id:'catgIds',val:'8a40cfdb-9f84-4eb2-b653-2851c0e40669',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'receiptStts',val:'',placeholder:'접수 상태. Y는 접수가 되어있는 상태, N은 접수가 되지 않는 상태의 게시글 조회',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함. ',required:false},
						{id:'workKdCds',val:'',placeholder:'WKC_COM - 기업, WKC_HOM - 홈, WKC_MOB - 모바일',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'게시글 개수 가져오기 - 카테고리 기반 [답변글이 있는 경우]',
        	    	  url:'/rfapi/atcl.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAtclByCatgToUsedCount',placeholder:'',required:true},
						{id:'catgIds',val:'8a40cfdb-9f84-4eb2-b653-2851c0e40669',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false},
						{id:'order',val:'',placeholder:'검색 결과 정렬 Type',required:false},
						{id:'receiptStts',val:'',placeholder:'접수 상태. Y는 접수가 되어있는 상태, N은 접수가 되지 않는 상태의 게시글 조회',required:false},
						{id:'search_word',val:'',placeholder:'검색 시, 본문을 Like 검색으로 사용할 단어. 단순 검색에 사용되며, 상세 검색은 다른 API를 참조해야 함.',required:false},
						{id:'queryId',val:'',placeholder:'더보기 기능 대응을 위함.',required:false},
						{id:'actionFlag',val:'',placeholder:'더보기 기능 대응을 위함. ',required:false},
						{id:'workKdCds',val:'',placeholder:'WKC_COM - 기업, WKC_HOM - 홈, WKC_MOB - 모바일',required:false}
        	    	  ]
        	      }
        	]
        },

        {
        	id:'Content',
        	name:'답글',
        	sets:[
        	      	{
					  name:'답글 단건 조회',
					  url:'/rfapi/cntnt.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'getCntnt',placeholder:'',required:true},
						{id:'cntntId',val:'',placeholder:'CONTENT ID',required:true}
					  ]
					},
					{
					  name:'게시글 내 답글 가져오기',
					  url:'/rfapi/cntnt.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'getCntntByAtcl',placeholder:'',required:true},
						{id:'atclId',val:'',placeholder:'Aticle ID',required:true}
					  ]
					},
        	      {
        	    	  name:'입력하기, 특정 게시글',
        	    	  url:'/rfapi/cntnt.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'insertCntnt',placeholder:'',required:true},
						{id:'atclId',val:'',placeholder:'ATICLE ID',required:true},
						{id:'cntntDevice',val:'DT1',placeholder:'글 작성 위치 (DT1:PC 페이지, DT2:모바일 페이지, DT3:헬프 데스크 작성)',required:true},
						{id:'cntntDetl',val:'',placeholder:'글 본문',required:true,type:'textarea'},
						{id:'cntntDetlKdCd',val:'TT1',placeholder:'글의 입력 형식 (TT1:일반글, TT2:HTML태그를 사용한 글)',required:true},
						{id:'cntntDetlHTML',val:'',placeholder:'글 본문 HTML',required:false},
						{id:'cntntGrp',val:'GR1',placeholder:'글 그룹(GR1 : 개인이 올린 글, GR2 : 헬프 데스크에서 올린 글, GR3 : 업무 담당자 or 화면 관리자, GR4 : 관리자)',required:true},
						{id:'imgeIds',val:'',placeholder:'답글에 추가할 이미지 셋. " "를 기준으로 여러개가 들어감, 입력된 첨부파일은 게시글이 아닌 메인글(cntntId)로 소속된다.',required:false},
						{id:'fileIds',val:'',placeholder:'답글에 추가할 첨부파일 셋. " "를 기준으로 여러개가 들어감, 입력된 첨부파일은 게시글이 아닌 메인글(cntntId)로 소속된다.',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'수정하기, 특정 게시글',
        	    	  url:'/rfapi/cntnt.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'updateCntnt',placeholder:'',required:true},
						{id:'cntntId',val:'',placeholder:'CONTENT ID',required:true},
						{id:'cntntDevice',val:'DT1',placeholder:'글 작성 위치 (DT1:PC 페이지, DT2:모바일 페이지, DT3:헬프 데스크 작성)',required:true},
						{id:'cntntDetl',val:'',placeholder:'글 본문',required:true,type:'textarea'},
						{id:'cntntDetlKdCd',val:'TT1',placeholder:'글의 입력 형식 (TT1:일반글, TT2:HTML태그를 사용한 글)',required:true},
						{id:'cntntDetlHTML',val:'',placeholder:'글 본문 HTML',required:false},
						{id:'cntntGrp',val:'GR1',placeholder:'글 그룹(GR1 : 개인이 올린 글, GR2 : 헬프 데스크에서 올린 글, GR3 : 업무 담당자 or 화면 관리자, GR4 : 관리자)',required:false},
						{id:'imgeIds',val:'',placeholder:'답글에 추가할 이미지 셋. " "를 기준으로 여러개가 들어감, 입력된 첨부파일은 게시글이 아닌 메인글(cntntId)로 소속된다.',required:false},
						{id:'fileIds',val:'',placeholder:'답글에 추가할 첨부파일 셋. " "를 기준으로 여러개가 들어감, 입력된 첨부파일은 게시글이 아닌 메인글(cntntId)로 소속된다.',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'삭제하기',
        	    	  url:'/rfapi/cntnt.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'deleteCntnt',placeholder:'',required:true},
						{id:'cntntId',val:'',placeholder:'Content ID',required:true}
        	    	  ]
        	      },
        	      {
        	    	  name:'게시글 스크랩 하기',
        	    	  url:'/rfapi/cntnt.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'scrapCntnt',placeholder:'',required:true},
						{id:'cntntId',val:'',placeholder:'Content ID',required:true},
						{id:'scrapYn',val:'',placeholder:'스크랩 값. Y일 경우 스크랩 지정. Default value: Y',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'좋아요 선택 or 해재 하기',
        	    	  url:'/rfapi/cntnt.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'likeCntnt',placeholder:'',required:true},
						{id:'cntntId',val:'',placeholder:'Content ID',required:true},
						{id:'likeYn',val:'',placeholder:'좋아요 값. Y일 경우 좋아요 선택. Default value: Y',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'싫어요 선택 or 해재 하기',
        	    	  url:'/rfapi/cntnt.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'dislikeCntnt',placeholder:'',required:true},
						{id:'cntntId',val:'',placeholder:'Content ID',required:true},
						{id:'dislikeYn',val:'',placeholder:'싫어요 값. Y일 경우 싫어요 선택. Default value: Y',required:false}
        	    	  ]
        	      }
        	]
        },
        {
        	id:'Reply',
        	name:'댓글',
        	sets:[
        	      {
					  name:'답변글 내 댓글 가져오기',
					  url:'/rfapi/reply.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'getReply',placeholder:'',required:true},
						{id:'cntntId',val:'',placeholder:'Content ID',required:true}
					  ]
        	      },
        	      {
        	    	  name:'게시글 내 메인글 댓글을 Depth별로 가져오기',
        	    	  url:'/rfapi/reply.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getReplyByDepth',placeholder:'',required:true},
						{id:'atclIds',val:'',placeholder:'ATICLE IDs',required:true},
						{id:'depth',val:'',placeholder:'특정 댓글 depth',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'다중 답변글 내 댓글 가져오기',
        	    	  url:'/rfapi/reply.wsq',
        	    	  //method:'',
        	    	  params:[
   	    	            {id:'action',val:'getReplyByContentIds',placeholder:'',required:true},
	    	            {id:'cntntIds',val:'',placeholder:'Content IDs, " " 를 구분자로 하여 여러개를 입력해야 함.',required:true}
    	              ]
        	      },
        	      {
        	    	  name:'삭제하기',
        	    	  url:'/rfapi/reply.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'deleteReply',placeholder:'',required:true},
						{id:'replyId',val:'',placeholder:'Reply ID',required:true}
        	    	  ]
        	      }
        	]
        },
        {
        	id:'File',
        	name:'파일',
        	sets:[
        	      {
        	    	  name:'프로필 사진',
        	    	  url:'/rfapi/imge.sd',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'uploadProfile',placeholder:'',required:true},
						{id:'callback',val:'callbacks',placeholder:'',required:true},
						{id:'file',val:'',placeholder:'화면ID',required:true,type:'file'},
						{id:'mc',val:'',placeholder:'',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'첨부파일 업로드',
        	    	  url:'/rfapi/commFile.sd',
        	    	  //method:'',
        	    	  params:[
        	    	    {id:'action',val:'uploadFile',placeholder:'',required:true},
						{id:'callback',val:'callbacks',placeholder:'',required:true},
						{id:'file',val:'',placeholder:'첨부파일',required:true,type:'file'},
						{id:'hposId',val:'TEMP',placeholder:'',required:false},
						{id:'hposKdCd',val:'FL6',placeholder:'',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'첨부파일 가져오기',
        	    	  url:'/rfapi/file.wsq',
        	    	  //method:'',
        	    	  params:[
        	    	    {id:'action',val:'retrieveFile',placeholder:'',required:true},
						{id:'hposId',val:'TEMP',placeholder:'',required:true}
        	    	  ]
        	      },
        	      {
        	    	  name:'첨부파일 삭제하기',
        	    	  url:'/rfapi/file.wsq',
        	    	  //method:'',
        	    	  params:[
        	    	    {id:'action',val:'deleteFileByFileIds',placeholder:'',required:true},
						{id:'fileIds',val:'',placeholder:'',required:true},
						{id:'fileKdCd',val:'FL6',placeholder:'',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'소속 ID 기반 첨부파일 삭제하기',
        	    	  url:'/rfapi/file.wsq',
        	    	  //method:'',
        	    	  params:[
        	    	    {id:'action',val:'deleteFileByHposId',placeholder:'',required:true},
						{id:'hposId',val:'TEMP',placeholder:'',required:true},
						{id:'fileKdCd',val:'FL6',placeholder:'',required:false}
        	    	  ]
        	      }
        	]
        },
        {
        	id:'User',
        	name:'사용자',
        	sets:[
        	      {
		  	    	  name:'가져오기',
			    	  url:'/rfapi/user.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getUser',placeholder:'',required:true}
			    	  ]
			      },
			      {
		  	    	  name:'전체 유저 정보 가져오기',
			    	  url:'/rfapi/user.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getAllUser',placeholder:'',required:true},
						{id:'userNm',val:'',placeholder:'like 검색으로 사용될 사용자 명',required:false},
						{id:'userId',val:'',placeholder:'like 검색으로 사용될 사용자 ID',required:false},
						{id:'userGrpId',val:'',placeholder:'like 검색으로 사용될 그룹 ID',required:false},
						{id:'userGrpNm',val:'',placeholder:'like 검색으로 사용될 그룹',required:false},
						{id:'userStts',val:'',placeholder:'사용자 상태 값 Default value:C',required:false},
						{id:'pageNumber',val:'1',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'10',placeholder:'검색 이후, 정렬된 순으로 count 수',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'IM 전체 유저 정보 가져오기',
			    	  url:'/rfapi/user.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getAllUserByIM',placeholder:'',required:true},
						{id:'userNm',val:'',placeholder:'like 검색으로 사용될 사용자 명',required:false},
						{id:'userId',val:'',placeholder:'like 검색으로 사용될 사용자 ID',required:false},
						{id:'userGrpId',val:'',placeholder:'like 검색으로 사용될 그룹 ID',required:false},
						{id:'userGrpNm',val:'',placeholder:'like 검색으로 사용될 그룹',required:false},
						{id:'pageNumber',val:'1',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'10',placeholder:'검색 이후, 정렬된 순으로 count 수',required:false}
			    	  ]
			      },
				  {
		  	    	  name:'IM Group 와 하위 그룹에 소속된 모든 유저 가져오기',
			    	  url:'/rfapi/user.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getAllUsersByIMParentGroup',placeholder:'',required:true},
						{id:'exDeptParentCd',val:'',placeholder:'조회할 특정 그룹',required:true},
						{id:'pageNumber',val:'1',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false},
						{id:'count',val:'10',placeholder:'검색 이후, 정렬된 순으로 count 수',required:false}
			    	  ]
			      },
				  {
		  	    	  name:'IM Group 와 하위 그룹에 소속된 모든 유저수 가져오기',
			    	  url:'/rfapi/user.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getAllUsersByIMParentGroupCount',placeholder:'',required:true},
						{id:'exDeptParentCd',val:'',placeholder:'조회할 특정 그룹',required:true}
			    	  ]
			      },
				  {
		  	    	  name:'IM 전체 유저 정보를 검색어 기반으로 가져오기',
			    	  url:'/rfapi/user.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'searchUsersByIM',placeholder:'',required:true},
						{id:'query',val:'',placeholder:'검색어, 두 자 이상 입력해야 한다.',required:true}
			    	  ]
			      },
        	      {
        	    	  name:'카운트 정보 가져오기',
        	    	  url:'/rfapi/user.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getUserCuntInfo',placeholder:'',required:true}
        	    	  ]
        	      },
        	      {
        	    	  name:'업무 담당자 카운트 정보 가져오기',
        	    	  url:'/rfapi/user.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getStaffCuntInfo',placeholder:'',required:true},
						{id:'screenIds',val:'',placeholder:'업무 ID 리스트들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'catgIds',val:'',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'사용자 기본 점수 부여하기',
        	    	  url:'/rfapi/user.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'insertDefaultUserScore',placeholder:'',required:true},
						{id:'userId',val:'',placeholder:'',required:false},
						{id:'targetId',val:'#',placeholder:'',required:true},
						{id:'targetKdCd',val:'NON',placeholder:'',required:true},
						{id:'histKdCd',val:'HA0',placeholder:'',required:true},
						{id:'histNm',val:'기본 점수',placeholder:'',required:true},
						{id:'defaultScore',val:'',placeholder:'',required:true,type:'number'}
        	    	  ]
        	      },
        	      {
        	    	  name:'개별 권한 정보 가져오기',
        	    	  url:'/rfapi/user.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getUserNotiInfo',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'조회 대상이 되는 화면 ID',required:true}
        	    	  ]
        	      },
        	      {
        	    	  name:'개별 권한 정보 설정하기',
        	    	  url:'/rfapi/user.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'setUserNotiInfo',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'설정 대상이 되는 화면 ID',required:true},
						{id:'mailYn',val:'',placeholder:'메일 알림 여부',required:true},
						{id:'mmsYn',val:'',placeholder:'MMS 알림 여부',required:true}
        	    	  ]
        	      }
        	]
        },
        {
        	id:'Group',
        	name:'그룹',
        	sets:[
        	      {
		  	    	  name:'조회 그룹 전체 가져오기',
			    	  url:'/rfapi/grp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getAllGrp',placeholder:'',required:true},
						{id:'devFlag',val:'',placeholder:'조회 조건. 기본 false. false일 경우 GR1과 GR2만 조회',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'IM 조직 - 정보 조회하기',
			    	  url:'/rfapi/grp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'retrieveIMGroup',placeholder:'',required:true},
						{id:'grpCd',val:'',placeholder:'IM 조직 Code',required:true}
			    	  ]
			      },
			      {
		  	    	  name:'IM 조직 - 하위 정보 조회하기',
			    	  url:'/rfapi/grp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'retrieveIMGroupForTree',placeholder:'',required:true},
						{id:'exDeptParentCd',val:'',placeholder:'상위 IM 조직 Code. 입력하지 않으면 최상위 조회',required:false}
			    	  ]
			      }
        	]
        },
        {
        	id:'Screen',
        	name:'화면',
        	sets:[
        	      {
        	    	  name:'화면 전체 조회하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAllScreen',placeholder:'',required:true},
						{id:'screenNm',val:'',placeholder:'검색 시, like 검색으로 사용될 화면 명',required:false},
						{id:'sysIds',val:'',placeholder:'검색 시, 조건 검색으로 사용될 시스템 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false}
        	    	  ]
        	      },
				  {
        	    	  name:'검색어 기반으로 화면 조회하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'searchScreens',placeholder:'',required:true},
						{id:'query',val:'',placeholder:'검색어, 두 자 이상 입력해야 된다.',required:true}
        	    	  ]
        	      },
        	      {
        	    	  name:'가져오기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getScreen',placeholder:'',required:true},
						{id:'screenIds',val:'',placeholder:'화면 ID 리스트들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'totalFlag',val:'',placeholder:'삭제 대상까지 조회 여부. Y로 줄 경우, 삭제한 대상도 포함하여 조회된다.',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'입력하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'insertScreen',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'화면 ID',required:true},
						{id:'screenNm',val:'',placeholder:'화면 명',required:true},
						{id:'screenKdCd',val:'',placeholder:'화면 유형. Default value: SC1',required:false},
						{id:'screenDetl',val:'',placeholder:'화면 설명',required:false,type:'textarea'},
						{id:'defaultAtclDetl',val:'',placeholder:'화면 내 기본 글 양식',required:false,type:'textarea'},
						{id:'catgIds',val:'',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'wkcIds',val:'',placeholder:'업무구분 셋, 각 업무 구분을 " " 를 구분자로하여 여러개를 입력해야 함.',required:true},
						{id:'retrieveAuths',val:'',placeholder:'조회권한 셋, 각 조회 권한은 " " 를 구분자로 하여 여러개를 입력해야 함.',required:true},
						{id:'anwserUseYn',val:'Y',placeholder:'답글 사용 여부',required:true},
						{id:'anwserUseManagerYn',val:'Y',placeholder:'답글 사용 여부',required:true},
						{id:'replyUseYn',val:'Y',placeholder:'댓글 사용 여부',required:true},
						{id:'attachFileUseYn',val:'Y',placeholder:'첨부파일 사용 여부',required:true},
						{id:'attachImageUseYn',val:'Y',placeholder:'이미지첨부 사용 여부',required:true},
						{id:'ratingUseYn',val:'Y',placeholder:'페이지 내 평점 사용 여부',required:true},
						{id:'noticeUseYn',val:'Y',placeholder:'공지사항 사용 여부',required:true},
						{id:'manualUseYn',val:'Y',placeholder:'메뉴얼 사용 여부',required:true},
						{id:'modifyUseYn',val:'Y',placeholder:'수정 사용 여부',required:true},
						{id:'selectUseYn',val:'Y',placeholder:'채택 사용 여부',required:true},
						{id:'deleteUseYn',val:'Y',placeholder:'삭제 사용 여부',required:true},
						{id:'mailNotiUseYn',val:'Y',placeholder:'알림 - 메일 발송 사용 여부',required:true},
						{id:'mmsNotiUseYn',val:'Y',placeholder:'알림 - MMS 발송 사용 여부',required:true},
						{id:'secretSelectYn',val:'N',placeholder:'비밀글 자동 선택 여부',required:true},
						{id:'secretChkDisableYn',val:'N',placeholder:'비밀글 선택 변경 가능 여부 (체크박스 DISABLE)',required:true}
        	    	  ]
        	      },
        	      {
        	    	  name:'수정하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'updateScreen',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'화면 ID',required:true},
						{id:'screenNm',val:'',placeholder:'화면 명',required:false},
						{id:'screenKdCd',val:'',placeholder:'화면 유형. Default value: SC1',required:false},
						{id:'screenDetl',val:'',placeholder:'화면 설명',required:false,type:'textarea'},
						{id:'defaultAtclDetl',val:'',placeholder:'화면 내 기본 글 양식',required:false,type:'textarea'},
						{id:'catgIds',val:'',placeholder:'카테고리 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'wkcIds',val:'',placeholder:'업무구분 셋, 각 업무 구분을 " " 를 구분자로하여 여러개를 입력해야 함.',required:false},
						{id:'retrieveAuths',val:'',placeholder:'조회권한 셋, 각 조회 권한은 " " 를 구분자로 하여 여러개를 입력해야 함.',required:false}
        	    	  ]
        	      },
        	      {
        	    	  name:'화면 권한 수정하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'updateScreenAcls',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'화면 ID',required:true},
						{id:'anwserUseYn',val:'Y',placeholder:'답글 사용 여부',required:true},
						{id:'anwserUseManagerYn',val:'Y',placeholder:'답글 사용 여부',required:true},
						{id:'replyUseYn',val:'Y',placeholder:'댓글 사용 여부',required:true},
						{id:'attachFileUseYn',val:'Y',placeholder:'첨부파일 사용 여부',required:true},
						{id:'attachImageUseYn',val:'Y',placeholder:'이미지첨부 사용 여부',required:true},
						{id:'ratingUseYn',val:'Y',placeholder:'페이지 내 평점 사용 여부',required:true},
						{id:'noticeUseYn',val:'Y',placeholder:'공지사항 사용 여부',required:true},
						{id:'manualUseYn',val:'Y',placeholder:'메뉴얼 사용 여부',required:true},
						{id:'modifyUseYn',val:'Y',placeholder:'수정 사용 여부',required:true},
						{id:'selectUseYn',val:'Y',placeholder:'채택 사용 여부',required:true},
						{id:'deleteUseYn',val:'Y',placeholder:'삭제 사용 여부',required:true},
						{id:'mailNotiUseYn',val:'Y',placeholder:'알림 - 메일 발송 사용 여부',required:true},
						{id:'mmsNotiUseYn',val:'Y',placeholder:'알림 - MMS 발송 사용 여부',required:true},
						{id:'secretSelectYn',val:'N',placeholder:'비밀글 자동 선택 여부',required:true},
						{id:'secretChkDisableYn',val:'N',placeholder:'비밀글 선택 변경 가능 여부 (체크박스 DISABLE)',required:true}
        	    	  ]
        	      },
        	      {
        	    	  name:'삭제하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'deleteScreen',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'삭제할 화면 ID',required:true}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'화면 담당자 정보 가져오기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getScreenStaffs',placeholder:'',required:true},
						{id:'screenIds',val:'',placeholder:'조회할 화면 ID들, " " 를 구분자로 하여 여러개를 입력해야 함. ',required:true}
						
        	    	  ]
        	      },
				  {
        	    	  name:'전체 화면 담당자 정보 가져오기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getAllScreenStaffs',placeholder:'',required:true},
						{id:'query',val:'',placeholder:'조회 단어, 두 자 이상 들어가야 함.',required:true}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'화면 담당자 추가하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'addScreenStaffs',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'추가할 대상이 되는 화면 ID',required:true},
						{id:'staffIds',val:'',placeholder:'화면에 추가할 업무 담당자 ID들. " " 를 기준으로 여러명 입력 가능',required:true}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'화면 담당자 수정(덮어쓰기)하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'updateScreenStaffs',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'수정할 대상이 되는 화면 ID',required:true},
						{id:'staffIds',val:'',placeholder:'화면에 추가/수정할 업무 담당자 ID들. " " 를 기준으로 여러명 입력 가능. 아무도 입력하지 않으면 모두 삭제',required:false}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'화면 담당자 삭제하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'deleteScreenStaffs',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'삭제할 대상이 되는 화면 ID',required:true},
						{id:'staffIds',val:'',placeholder:'화면에 삭제할 업무 담당자 ID들. " " 를 기준으로 여러명 입력 가능',required:true}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'특정 시스템에 화면 추가하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'addScreensInSystem',placeholder:'',required:true},
						{id:'sysId',val:'',placeholder:'대상 시스템 ID',required:true},
						{id:'screenIds',val:'',placeholder:'추가할 화면 ID 들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:true}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'특정 시스템에 화면 수정(덮이쓰기) 하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'updateScreensInSystem',placeholder:'',required:true},
						{id:'sysId',val:'',placeholder:'대상 시스템 ID',required:true},
						{id:'screenIds',val:'',placeholder:'수정할 화면 ID 들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'특정 시스템에 추가된 화면 삭제하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'deleteScreensInSystem',placeholder:'',required:true},
						{id:'sysId',val:'',placeholder:'대상 시스템 ID',required:true},
						{id:'screenIds',val:'',placeholder:'삭제할 화면 ID 들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:true}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'사용자 즐겨찾기 한 화면 조회하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getScrapScreen',placeholder:'',required:true},
						{id:'sysIds',val:'',placeholder:'대상 시스템 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'사용자 즐겨찾기 화면 추가 및 삭제하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'scrapScreen',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'즐겨찾기할 화면 ID.',required:true},
						{id:'scrapYn',val:'',placeholder:'즐겨찾기 값.(Y인 경우 즐겨찾기 추가, N인 경우 즐겨찾기 삭제',required:true}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'사용자가 작성한 글이 소속된 화면 정보 조회하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getScreenByUserAtcl',placeholder:'',required:true},
						{id:'waitYn',val:'',placeholder:'Y로 값을 넣을 경우 답변 채택 대기 중인 것만 조회. Default value: N',required:false}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'사용자가 스크랩한 글이 소속된 화면 정보 조회하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getScreenByUserScrap',placeholder:'',required:true}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'사용자에게 내부공유된 글이 소속된 화면 정보 조회하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getScreenBySymbolicLink',placeholder:'',required:true}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'업무담당자가 접수한 글들이 소속된 화면 정보 조회하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getScreenByTODOReceiptAtcl',placeholder:'',required:true}
						
        	    	  ]
        	      },
        	      {
        	    	  name:'업무담당자가 담당한 업무의 글 중 답변이 필요한 글들이 소속된 화면 정보 조회하기',
        	    	  url:'/rfapi/screen.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'getScreenByTODOWatingAtcl',placeholder:'',required:true}
						
        	    	  ]
        	      }
        	]
        },
        {
        	id:'Rate',
        	name:'평점',
        	sets:[
				  {
					  name:'가져오기',
					  url:'/rfapi/rate.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'getRateByScreen',placeholder:'',required:true},
						{id:'screenId',val:'DEV_SCR_001',placeholder:'화면ID',required:true}
					  ]
				  },
        	      {
        	    	  name:'추가하기',
        	    	  url:'/rfapi/rate.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'insertRate',placeholder:'',required:true},
						{id:'screenId',val:'DEV_SCR_001',placeholder:'화면ID',required:true},
						{id:'score',val:'',placeholder:'화면 평점',required:true}
        	    	  ]
        	      },
        	      {
        	    	  name:'수정하기',
        	    	  url:'/rfapi/rate.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'updateRate',placeholder:'',required:true},
						{id:'screenId',val:'DEV_SCR_001',placeholder:'화면ID',required:true},
						{id:'score',val:'',placeholder:'화면 평점',required:true}
        	    	  ]
        	      },
        	      {
        	    	  name:'삭제하기',
        	    	  url:'/rfapi/rate.wsq',
        	    	  //method:'',
        	    	  params:[
						{id:'action',val:'deleteRate',placeholder:'',required:true},
						{id:'screenId',val:'DEV_SCR_001',placeholder:'화면ID',required:true}
        	    	  ]
        	      },
        	      {
					  name:'리포트 가져오기',
					  url:'/rfapi/rate.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'getRateReport',placeholder:'',required:true},
						{id:'sysIds',val:'',placeholder:'시스템 ID 들',required:false},
						{id:'screenIds',val:'',placeholder:'화면 ID 들',required:false},
						{id:'allYn',val:'',placeholder:'전체 조회 여부. 기본 N(만족도 평가된 화면만 조회)',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false,type:'number'},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false,type:'number'}
					  ]
				  }
        	]
        },
        {
        	id:'Utils',
        	name:'유틸',
        	sets:[
				  {
					  name:'메일발송',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'sendMail',placeholder:'',required:true},
						{id:'recAddr',val:'jgbossassa@lguplus.co.kr',placeholder:'수신자 이메일 주소',required:true},
						{id:'titNm',val:'',placeholder:'메일 제목',required:true},
						{id:'subTit',val:'',placeholder:'메일 001',required:true},
						{id:'summary',val:'',placeholder:'메일 003',required:true,type:'textarea'},
						{id:'detl',val:'',placeholder:'메일 004',required:true,type:'textarea'}
					  ]
				  },
				  {
					  name:'MMS발송',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'sendMMS',placeholder:'',required:true},
						{id:'mobile',val:'',placeholder:'수신자 번호',required:true},
						{id:'titNm',val:'',placeholder:'MMS 제목',required:true},
						{id:'mmsDetl',val:'',placeholder:'상세내용',required:true,type:'textarea'},
						{id:'reqDate',val:'',placeholder:'발송 일시(Datetime)',required:true},
						{id:'callback',val:'1004',placeholder:'발신자 번호',required:true}
					  ]
				  },
				  {
					  name:'History 조회',
					  url:'/rfapi/utils.wsq',
					  //method:'',
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
				  {
					  name:'Log Note 조회',
					  url:'/rfapi/utils.wsq',
					  //method:'',
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
				  {
					  name:'Log Note 입력',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'insertLogNote',placeholder:'',required:true},
						{id:'key',val:'',placeholder:'key',required:true},
						{id:'data1',val:'',placeholder:'data1',required:true,type:'textarea'},
						{id:'data2',val:'',placeholder:'data2',required:false,type:'textarea'},
						{id:'data3',val:'',placeholder:'data3',required:false,type:'textarea'},
						{id:'data4',val:'',placeholder:'data4',required:false,type:'textarea'}
					  ]
				  },
				  {
					  name:'시스템 내 권한 조회',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'retrieveAcl',placeholder:'',required:true},
						{id:'authKdCd',val:'',placeholder:'권한 분류',required:false}
					  ]
				  },
				  {
					  name:'WhiteList 조회',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'retrieveAllWhiteList',placeholder:'',required:true},
						{id:'ip',val:'',placeholder:'조회 IP',required:false}
					  ]
				  },
				  {
					  name:'WhiteList 추가',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'setWhiteList',placeholder:'',required:true},
						{id:'ip',val:'',placeholder:'추가할 IP',required:true}
					  ]
				  },
				  {
					  name:'WhiteList 해제',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'unsetWhiteList',placeholder:'',required:true},
						{id:'ip',val:'',placeholder:'해제할 IP',required:true}
					  ]
				  },
				  {
					  name:'관리자 전체 조회',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'retrieveAllAdmin',placeholder:'',required:true}
					  ]
				  },
				  {
					  name:'관리자 설정 추가',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'setAdmin',placeholder:'',required:true},
						{id:'userId',val:'',placeholder:'관리자로 설정할 사용자 ID',required:true}
					  ]
				  },
				  {
					  name:'관리자 설정 해제',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'unsetAdmin',placeholder:'',required:true},
						{id:'userId',val:'',placeholder:'해제할 관리자 ID',required:true}
					  ]
				  }
        	]
        },
		{
        	id:'Codes',
        	name:'코드',
        	sets:[
				
				  {
					  name:'시스템 내 범용 코드 전체 조회',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'retrieveAllCode',placeholder:'',required:true},
						{id:'allYn',val:'',placeholder:'Y일 경우, 삭제 대상인 것 까지 조회',required:false},
						{id:'cdId',val:'',placeholder:'조회 대상 코드 ID',required:false}
					  ]
				  },
				  {
					  name:'시스템 내 권한 코드 전체 조회',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'retrieveAllAcl',placeholder:'',required:true},
						{id:'allYn',val:'',placeholder:'Y일 경우, 삭제 대상인 것 까지 조회',required:false},
						{id:'authId',val:'',placeholder:'조회 대상 코드 ID',required:false}
					  ]
				  },
				  {
					  name:'시스템 내 범용 코드 추가',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'insertCode',placeholder:'',required:true},
						{id:'cdId',val:'',placeholder:'코드 ID',required:true},
						{id:'cdNm',val:'',placeholder:'코드 이름',required:true},
						{id:'cdGrpId',val:'',placeholder:'소속 코드 ID',required:false},
						{id:'cdDetl',val:'',placeholder:'코드 상세 정보',required:false},
						{id:'rmks',val:'',placeholder:'비고',required:false}
					  ]
				  },
				  {
					  name:'시스템 내 범용 코드 수정',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'updateCode',placeholder:'',required:true},
						{id:'cdId',val:'',placeholder:'코드 ID',required:true},
						{id:'cdNm',val:'',placeholder:'코드 이름',required:false},
						{id:'cdGrpId',val:'',placeholder:'소속 코드 ID',required:false},
						{id:'cdDetl',val:'',placeholder:'코드 상세 정보',required:false},
						{id:'rmks',val:'',placeholder:'비고',required:false},
						{id:'stts',val:'',placeholder:'상태값. D 값은 사용 정지를 의미',required:false}
					  ]
				  },
				  {
					  name:'시스템 내 범용 코드 삭제',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'deleteCode',placeholder:'',required:true},
						{id:'cdId',val:'',placeholder:'코드 ID',required:true}
					  ]
				  },
				  {
					  name:'시스템 내 권한 코드 추가',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'insertAcl',placeholder:'',required:true},
						{id:'authId',val:'',placeholder:'권한 코드 ID',required:true},
						{id:'authNm',val:'',placeholder:'권한 코드 이름',required:true},
						{id:'authKdCd',val:'',placeholder:'권한 유형 코드 ID',required:true},
						{id:'authDetl',val:'',placeholder:'권한 코드 상세 정보',required:false},
						{id:'rmks',val:'',placeholder:'비고',required:false}
					  ]
				  },
				  {
					  name:'시스템 내 권한 코드 수정',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'updateAcl',placeholder:'',required:true},
						{id:'authId',val:'',placeholder:'권한 코드 ID',required:true},
						{id:'authNm',val:'',placeholder:'권한 코드 이름',required:false},
						{id:'authKdCd',val:'',placeholder:'권한 유형 코드 ID',required:false},
						{id:'authDetl',val:'',placeholder:'권한 코드 상세 정보',required:false},
						{id:'rmks',val:'',placeholder:'비고',required:false},
						{id:'stts',val:'',placeholder:'상태값. D 값은 사용 정지를 의미',required:false}
					  ]
				  },
				  {
					  name:'시스템 내 권한 코드 삭제',
					  url:'/rfapi/utils.wsq',
					  //method:'',
					  params:[
						{id:'action',val:'deleteAcl',placeholder:'',required:true},
						{id:'authId',val:'',placeholder:'권한 코드 ID',required:true}
					  ]
				  }
        	]
        },
        {
        	id:'System',
        	name:'시스템',
        	sets:[
        	      {
		  	    	  name:'시스템 전체 조회하기',
			    	  url:'/rfapi/sys.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getSystems',placeholder:'',required:true},
						{id:'sysNm',val:'',placeholder:'검색 시, like 검색으로 사용될 시스템 명',required:false},
						{id:'sysIds',val:'',placeholder:'검색 시, 조건 검색으로 사용될 시스템 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'화면 ID로 시스템 조회하기',
			    	  url:'/rfapi/sys.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getSystemByScreen',placeholder:'',required:true},
						{id:'screenId',val:'',placeholder:'검색 시, 시스템 들을 조회하기 위한 화면 ID',required:true}
			    	  ]
			      },
			      {
		  	    	  name:'시스템 단일 조회하기',
			    	  url:'/rfapi/sys.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getSystem',placeholder:'',required:true},
						{id:'sysId',val:'',placeholder:'검색 시, 시스템을 조회하기 위한 시스템 ID',required:true}
			    	  ]
			      },
			      {
		  	    	  name:'시스템 추가하기',
			    	  url:'/rfapi/sys.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'insertSystem',placeholder:'',required:true},
						{id:'sysId',val:'',placeholder:'시스템 ID',required:true},
						{id:'sysNm',val:'',placeholder:'시스템 명',required:true},
						{id:'sysDetl',val:'',placeholder:'시스템 설명',required:false,type:'textarea'},
						{id:'sysIndex',val:'',placeholder:'기본 화면 ID',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'시스템 수정하기',
			    	  url:'/rfapi/sys.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'updateSystem',placeholder:'',required:true},
						{id:'sysId',val:'',placeholder:'수정할 시스템 ID',required:true},
						{id:'sysNm',val:'',placeholder:'시스템 명',required:false},
						{id:'sysDetl',val:'',placeholder:'시스템 설명',required:false,type:'textarea'},
						{id:'sysIndex',val:'',placeholder:'기본 화면 ID',required:false},
						{id:'sysStts',val:'',placeholder:'시스템 상태 값',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'시스템 삭제하기',
			    	  url:'/rfapi/sys.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'deleteSystem',placeholder:'',required:true},
						{id:'sysId',val:'',placeholder:'삭제 시, 대상 시스템 ID',required:true}
			    	  ]
			      }
        	]
        },
        {
        	id:'ScreenGrp',
        	name:'화면 그룹',
        	sets:[
        	      {
		  	    	  name:'화면 그룹 정보 전체 조회하기',
			    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getScreenGroups',placeholder:'',required:true},
						{id:'scrGrpNm',val:'',placeholder:'검색 시, like 검색으로 사용될 화면 그룹 명',required:false},
						{id:'scrGrpIds',val:'',placeholder:'검색 시, 조건 검색으로 사용될 화면 그룹 ID들, " " 를 구분자로 하여 여러개를 입력해야 함.',required:false},
						{id:'allYn',val:'',placeholder:'검색 시, 상태를 조건에 맞게 분기. Y - 상태 무시, 전체 조회. N - 상태가 C (정상) 인 것만 조회',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹 단일 조회하기',
			    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'검색 시, 조건 검색으로 사용될 화면 그룹 ID',required:true}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹 추가하기',
		  	    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'insertScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'화면 그룹 ID',required:true},
						{id:'scrGrpNm',val:'',placeholder:'화면 그룹 명',required:true},
						{id:'scrGrpDetl',val:'',placeholder:'화면 그룹 설명',required:false,type:'textarea'},
						{id:'scrIndexId',val:'',placeholder:'화면 그룹의 기본 화면 ID',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹 수정하기',
		  	    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'updateScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'화면 그룹 ID',required:true},
						{id:'scrGrpNm',val:'',placeholder:'화면 그룹 명',required:false},
						{id:'scrGrpDetl',val:'',placeholder:'화면 그룹 설명',required:false,type:'textarea'},
						{id:'scrIndexId',val:'',placeholder:'화면 그룹의 기본 화면 ID',required:false},
						{id:'scrGrpStts',val:'',placeholder:'화면 그룹 상태 값. C일 경우 정상, D 일 경우 사용하지 않는 것으로 한다.',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹 담당자 리스트 조회하기',
		  	    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getStaffByScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'화면 그룹 ID',required:true}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹에 화면 담당자 추가하기',
		  	    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'addStaffByScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'화면 그룹 ID',required:true},
						{id:'staffIds',val:'',placeholder:'화면 그룹에 추가할 화면 그룹 담당자 ID들. " " 를 기준으로 여러화면 입력 가능',required:true}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹에 화면 담당자 수정(덮어쓰기)하기',
		  	    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'updateStaffByScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'화면 그룹 ID',required:true},
						{id:'staffIds',val:'',placeholder:'화면 그룹에 수정(덮어쓰기)할 화면 그룹 담당자 ID들. " " 를 기준으로 여러화면 입력 가능',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹에 화면 담당자 해재하기',
		  	    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'deleteStaffByScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'화면 그룹 ID',required:true},
						{id:'staffIds',val:'',placeholder:'화면 그룹에 해제할 화면 그룹 담당자 ID들. " " 를 기준으로 여러 화면 가능',required:true}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹과 연결된 화면 리스트 조회하기',
		  	    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'getScreenByScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'화면 그룹 ID',required:false},
						{id:'scrGrpNm',val:'',placeholder:'검색 시, like 검색으로 사용될 화면 그룹 명',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹에 화면 추가하기',
		  	    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'addScreenByScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'화면 그룹 ID',required:true},
						{id:'screenIds',val:'',placeholder:'화면 그룹에 추가할 화면 ID들. " " 를 기준으로 여러화면 입력 가능',required:true}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹에 화면 수정(덮어쓰기)하기',
		  	    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'updateScreenByScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'화면 그룹 ID',required:true},
						{id:'screenIds',val:'',placeholder:'화면 그룹에 수정(덮어쓰기)할 화면 ID들. " " 를 기준으로 여러화면 입력 가능',required:false}
			    	  ]
			      },
			      {
		  	    	  name:'화면 그룹에 화면 해재하기',
		  	    	  url:'/rfapi/scrgrp.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'deleteScreenByScreenGroup',placeholder:'',required:true},
						{id:'scrGrpId',val:'',placeholder:'화면 그룹 ID',required:true},
						{id:'screenIds',val:'',placeholder:'화면 그룹에 해제할 화면 ID들. " " 를 기준으로 여러 화면 가능',required:true}
			    	  ]
			      }
        	]
        },
		{
        	id:'Sttcs',
        	name:'통계 정보',
        	sets:[
        	      {
		  	    	  name:'통계 자료 조회하기',
			    	  url:'/rfapi/sttcs.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'retrieveSttcs',placeholder:'',required:true},
						{id:'dateDiv',val:'',placeholder:'통계 생성을 위한 시간 구분 코드',required:true},
						{id:'startDt',val:'',placeholder:'조회 시작 날짜',required:false},
						{id:'endDt',val:'',placeholder:'조회 종료 날짜',required:false},
						{id:'pageNumber',val:'',placeholder:'검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작',required:false,type:'number'},
						{id:'count',val:'',placeholder:'검색 이후, 정렬된 순으로 가져올 count 수',required:false,type:'number'}
			    	  ]
			      },
				  {
		  	    	  name:'통계 자료 생성하기',
			    	  url:'/rfapi/sttcs.wsq',
			    	  //method:'',
			    	  params:[
						{id:'action',val:'insertSttcs',placeholder:'',required:true},
						{id:'dateDiv',val:'',placeholder:'통계 생성을 위한 시간 구분 코드',required:true},
						{id:'queryDate',val:'',placeholder:'통계 생성 시, 시간 구분 코드에 맞는 날짜',required:true}
			    	  ]
			      }
        	]
        }
	];

var apiData = (function(){
	
	var panelTemplate = '<div class="row panel panel-primary">'
		+'<div class="panel-heading" fold="false" style="position: relative;">'
		+'<div style="display:inline-block">{0}</div>'
		+'<i class="fa fa-angle-down fa-2x btn-fold" style="position: absolute;right:10px;cursor:pointer"></i></div>'
		+'<div class="panel-body row api-section" style="display:none">'
		+'<div class="col-md-6">'    
		+'<div class="panel panel-default req-section">'
		+'<div class="panel-heading">REQUEST - PARAMS</div>'
		+'<div class="panel-body">'
		+'<form url="{1}" {3}>'
		+'{2}'
		+'<a type="button" class="btn btn-default wsq-btn">실행</a>'
		+'</form></div></div></div>'
		+'<div class="col-md-6">'
		+'<div class="panel panel-default res-section">'
		+'<div class="panel-heading">RESULT - JSON VIEWER</div>'
		+'<div class="panel-body" style="min-height:500px;overflow:auto;">'
		+'<span class="json-viewer"></span>'
		+'</div></div></div></div></div>';
	
	var inputTempate = '<div class="form-group">'
		+'<label for="{0}">{5}</label>'
		+'<input type="{6}" class="form-control" id="{0}" name="{1}" value="{2}" placeholder="{3}" {4}></input>'
		+'</div>';
	
	var textareaTemplate = '<div class="form-group">'
		+'<label for="{0}">{5}</label>'
		+'<textarea type="{6}" class="form-control" id="{0}" name="{1}" value="{2}" placeholder="{3}" {4}></textarea>'
		+'</div>';
	
	var menuTemplate = '<li><a class="api-menu" data-target="{0}">{1}</a></li>';
	var menuBtnTemplate = '<a type="button" class="btn btn-default api-menu" data-target="{0}">{1}</a>';
	
	return {
		getPanelTemplate:function(){
			return panelTemplate;
		},
		getInputTemplate:function(){
			return inputTempate;
		},
		getModelById:function(apiId){
			var resObj = null;
			$.each(apis,function(index, obj){
				if(obj.id == apiId){
					resObj = obj;
					return;
				}
			});
			return resObj;
		},
		getApiSectionById:function(apiId){
			var apiObj = this.getModelById(apiId);
			var paramSet = [];
			var panelSet = [];
			var paramCunt = 0;
			
			var htmlObj = '';
			
			var cuntApis = apiObj.sets.length;
			
			for(var i=0;i<cuntApis;i++){
				paramSet = [];
				var targetObj = apiObj.sets[i];
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
				
				panelSet.push(panelTemplate.format(apiObj.name+' - '+targetObj.name
						,targetObj.url
						,paramSet.join('')
						,encType));
			}
			
			return panelSet.join('');
		},
		getApiMenus: function(){
			var cuntApis = apis.length;
			var menuSet = [];
			for(var i=0;i<cuntApis;i++){
				menuSet.push(menuTemplate.format(apis[i].id,apis[i].name));
			}
			
			return menuSet.join('');
		},
		getApiMenuBtns: function(){
			var cuntApis = apis.length;
			var menuSet = [];
			for(var i=0;i<cuntApis;i++){
				menuSet.push(menuBtnTemplate.format(apis[i].id,apis[i].name));
			}
			
			return menuSet.join('');
		}
	};
})();

