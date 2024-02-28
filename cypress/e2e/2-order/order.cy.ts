describe("주문 테스트", () => {
  it("사용자는 주문 버튼을 눌러 주문할 수 있다.", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy=orderBtn]").should("be.visible").as("orderBtn");
    cy.get("@orderBtn").click();

    cy.url().should("include", "http://localhost:3000/order");
  });
});
