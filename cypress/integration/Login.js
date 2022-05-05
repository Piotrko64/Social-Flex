export default () => {
    cy.viewport(550, 550);
    cy.visit("http://localhost:3000/");
    cy.get("input").first().type("newFriend").should("have.value", "newFriend");
    cy.get("input").eq(1).type("newFriend").should("have.value", "newFriend");
    cy.get(".auth__login").click();
    cy.get(".auth__card").contains("Loading...").should("exist");
    cy.wait(4000);
    cy.url().should("not.include", "/auth");
};
