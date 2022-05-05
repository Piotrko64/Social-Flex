import Login from "../Login";

describe("Testing SF!", () => {
    beforeEach(() => {
        cy.wait(2000);
    });

    it("Login Type", () => {
        Login();
        cy.get(".auth__card").should("not.exist");
        cy.contains("Blog");
    });

    it("Post add", () => {
        const random = "NEWPOST" + Math.random();
        cy.get("textarea").type(random).should("have.value", random);
        cy.get("textarea").type("{enter}");
        cy.get(".onePost").contains(random).should("exist");
        cy.get(".profile h1").then(($text) => {
            cy.get(".onePost").contains($text.text()).should("exist");
            cy.get(".onePost button").first().click();
            cy.get(".onePost p").first().should("not.have.value", random);
        });
    });

    it("Emoji", () => {
        cy.get(".textarea-emojiActive").should("exist").click();

        cy.get(".textarea-emoji > .emoji-picker-react").should("be.visible");
        cy.get("textarea").type("hide!");
        cy.get(".textarea-emoji > .emoji-picker-react").should("not.exist");
    });
});
