## 지도 시각화

#### **개요**

지도 시각화를 위한 라이브러리 선택을 위한 비교, 테스트 코드 작성 연습을 위함.

#### **지도 라이브러리 비교**

> - Leaflet: 간단하고 가벼운 지도 라이브러리로, 커스터마이징이 용이하고 빠른 속도를 제공함.
> - Mapbox: Google 지도 이외의 최상의 맵서비스라는 평판 체감. 벡터 지도 기술이 탑재되어 있음. 3D 지도 렌더링 가능.
> - Openlayers: 레퍼런스가 찾기 쉬웠음.

<br>

<details><summary> 1. Commit Messge Convention 
</summary>

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

</details>
<details><summary> 2. TEST Code Convention
</summary>

- 폴더 이름은 00-페이지명, 파일명은 기능명으로 설정. (ex. 01-login / feature.test.ts)
- 테스트 제목은 서술적이며 명확하게 표현.
- 'describe' 블록 하에 여러 it를 사용해 개별 테스트.
- 속성 선택은 'id'나 'data-\*'로 사용.

</details>
