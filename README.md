# A2C

## 🔗 라이브 데모 (Live Demo)

**👉 [https://www.a2climbing.com/main](https://www.a2climbing.com/main)**

## 🚩 프로젝트 소개 (Project Purpose)

A2C는 서울 지역 클라이머들을 위한 커뮤니티 플랫폼입니다. 사용자들이 **주변 클라이밍 짐 정보를 지도 기반으로 쉽게 찾고**, 커뮤니티 기능을 통해 **정보를 공유하며 새로운 크루를 발견**할 수 있도록 지원합니다. 기존 플랫폼들의 정보 분산 및 크루 찾기 어려움 문제를 해결하고, 클라이머들의 경험 향상을 목표로 합니다.
<br>

## ✨ 주요 기능 (Features)

* 회원가입 / 로그인 / 비밀번호 찾기 및 수정
* 마이 페이지 (사용자 정보 관리)
* 커뮤니티 게시판 (리스트 및 상세 페이지)
* 근처 클라이밍짐 리스트 페이지
* 클라이밍짐 지도 페이지 (Naver Map API 활용)

## 🛠️ 기술 스택 (Tech Stack)

* **Frontend**: React, Next.js (App Router), TypeScript
* **Styling**: Tailwind CSS
* **State Management**: TanStack Query
* **Version Control**: Git
* **Package Management**: Yarn
* **Deployment**: Vercel
* **Testing**: Jest
* **API**: RESTful API

## 🚀 주요 성과 (Key Achievements)

* **성능 최적화**: Lighthouse 기준 높은 성능(Performance 97) 및 SEO(100) 점수 달성 (2025.02.24 기준)
* **사용자 경험**: 반응형 디자인과 최적화된 UI/UX로 다양한 디바이스 지원
* **개발 효율성**: React Hook Form 도입으로 폼 관리 효율화 및 생산성 향상
* **기술 적용**: 지도 API 호출 최적화, 이미지 최적화(WebP, Lazy Loading), SSR/CSR 하이브리드 렌더링 구현

## 🧭 향후 계획 (Roadmap)

* 일대일 채팅 기능 추가
* 크루 생성 및 가입 기능 구현
* 클라이밍짐 상세 정보 페이지 고도화 (루트, 난이도, 시설 정보 등)
* 다크 모드 지원
* 테스트 커버리지 확대

## 📝 개발 컨벤션 (Development Conventions)

### 1. Commit Message Convention

-   `feat` : 새로운 기능 추가
-   `fix` : 버그 수정
-   `docs` : 문서 변경
-   `chore`: 빌드 프로세스, 패키지 매니저 설정 변경 등
-   `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 로직 변경 없음)
-   `test`: 테스트 코드 추가, 수정, 삭제
-   `refactor`: 코드 리팩토링
-   `perf`: 성능 개선
-   `build`: 빌드 관련 파일 수정
-   `ci`: CI/CD 관련 설정 변경

### 2. API Function Naming Convention

-   **조회 요청 함수**: `get`으로 시작 (예: `getUserList`, `getPostDetails`)
-   **데이터 생성/변경 요청 함수**: `post`로 시작 (예: `postUserData`, `postComment`)
    * *팀/프로젝트에 따라 `create`, `update`, `delete` 등 더 명시적인 동사를 사용할 수도 있습니다.*

### 3. Test Code Convention

-   **위치**: 테스트 대상 파일과 동일 디렉토리 내 `.test.ts` 또는 `.spec.ts`
-   **제목**: `describe`로 기능 그룹화, `it`으로 개별 케이스 명시 (명확하고 서술적으로)
-   **작성**: `describe` > `it` 구조 사용, Arrange-Act-Assert 패턴 권장
-   **선택자**: `data-testid` > `role` > `id` 순으로 안정적인 속성 사용 권장