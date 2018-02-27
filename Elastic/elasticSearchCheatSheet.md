Elastic Search Cheat Sheet
=====
문서 내 용어정리
----
* Elastic Search : ES

기본
----
제목|내용|상세
---|----|---
`config/elasticsearch.yml`|설정파일|
`/usr/share/elasticsearch/data`|**default** 데이터 저장 위치|
port 9200|ES RestApi 기본 PORT |

사용
-----
##### REST API 구조
* http://host:port/(index)/(type)/(action|id)
  * SQL과 비교하면 **index** : DB, **type** : Table, **id** : row

#### Cheat Sheet
제목 |Method| 명령 | Payload |설명
----|---|--|---|---
보유하고 있는 인덱스 목록 보기 |`GET`| `localhost:9200/_cat/indices?v&pretty`||
스크립트 방식으로 문서 수정|`POST`|`localhost:9200/customer/external/1/_update`|`{"script" : "ctx._source.age += 5"}`| `ctx._source`는 ID로 검색된 대상 문서<br>**age**는 그 안의 한 개 항목을 의미
벌크 처리|`POST`|`localhost:9200/customer/external/_bulk`||

##### Infos
* HTTP Method를 `POST`로 하면 **ID**가 자동 채번됨
* 모든 인덱스는 1개의 복제본을 가져야 함 (노드가 두개 이상으로 구성해야한다는 것. 물론 안해도 사용가능하나, yellow 상태임)
* javascript에서 사용할 때는 [elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)를 활용
  * `npm install elasticsearch-browser`
* **from**의 기본값은 0, **size**의 기본값은 10이다.

Plugin
---

util
----
* [head](https://github.com/mobz/elasticsearch-head) : 모니터링 도구. 예전에는 플러그인이었는데 현재는 따로 분리됨. [크롬 익스텐션](https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm/)으로 사용가능

링크
---
* [한글 형태소 분석기 - 은전한닢 연동](https://bakyeono.net/post/2016-06-03-start-elasticsearch.html)
* [설치 및 사용법](http://brownbears.tistory.com/66) : 클러스터 설정법까지 나와있음
* [Search 샘플 모음](http://jjeong.tistory.com/726)
* [Query DSL 기초 - 4.X 기반](https://bakyeono.net/post/2016-08-20-elasticsearch-querydsl-basic.html)