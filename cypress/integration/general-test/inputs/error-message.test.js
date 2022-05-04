describe("Testing textarea and error message!", () => {
    beforeEach(() => {
        cy.wait(2000);
    });

    it("Login and write nothing!", () => {
        cy.viewport(550, 550);
        cy.visit("http://localhost:3000/");
        cy.get("input").first().type("newFriend").should("have.value", "newFriend");
        cy.get("input").eq(1).type("newFriend").should("have.value", "newFriend");
        cy.get(".auth__login").click();
        cy.get(".auth__card").contains("Loading...").should("exist");
        cy.wait(4000);
        cy.url().should("not.include", "/auth");
        cy.get("textarea").type(" ");
        cy.contains("Send").click();
        cy.contains("Write something!").should("exist");
    });
    it("blur!", () => {
        cy.get("textarea").focus().blur();
        cy.contains("Write something!").should("not.exist");
    });
});
