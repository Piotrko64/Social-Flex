import Login from "../Login";
import "cypress-file-upload";

describe("Testing textarea and error message!", () => {
    beforeEach(() => {
        cy.wait(2000);
    });

    it("Login and download image!", () => {
        Login();
        cy.get("input[type=file]").attachFile("../image/poland.jpg");
        cy.contains("Go Upload!").should("exist");
        cy.get(".upload").click();
        cy.contains("Wait...").should("exist");
    });
});
