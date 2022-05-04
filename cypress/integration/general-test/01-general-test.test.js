describe("Testing SF!", () => {
    beforeEach(() => {
        cy.wait(2000);
    });
    // Add new note
    it("Visit", () => {
        // viewport for mobile
        cy.viewport("samsung-s10");
        cy.visit("http://localhost:3000/");
    });

    it("Login Type", () => {
        cy.get("input").first().type("newFriend").should("have.value", "newFriend");
        cy.get("input").eq(1).type("newFriend").should("have.value", "newFriend");
        cy.get(".auth__login").click();
        cy.get(".auth__card").contains("Loading...").should("exist");
        cy.wait(6000);
        cy.get(".auth__card").should("not.exist");
        cy.getCookie("next-auth.session-token").should("exist");
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
        // cy.get(".textarea-emoji").should("not.have.value", "");
        cy.get(".textarea-emoji > .emoji-picker-react").should("be.visible");
        cy.get("textarea").type("hide!");
        cy.get(".textarea-emoji > .emoji-picker-react").should("not.exist");
    });
});
