describe("주문 테스트", () => {
  it("사용자는 주문 버튼을 눌러 주문할 수 있다.", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy=orderBtn]").should("be.visible").as("orderBtn");
    cy.get("@orderBtn").click();

    cy.url().should("include", "http://localhost:3000/order");
  });
  it("사용자는 음식 종류를 선택할 수 있다.", () => {
    cy.visit("http://localhost:3000/order");
    cy.intercept("GET", "http://localhost:3000/api/order").as("getData");

    cy.get("[data-cy=button_3]").should("be.visible").as("coffeBtn");

    cy.get("@coffeBtn").click();

    cy.url().should("include", "http://localhost:3000/order/3");
  });

  it("사용자는 선택한 음식의 상세를 선택할 수 있다.", () => {
    cy.visit("http://localhost:3000/order/3");
    cy.intercept("GET", "http://localhost:3000/api/order?id=3", {
      fixture: "list.jon",
    }).as("getDetail");

    cy.get("[data-cy=list_3]").should("be.visible").as("listDiv");
    cy.get("@listDiv").click();
  });
});
