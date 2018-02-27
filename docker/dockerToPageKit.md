Docker 설치부터 Pagekit 올리기
=====
#### 설치
##### 사전 확인 사항
* Docker는 Community Edition (이하 CE) 으로 무료 사용이 가능하며, 이를 설치하여 진행
* Windows 경우 Windows 10 이상에서만 설치가 가능하며, Hyper-V를 지원해야 한다.

##### 설치 정보
* https://www.docker.com/community-edition
  * 설치 파일을 다운받아 그대로 실행하고, 설치 이후에 설치된 PC 를 **Restart** 한다.

#### nginx 설치
* **pagekit**을 웹 서버에 올려야 하기 때문에, 간단히 설치 가능한 **nginx**를 사용
* Windows Powershell을 통해, 설치 진행
* 가장 먼저 nginx를 사용하기 위해 기본이 되는 이미지를 download
  * `docker pull nginx`
    * nginx의 가장 최신 버전을 download
  * `docker images`
    * 설치 완료 이후, download 된 Images를 확인

#### nginx 실행
* Docker는 Image를 기반으로 Container를 생성하여 실행
* Image가 Class라면 Container는 Instance라고 보면 됨
* `docker run -d -p 8180:80 --name pagekit nginx`
  * 실행 시, local에서 `8180` port로 [내부 접근 가능](http://localhost:8180/) 

#### Tip & tricks
* `docker run -d -p 8280:80 -v c:/workspace/study:/data -i -t --name pagekitb nginx /bin/bash`
* `docker pull richarvey/nginx-php-fpm:latest`
* `docker run -d -p 8280:80 -v c:/workspace/study:/data -i -t --name pagekit richarvey/nginx-php-fpm /bin/bash`