describe("Assets board", () => {
  it("visits home page", () => {
    cy.visit("/");
    cy.get("h2").should("contain", "Portfolio");
  });
});
