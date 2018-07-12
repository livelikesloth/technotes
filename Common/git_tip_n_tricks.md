GIT Tip & Tricks
=====
알고 있으면 좋을 것들 모음

* 특정 파일 되돌리기

```bash
$ git log [파일 위치, git repository 안에서 사용해야함]
commit v6s7d6f7sfd7d6f76sa7fd
Author: ********
Date:   [commit 한 날짜]

   [commit 메시지]

$ git checkout v6s7d6f7sfd7d6f76sa7fd [파일 위치]
```

* 원격지에 `push` 된 내용을 되돌리기
이미 원격지에 push된 브랜치는 다시 되돌리기 난감하다. 로컬 내용은 `reset`으로 손쉽게 이전으로 돌아올 수 있지만 원격지는 어떻게 해야 할까?
이러한 경우 강제 `push`기능을 터미널에서 명령어로 작성하여 실행하면 쉽게 풀 수 있다.
```bash
$ git push origin +DEPLOY_PROD
```
