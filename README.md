## A2C

### **Project Purpose**

A2C는 서울 지역의 클라이밍 커뮤니티를 강화하고, 사용자들이 클라이밍 정보를 쉽게 공유하고 발견할 수 있도록 지원합니다.
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

### 2. API Function Naming Convention
- 모든 조회 요청 함수는 get으로 시작.
    예: getUserList, getPostDetails
- 모든 데이터 생성 및 변경 요청 함수는 post로 시작.
  예: postUserData, postComment

### 3. TEST Code Convention

- 위치: 테스트 파일은 실제 파일과 동일한 디렉토리 내에 위치시킵니다. (예: feature.ts → feature.test.ts)
- 제목: 테스트 제목은 서술적이며 명확하게 표현합니다.
- 작성 방식: describe 블록으로 기능 단위 테스트를 그룹화 및 it 블록으로 개별 테스트 케이스 작성.
- 속성 선택: 테스트 시, HTML 속성은 id 또는 data-*를 기준으로 선택합니다.

### 4. Tech Stack
- Frontend: React, Next.js, TypeScript
- Styling: Tailwind CSS
- State Management: TanStack Query
- Package Management: Yarn
- Deployment: Vercel

