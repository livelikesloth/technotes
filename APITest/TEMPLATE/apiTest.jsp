<%@page import="lguplus.socialdesk.util.SessionManager"%>
<%@ page import="java.io.*, java.util.*,netegrity.siteminder.vwa.common.*, lguplus.u3.com.util.*, lguplus.socialdesk.util.*" %>
<%@ page import="java.lang.*" %>
<%@ page contentType="text/html;charset=utf-8"%>
<%
 response.setHeader("Cache-Control","no-cache");
 response.setHeader("Pragma","no-cache");
 response.setDateHeader("Expires",0);
%>
<%
	EnvSet es = EnvSet.getInstance();
	System.out.println("ACCESS Admin Page [TEST Code] : " + es.getAdminFlag());

	if(!es.getAdminFlag()){
		%>
			<html>
			<head>
			<title>Unauthed</title>
			
			</head>
			<body>
				<FORM NAME='sessionForm' ACTION='/websquare/error.jsp' METHOD='POST'>
				</FORM>
			</body>
			</html>
			<script language="javascript">
				document.sessionForm.submit();
			</script>
		<%
	}
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="jgbossassa">
	<title>DEV :: API TEST PAGE</title>
	
	<link rel="stylesheet" type="text/css" href="/websquare/admin/css/font-awesome.min.css" />
	<link href="/websquare/admin/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/websquare/admin/css/pretty-json.css" />
	
	<link rel="stylesheet" type="text/css" href="/websquare/admin/js/bootgrid/jquery.bootgrid.min.css" />
	
	<style>
    body {
        padding-top: 70px;
    }
	
	.mCenter {
		display:inline-block;
		vertical-align:middle;
		float:none;
	}
	
	.mBoader{
		border: solid 2px red;
	}
    </style>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="/websquare/admin/js/html5shiv.min.js"></script>
        <script src="/websquare/admin/js/respond.min.js"></script>
    <![endif]-->
</head>
<body>
	<!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/admin/api.wsd">DEV. Social Desk</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                	<li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">API LIST<sapn class="caret"></sapn></a>
                        <ul class="dropdown-menu" id="api-list">
                        	<li><a href="#">API 1</a></li>
                        	<li><a href="#">API 2</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">GRID LIST<sapn class="caret"></sapn></a>
                        <ul class="dropdown-menu" id="grid-list">
                        	<li><a href="#">유저 히스토리</a></li>
                        	<li><a href="#">[제작중] 특수 로그 노트</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:$('body').scrollTop(0)">TOP</a>
                    </li>
                    <!-- 
                    <li>
                        <a href="#">About</a>
                    </li> 
                    -->
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    
    <!-- Page Content -->
    
    <div class="container page-header">
    	<h3 style="margin-bottom:-5px;">DEV. API TEST PAGE</h3>
    	<div>
    		<h4 class="mCenter" style="margin-right:5px;">Version </h4>
    		<label class="label label-warning ">process</label>
    		<strong class="mCenter " style="color:blue;margin-left:5px;height:100%">0.6.0</strong>
    	</div>
    	<!--  <a type="button" class="btn btn-default login-btn">websqure.jsp 호출 - 세션 연결</a>-->
    	<div>
	    	<a type="button" href="#" class="btn btn-default fake-login">서비스를 한번 연결해야 합니다. - 세션 연결</a>
	    	<iframe id="fakeLoginView" style="visibility: hidden;height:1px;"></iframe>
    	</div>
    </div>
    <div id="appView" class="container">
	    <div class="row panel panel-primary">
	    	<div class="panel-heading">공지사항</div>
	    	<div class="panel-body row api-section">
		    	<div class="col-md-6">    
				    <div class="panel panel-default req-section">
				    	<div class="panel-heading">REQUEST - PARAMS</div>
				    	<div class="panel-body">
				    	<form url="/rfapi/note.wsq">
				    		<div class="form-group">
				    		<label for="action-001">Action</label>
				    		<input type="text" class="form-control" id="action-001" name="action" value="getAllNote" ></input>
				    		</div>
				    		
				    		<div class="form-group">
				    		<label for="noteKdCd_001">Note Type</label>
				    		<input type="text" class="form-control" id="noteKdCd_001" name="noteKdCd" placeholder="NT1:개선요청, NT2:배포문의, NT3:공지사항"></input>
				    		</div>
				    		
				    		<div class="form-group">
				    		<label for="pageNumber_001">Page Number</label>
				    		<input type="text" class="form-control" id="pageNumber_001" name="pageNumber" placeholder="검색 이후, 정렬된 순으로 count 수 기반의 페이지 번호. 1부터 시작"></input>
				    		</div>
				    		
				    		<a type="button" class="btn btn-default wsq-btn">실행</a>
				    	</form>
				    	</div>
				    </div>
			    </div>
			    <div class="col-md-6">
				    <div class="panel panel-default res-section">
					    <div class="panel-heading">RESULT - JSON VIEWER</div>
					    <div class="panel-body" style="max-height:500px;overflow:auto;">
					    	<span class="json-viewer"></span>
					    </div>
				    </div>
			    </div>
		    </div>
	    </div>
	
	
        
    </div>
    <div class="container">
	    <iframe name="fileUpCallback" src="/websquare/admin/uploadTemp.html" style="display:none;">    
	    </iframe>
    </div>
    
    
    <!-- jQuery Version 1.11.1 -->
    <script src="/websquare/admin/js/jquery.js"></script>
    <script src="/websquare/admin/js/bootstrap.min.js"></script>
    <script src="/websquare/admin/js/underscore-min.js"></script>
    <script src="/websquare/admin/js/backbone-min.js"></script>
    <script src="/websquare/admin/js/pretty-json-min.js"></script>
    <script src="/websquare/admin/js/apiData.js"></script>
    <script src="/websquare/admin/js/gridData.js"></script>
    <script src="/websquare/admin/js/jquery.toaster.js"></script>
    
    <script src="/websquare/admin/js/moment.js"></script>
    <script src="/websquare/admin/js/bootgrid/jquery.bootgrid.min.js"></script>
    <script src="/websquare/admin/js/bootgrid/jquery.bootgrid.fa.min.js"></script>
    <script type="text/javascript" src="/websquare/admin/js/apiTest.js"></script>
    
</body>
</html>