describe("Cookie and url!", () => {
    beforeEach(() => {
        cy.wait(2000);
    });

    it("Visit and check Cookie", () => {
        cy.viewport(550, 750);
        cy.visit("http://localhost:3000/");
        cy.clearCookies();
        cy.get("input").first().type("newFriend").should("have.value", "newFriend");
        cy.get("input").eq(1).type("newFriend").should("have.value", "newFriend");
        cy.get(".auth__login").click();
        cy.get(".auth__card").contains("Loading...").should("exist");
        cy.wait(6000);
        cy.getCookie("next-auth.session-token").should("exist");
    });

    it("Clear Cookies and go to /auth", () => {
        cy.clearCookies();
        cy.reload();
        cy.wait(2000);
        cy.url().should("include", "/auth");
        cy.title().should("eq", "SF");
    });
});
