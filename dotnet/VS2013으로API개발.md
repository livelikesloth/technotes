VS2013으로 API 개발
=====
### 환경
* Visual Studip 2013
* MVC 4
* Web API 2.0
* .Net Framework 4.0

### 개발
#### Model
* Json response를 위해서 `Models`에 Class를 만들어야 함
  * 서버 디버그가 실행된 상태에서 `Class`가 추가되지 못함

#### configure
* Propertise 셋팅 : `web.config`
```xml
<configuration>
  <appSettings>
    <add key="Key" value="Value"/>
  </appSettings>
</configuration>
```

* 가져오는 방법 : `textBox1.Text = ConfigurationManager.AppSettings["Name"];`
#### API
* Json 형태로 제공하기 위한 형식
```cs
public IHttpActionResult GetProduct(int id)
{
    Product pd = new Product
    {
    	id = "001", text = "test"
    }

    return Ok(product);
}
```
  * `IHttpActionResult` 반환형으로 설정해야 함
  * `Ok()`에 반환할 Model을 넣어주면 알아서 Json 형식으로 response 됨
  * List로 반환 시, 형식을 `IEnumerable<Product>`로 설정해야 함
* 특정 라우팅 경로를 적용하기 위해서는 Controller상단에 아래와 같이 어노테이션 형식을 추가한다.
  * `[Route("api/ppt/test")]`
* API 내 `ap/test/[id]` 중 id 값을 가져오기 위해서는 parameter 항목에 id를 정의해서 넣으면 된다.
  * 예) `public async Task<HttpResponseMessage> Post(string id)`
* `find` 시, key가 여러개 일 경우 parameter는 `,` 기준으로 개수 만큼 넣으면 된다.
  * 예) key가 두개일 경우 : `await db.students.FindAsync(id, stNo)`
* Image 스트림 처리
```cs
public HttpResponseMessage Get(int id)
{
    var result = new HttpResponseMessage(HttpStatusCode.OK);
    String filePath = HostingEnvironment.MapPath("~/Images/HT.jpg");
    FileStream fileStream = new FileStream(filePath, FileMode.Open);
    Image image = Image.FromStream(fileStream);
    MemoryStream memoryStream = new MemoryStream();
    image.Save(memoryStream, ImageFormat.Jpeg);
    result.Content = new ByteArrayContent(memoryStream.ToArray());
    result.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
    return result;
}
```
  * 위 예제에 `return` 전 스트림들을 `Close()`하는 로직을 넣어야 한다. 그렇지 않을 경우 똑같은 파일을 접근하려고 하면 에러가 출력된다.

#### 자료형, 캐스팅
#### DB Connection, ORM
* `NuGet`으로 [모두 설치 가능하기 때문에 수동으로 할 필요가 없음](https://www.experts-exchange.com/questions/28967440/'Oracle-ManagedDataAccess-Client'-could-not-be-loaded.html)
* 엔터티 모델 연결 시, 테이블이 연결되지 않는 다면 버전 문제 확인 (`Oracle.ManagedDataAccess` 라이브러리를 다운그레이드)
* 자동 셋팅된 `web.config`에서 양식에 맞게 DB 연결 추가
  * `<dataSources>`와 `<connectionStrings>` 부분 확인
  * **TIP:** 셋팅이 완료되면 `다시 빌드`를 해야 추가된 `.dll` 들이 프로젝트에 적용된다.
* 추가에서 엔터티 데이터 모델 추가 시, 셋팅된 내역을 그대로 사용
* primary key를 사용하지 않고 검색하기
```cs
using (var context = new BloggingContext())
{
    // Query for all blogs with names starting with B
    var blogs = from b in context.Blogs
                   where b.Name.StartsWith("B")
                   select b;
    // Query for the Blog named ADO.NET Blog
    var blog = context.Blogs
                    .Where(b => b.Name == "ADO.NET Blog")
                    .FirstOrDefault();
}
```
* 검색(`find`) 시, Primary Key의 자료형에 맞게 넣어야 한다.
* seq 생성 예제
```cs
Person p = context.Person.OrderByDescending( c => c.PersonID).FirstOrDefault();
int newId = (null == p ? 0 : p.Id) + 1;
```

#### ORACLE TO Entity
Oracle Column Type|.net Data type in Entity Class
:----------------:|-----------------
Nullable|`Nullable<type>`
Number|`decimal`
Varchar|`string`
Timestamp|`System.DateTime`

#### Modeler
* 특정 Table 당 Entity column을 다르게 매핑하기 위해서는 `테이블 매핑` 메뉴에서 변경하면됨.

#### 기타
* 패키지 수동 설치 `Menu: Tools → Options → Package Manager` 내 패키지 소스에서 설치된 위치 디렉토리 추가
* MultiThread 기반 싱글톤 예제
```cs
using System;
public sealed class Singleton
{
   private static volatile Singleton instance;
   private static object syncRoot = new Object();
   private Singleton() {}
   public static Singleton Instance
   {
      get
      {
         if (instance == null)
         {
            lock (syncRoot)
            {
               if (instance == null)
                  instance = new Singleton();
            }
         }
         return instance;
      }
   }
}
```

### 배포
#### 사전 준비
* IIS 설치
* IIS 관리 도구 > 서버 명 선택 > 기능 위임
  * 처리기 매핑을 `읽기/쓰기`로 변경
* IIS 관리 도구 > 서버 명 > 사이트 > 해당 사이트 선택 > 디렉토리 검색
  * `사용` 설정

### Links
* [DefaultConnectionFactory 에러 문제](https://stackoverflow.com/questions/27656519/oracle-odp-net-with-entity-framework-6-entity-framework-database-compatible-pr)
* [Entity Framework - Oracle 연결](https://csharp.today/entity-framework-6-database-first-with-oracle/)
* [Entity Framework 데이터 모델 만들기](https://docs.microsoft.com/ko-kr/aspnet/mvc/overview/getting-started/getting-started-with-ef-using-mvc/creating-an-entity-framework-data-model-for-an-asp-net-mvc-application)
* [Table과 요소 연결](https://stackoverflow.com/questions/10554888/change-table-and-column-name-mappings-entity-framework-v4-3)
* [API Routing 방법](https://docs.microsoft.com/ko-kr/aspnet/web-api/overview/web-api-routing-and-actions/attribute-routing-in-web-api-2)
* Delay 사용 예제 : https://msdn.microsoft.com/en-us/library/hh194873(v=vs.110).aspx
* [이미지 스트림 처리](https://jamessdixon.wordpress.com/2013/10/01/handling-images-in-webapi/)
* [Parameter 처리](https://docs.microsoft.com/en-us/aspnet/web-api/overview/formats-and-model-binding/parameter-binding-in-aspnet-web-api)
* `Datetime` 처리 : https://msdn.microsoft.com/en-us/library/system.datetime(v=vs.110).aspx
* [REST 서비스 호출](https://msdn.microsoft.com/en-us/library/jj819168.aspx)
* https://stackoverflow.com/questions/1842770/consume-rest-api-from-net
* [REST Sharp 샘플들](https://stackoverflow.com/questions/10226089/restsharp-simple-complete-example)
* [ZipUpload, file upload 할때 용의함](https://ehikioya.com/uploading-files-rest-endpoint-csharp/)
* [Web.config를 상황에 맞게 변경](http://taeyo.net/columns/View.aspx?SEQ=395&PSEQ=8&IDX=0)
* [로그는 serilog로 간다..](https://serilog.net/)