Scouter 설치
======
#### 다운로드
* 아래 위치로 들어가 해당 OS 맞는 버전을 다운로드
  * https://github.com/scouter-project/scouter/releases/
  * **server** : 모니터링 대상이 되는 서버들의 정보들을 취합/저장/관리하고, client에서 볼 수 있게 정보를 제공
  * **client** : 서버와 접속하여, 모니터링 정보를 시각화 하여 볼 수 있게 제공
  * **agent** : 모니터링 대상에 설치하며, 서버 자체 정보 및 **WAS**에 적용
  
#### 사전 준비
* 모니터링 서버 위치 선정
  * 로그 정보 및 시각화 정보를 클라이언트에 지속적으로 제공해야 하므로, 따로 서버를 구성하여 설치하는 것이 좋다.
* 모니터링 서버 및 대상 서버의 **포트 오픈**
  * 스쿠터는 서로간의 통신 및 클라이언트에게 정보를 제공 시, `6100` 포트를 사용하며, **TCP, UDP** 모두 사용한다.
* 모니터링 서버에 **scouter.server** 파일 위치 및 압축 해제
* 모니터링 대상 서버에 **scouter.agent** 파일 위치 및 압축 해제

#### Scouter 서버 실행
* Standalone으로 실행 가능한 서버 프로그램 압축 해제 후, 실행
  * `startup.sh`으로 서버 실행 가능

#### 모니터링 대상 서버 agent 셋팅
모니터링 대상은 크게 두개로 구성 된다.
각 해당 구성 내 `.conf` 파일로 설정을 해야 하고, 실행 혹은 실행 스크립트에 추가하여 정보를 수집하여 `scouter.server`에 전송할 수 있게 해야한다.<br>

* **서버**
  * `agent.host/conf/scouter.conf`를 수정
    * `net_collector_ip` 항목에 `scouter.server` IP 정보 입력
    * `net_collector_udp_port`나 `net_collector_tcp_port`에 `scouter.server` PORT 정보 입력
      * 변경 없을 경우 `6100`이 기본
    * `obj_name`에 서버를 표시할 이름을 입력, 중복으로 사용됨을 주의해야 함
  * `agent.host/host.sh`를 실행

* **WAS Instance**
  * `agent.java/`에 진입하여, `agent.host/conf/scouter.conf`와 동일한 내용의 새로운 파일 생성
    * 각 인스턴스 별로 하나씩 만들어야 함
  * 만들어진 설정 파일을 각 인스턴스 실행 스크립트에 추가
    * 예:
```bash
export SCOUTER_AGENT_DIR=/scouter.app/scouter/agent.java
JAVA_OPTS=" ${JAVA_OPTS} -javaagent:${SCOUTER_AGENT_DIR}/scouter.agent.jar"
JAVA_OPTS=" ${JAVA_OPTS} -Dscouter.config=${SCOUTER_AGENT_DIR}/scouter_dev_11.conf"
JAVA_OPTS=" ${JAVA_OPTS} -Dobj_name=PlanDev_11"
```

서버는 `host.sh` 실행 시, 자동으로 정보를 수집해서 `scouter.server`로 전송되며, **WAS Instance**는 재구동하면 정보 수집을 시작한다.

#### Client 셋팅
* 압축 해제하고, `scouter.client` 내 `scouter.exe`를 실행
* 초기 ID/PW : admin/admin