## A2C

#### **개요**

서울 클라이밍 정보를 포함한 커뮤니티 웹앱

<br>

### 1. Commit Messge Convention 

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 변경
- chore: 구조 변경
- style: 디자인 변경
- test: 테스트 코드 추가, 수정, 삭제
- refactor: 코드 리팩토링 (성능 향상 X, 단순 버그 수정)
- perf: 성능 향상을 위한 코드 변경
- build: 빌드 시스템 또는 외부 종속성 변경
- ci: CI/CD 설정 변경 및 스크립트 수정

### 2. TEST Code Convention

- 폴더 이름은 00-페이지명, 파일명은 기능명으로 설정. (ex. 01-login / feature.test.ts)
- 테스트 제목은 서술적이며 명확하게 표현.
- 'describe' 블록 하에 여러 it를 사용해 개별 테스트.
- 속성 선택은 'id'나 'data-\*'로 사용.

### 3. 기술 스택 (Tech Stack)
- Frontend: React, NextJs, Vite, TypeScript
- Styling: Tailwind CSS
- Package Management: Yarn

