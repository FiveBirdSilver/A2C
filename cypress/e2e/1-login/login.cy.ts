// describe("로그인 테스트", () => {
//   it("사용자는 아이디와 비밀번호를 입력한다.", () => {
//     // given : 로그인 페이지에 접근한다.
//     cy.visit("http://localhost:3000/login");

//     // cy.get("[data-cy=emailInput]").should("exist"); // as : 별칭을 부여함
//     cy.get("[data-cy=emailInput]").should("exist").as("emailInput"); // as : 별칭을 부여함

//     cy.get("[data-cy=passwordInput]").as("passwordInput");
//     cy.get("[data-cy=loginBtn]").as("loginBtn");

//     // when : 아이디와 비밀번호를 입력하고 로그인 버튼을 클릭한다.
//     cy.get("@emailInput").type("tpdms0401@gmail.com");
//     cy.get("@passwordInput").type("1234");

//     cy.get("@emailInput").invoke("val").should("include", "@");

//     cy.get("@passwordInput").then(($passwordInput) => {
//       cy.wrap($passwordInput).should("have.value", "1234");
//     });
//     cy.intercept({
//       method: "POST",
//       url: "http://localhost:3000/api/login",
//     }).as("login");

//     // then : 로그인에 성공하고, 메인화면으로 이동한다.
//     cy.get("@loginBtn").should("exist").click();

//     //페이지로 이동하는 것이 아닌 페이지가 존재하는 지 확인
//     cy.url().should("include", "http://localhost:3000/");
//   });
// });

describe("로그인 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3002/login");
  });

  it("로그인 페이지에 요소가 정상적으로 표시되는 지 확인한다.", () => {
    cy.get("[data-cy=emailInput]").should("exist");
    cy.get("[data-cy=passwordInput]").should("exist");
    cy.get("[data-cy=loginBtn]").should("exist");
  });

  it("아이디와 비밀번호가 빈 값일 경우 로그인 버튼이 비활성화이다.", () => {
    cy.get("[data-cy=loginBtn]").should("be.disabled");
  });

  it("유효하지 않은 이메일 형식을 입력한다.", () => {
    cy.get("[data-cy=emailInput]").type("tpdms");
    cy.get("[data-cy=passwordInput]").type("1234");

    // 로그인 시도
    cy.get("[data-cy=loginBtn]").click();

    // 에러 메시지 또는 예상 동작에 대한 확인
    cy.contains("올바른 이메일 형식이 아닙니다.").should("exist");
  });

  //   it("should prevent login with password less than 8 characters", () => {
  //     // 8자 미만의 비밀번호 입력
  //     cy.get("#username").type("validUsername@test.com");
  //     cy.get("#password").type("short");

  //     // 로그인 시도
  //     cy.get("#login-button").click();

  //     // 에러 메시지 또는 예상 동작에 대한 확인
  //     cy.contains("Please enter a valid email address").should("not.exist");
  //     cy.contains("Password must be at least 8 characters").should("exist");
  //   });

  //   it("should allow successful login with valid credentials", () => {
  //     // 올바른 사용자 이름 및 비밀번호 입력
  //     cy.get("#username").type("validUsername@test.com");
  //     cy.get("#password").type("validPassword");

  //     // 로그인 시도
  //     cy.get("#login-button").click();

  //     // 로그인 후 예상되는 동작에 대한 확인
  //     // 예를 들어, 로그인 후의 페이지로 리디렉션되는지 확인
  //     cy.url().should("include", "/dashboard");
  //   });
});
