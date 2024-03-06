import list from "../../fixtures/list.json";

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

  it("사용자는 원하는 메뉴를 장바구니에 담고, 원하는 음식 갯수를 변경할 수 있다.", () => {
    cy.visit("http://localhost:3000/order/3");

    // fixture을 사용해서 이미 협의된 Response가 아니 경우 체크하는 과정에서 유용하게 쓸 수 있음!
    cy.intercept("GET", "http://localhost:3000/api/order?id=3").as("getDetail");

    cy.wait("@getDetail").then((interception) => {
      // 가로챈 요청의 응답을 얻습니다.
      const response = interception.response?.body.data;

      // list.json 파일을 읽어와서 기대값과 비교합니다.
      cy.fixture("list.json").then((expectedResponse) => {
        expect(response).to.deep.equal(expectedResponse);
      });
    });

    // 동적으로 요소 아이디 가져오기
    cy.fixture("list.json").then((list) => {
      cy.get(`[data-cy=list_${list[0].id}]`).should("be.visible").as("listDiv");
    });
    cy.get("@listDiv").click();
    cy.url().should("include", `http://localhost:3000/order/3/1`);
  });
});
