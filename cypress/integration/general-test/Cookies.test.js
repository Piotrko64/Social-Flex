import Login from "../Login";

describe("Cookie and url!", () => {
    beforeEach(() => {
        cy.wait(2000);
    });

    it("Visit and check Cookie", () => {
        Login();
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
