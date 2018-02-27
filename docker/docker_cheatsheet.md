Docker JG.Cheat Sheet
=====
#### 자주 사용하는 옵션
옵션|설명
---|---
-d|detached mode 흔히 말하는 백그라운드 모드
-p|호스트와 컨테이너의 포트를 연결 (포워딩)
-v|호스트와 컨테이너의 디렉토리를 연결 (마운트)
-e|컨테이너 내에서 사용할 환경변수 설정
–name|컨테이너 이름 설정
–rm|프로세스 종료시 컨테이너 자동 제거
-it|-i와 -t를 동시에 사용한 것으로 터미널 입력을 위한 옵션
–link|컨테이너 연결 [컨테이너명:별칭]

#### 자주 사용하는 명령
##### 이미지
* 이미지 다운 받기
  * `docker pull redis`
* 실행
  * Docker로 컨테이너 실행
    * `docker run --name redis -p 6379:6379 -v /c/docker/data/redis:/data -d redis redis-server --appendonly yes`
  * WEBDIS 실행하기
    * REDIS와 연동: `docker run -d -p 7379:7379 --link redis anapsix/webdis`
  * CLI 들어가기
    * `docker exec -it redis redis-cli`
* Stop된 Container 실행하기
  * `docker start elastic`
* Docker List 보기
  * **stop** 상태 포함해서 모두 보기 : `docker ps -a`, `docker ps --all`
* Container 삭제
  * `docker rm redis`

#### 예제
##### Elastic Search
* https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
* 이미지 받기 : `docker pull elasticsearch`
* 실행 : `docker run --name elastic -p 9200:9200 -p 9300:9300 -v /c/docker/data/elastic:/usr/share/elasticsearch/data -e "discovery.type=single-node" elasticsearch`
* 내부 터미널 실행 : `docker exec -it elastic /bin/bash`

#### Link
* Cheat Sheet - https://github.com/wsargent/docker-cheat-sheet