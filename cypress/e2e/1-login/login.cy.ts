describe("로그인 화면", () => {
  it("사용자는 아이디와 비밀번호를 사용해서 로그인한다.", () => {
    // given : 로그인 페이지에 접근한다.
    cy.visit("http://localhost:3000/login");

    cy.get("[data-cy=emailInput]").as("emailInput"); // as : 별칭을 부여함
    cy.get("[data-cy=passwordInput]").as("passwordInput");

    // when : 아이디와 비밀번호를 입력하고 로그인 버튼을 클릭한다.
    cy.get("@emailInput").type("tpdms0401@gmail.com");
    cy.get("@passwordInput").type("1234");

    cy.intercept({
      method: "POST",
      url: "http://localhost:3000/api/login",
    }).as("login");

    // then : 로그인에 성공하고, 메인화면으로 이동한다.
    cy.get("[data-cy=loginBtn]").should("exist").click();

    //페이지로 이동하는 것이 아닌 페이지가 존재하는 지 확인
    cy.url().should("include", "http://localhost:3000/");
  });
});
