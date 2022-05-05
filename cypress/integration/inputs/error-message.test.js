import Login from "../Login";

describe("Testing textarea and error message!", () => {
    beforeEach(() => {
        cy.wait(2000);
    });

    it("Login and write nothing!", () => {
        Login();
        cy.get("textarea").type(" ");
        cy.contains("Send").click();
        cy.contains("Write something!").should("exist");
    });
    it("blur!", () => {
        cy.get("textarea").focus().blur();
        cy.contains("Write something!").should("not.exist");
    });
});
